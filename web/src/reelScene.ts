import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  VideoTexture,
  Vector2,
  WebGLRenderer,
  SRGBColorSpace,
  type Texture,
} from 'three'

export type ReelMedia = { image: string; video?: string }
export type ReelControls = { step: (direction: number) => void; destroy: () => void }
const vert = `
varying vec2 tex;
void main() {
  tex = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`
const frag = `
uniform sampler2D poster;
uniform vec2 viewport;
uniform vec2 coverScale;
uniform float velocity;
varying vec2 tex;
void main() {
  vec2 screen = gl_FragCoord.xy / viewport;
  vec2 lens = (screen - vec2(.5)) / vec2(.162,.445);
  float r = length(lens);
  float inside = 1. - smoothstep(.94,1.,r);
  float rim = exp(-25.*abs(r-.96));
  vec2 center = tex-.5;
  vec2 bend = lens*(.016+.010*min(abs(velocity),1.))*inside*(1.-r*r);
  vec2 at = .5+(center-bend)*coverScale;
  vec3 col = texture2D(poster,at).rgb;
  float fringe = .0022*rim;
  col.r = texture2D(poster,at+lens*fringe).r;
  col.b = texture2D(poster,at-lens*fringe).b;
  col = mix(col,vec3(.188,.022,.028),inside*.045);
  col += vec3(.085,.060,.055)*rim;
  gl_FragColor = vec4(col,1.);
  #include <colorspace_fragment>
}`

