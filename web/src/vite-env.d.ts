/// <reference types="vite/client" />

/** Uppercase image extensions (common from camera exports / Windows). */
declare module '*.JPG' {
  const src: string
  export default src
}
declare module '*.JPEG' {
  const src: string
  export default src
}
declare module '*.PNG' {
  const src: string
  export default src
}
declare module '*.WEBP' {
  const src: string
  export default src
}