export function createReel(
  host: HTMLElement,
  items: ReelMedia[],
  initial: number,
  change: (index: number) => void,
  open: (index: number) => void,
  ready: (isReady: boolean) => void,
): ReelControls {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.setAttribute('aria-hidden', 'true')
  host.prepend(canvas)
  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 5000)
  camera.position.z = 1000
  const geometry = new PlaneGeometry(1, 1)
  const loader = new TextureLoader()
  const videos: HTMLVideoElement[] = []
  const textures: Texture[] = []
  let destroyed = false,
    pageVisible = false,
    loaded = 0,
    raf = 0,
    last = 0,
    dirty = true
  let position = initial,
    target = initial,
    current = initial,
    velocity = 0
  let width = 1,
    height = 1,
    cardWidth = 1,
    pitch = 1
  function schedule() {
    dirty = true
    if (!destroyed && pageVisible && !document.hidden && !raf) raf = requestAnimationFrame(draw)
  }
  const panels = items.map((item) => {
    const material = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        poster: { value: null },
        viewport: { value: new Vector2(1, 1) },
        coverScale: { value: new Vector2(1, 1) },
        velocity: { value: 0 },
      },
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const panel = { mesh, aspect: 16 / 9 }
    const texture = loader.load(
      item.image,
      (t) => {
        if (destroyed) return
        panel.aspect = t.image.naturalWidth / t.image.naturalHeight
        loaded++
        resize()
        if (loaded === items.length) ready(true)
      },
      undefined,
      () => {
        if (!destroyed) ready(false)
      },
    )
    texture.colorSpace = SRGBColorSpace
    material.uniforms.poster.value = texture
    textures.push(texture)
    if (item.video) {
      const video = document.createElement('video')
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.preload = 'metadata'
      video.src = item.video
      const videoMap = new VideoTexture(video)
      videoMap.colorSpace = SRGBColorSpace
      videos.push(video)
      textures.push(videoMap)
      video.addEventListener(
        'loadeddata',
        () => {
          if (destroyed) return
          material.uniforms.poster.value = videoMap
          panel.aspect = video.videoWidth / video.videoHeight
          resize()
        },
        { once: true },
      )
    }
    return panel
  })
  function resize() {
    width = host.clientWidth
    height = host.clientHeight
    if (!width || !height) return
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6)
    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height, false)
    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()
    cardWidth = width * (width < 650 ? 0.84 : 0.64)
    pitch = cardWidth + Math.min(24, width * 0.027)
    for (const p of panels) {
      const uniforms = p.mesh.material.uniforms
      uniforms.viewport.value.set(canvas.width, canvas.height)
      const aspect = cardWidth / height
      uniforms.coverScale.value.set(Math.min(1, aspect / p.aspect), Math.min(1, p.aspect / aspect))
    }
    schedule()
  }
  let pointer: number | null = null,
    startX = 0,
    lastX = 0,
    travel = 0
  let wheelTimer: ReturnType<typeof setTimeout> | undefined
  function draw(time: number) {
    raf = 0
    if (!pageVisible || document.hidden || destroyed) return
    const dt = Math.min(2.5, (time - last) / 16.67 || 1)
    last = time
    const diff = target - position
    position += diff * (1 - Math.pow(0.83, dt))
    if (Math.abs(diff) < 0.0003) position = target
    const speed = Math.min(1, Math.abs(diff) * 2)
    velocity += (speed - velocity) * 0.17
    const nearest = ((Math.round(position) % items.length) + items.length) % items.length
    if (nearest !== current) {
      current = nearest
      change(nearest)
    }
    const n = items.length
    for (const [i, p] of panels.entries()) {
      const offset = ((((i - position + n / 2) % n) + n) % n) - n / 2
      p.mesh.position.x = offset * pitch
      p.mesh.scale.set(cardWidth * (1 - 0.25 * velocity), height * (1 - 0.06 * velocity), 1)
      p.mesh.rotation.y = Math.max(-0.24, Math.min(0.24, diff * 0.22)) + offset * 0.045
      p.mesh.material.uniforms.velocity.value = velocity
    }
    renderer.render(scene, camera)
    const animate =
      dirty || Math.abs(diff) > 0.0003 || velocity > 0.001 || videos.some((video) => !video.paused)
    dirty = false
    if (animate) raf = requestAnimationFrame(draw)
  }
  function down(e: PointerEvent) {
    if (!e.isPrimary || e.button !== 0) return
    pointer = e.pointerId
    startX = lastX = e.clientX
    travel = 0
    canvas.setPointerCapture(e.pointerId)
  }
  function move(e: PointerEvent) {
    if (e.pointerId !== pointer) return
    const delta = e.clientX - lastX
    travel = Math.max(travel, Math.abs(e.clientX - startX))
    target -= delta / pitch
    lastX = e.clientX
    if (travel > 5) host.classList.add('dragging')
    schedule()
  }
  function up(e: PointerEvent) {
    if (e.pointerId !== pointer) return
    pointer = null
    host.classList.remove('dragging')
    if (e.type === 'pointerup' && travel < 6) {
      const x = e.clientX - host.getBoundingClientRect().left - width / 2
      const delta = Math.round(x / pitch)
      if (Math.abs(x - delta * pitch) <= cardWidth / 2)
        open((((Math.round(position) + delta) % items.length) + items.length) % items.length)
    } else target = Math.round(target + Math.max(-0.6, Math.min(0.6, (target - position) * 0.46)))
    schedule()
  }
  function wheel(e: WheelEvent) {
    const dx = e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    if (!dx || (!e.shiftKey && Math.abs(dx) < Math.abs(e.deltaY))) return
    e.preventDefault()
    target += (dx * (e.deltaMode === 1 ? 16 : 1)) / pitch
    clearTimeout(wheelTimer)
    wheelTimer = setTimeout(() => {
      target = Math.round(target)
      schedule()
    }, 140)
    schedule()
  }
  function visibility() {
    for (const v of videos) {
      if (pageVisible && !document.hidden) void v.play().catch(() => {})
      else v.pause()
    }
    schedule()
  }
  function lost(e: Event) {
    e.preventDefault()
    ready(false)
    destroy()
  }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', move)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', up)
  canvas.addEventListener('wheel', wheel, { passive: false })
  canvas.addEventListener('webglcontextlost', lost)
  document.addEventListener('visibilitychange', visibility)
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  const observer = new IntersectionObserver(([entry]) => {
    pageVisible = entry.isIntersecting
    visibility()
  })
  observer.observe(host)
  resize()
  function destroy() {
    if (destroyed) return
    destroyed = true
    cancelAnimationFrame(raf)
    clearTimeout(wheelTimer)
    observer.disconnect()
    resizeObserver.disconnect()
    document.removeEventListener('visibilitychange', visibility)
    canvas.removeEventListener('webglcontextlost', lost)
    for (const v of videos) {
      v.pause()
      v.removeAttribute('src')
      v.load()
    }
    for (const t of textures) t.dispose()
    for (const p of panels) p.mesh.material.dispose()
    geometry.dispose()
    renderer.dispose()
    canvas.remove()
  }
  return {
    step: (direction) => {
      target = Math.round(target) + direction
      schedule()
    },
    destroy,
  }
}
