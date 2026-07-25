import photoCoding from './assets/principal/Coding.JPG'
import photoMe from './assets/principal/Me.jpeg'
import photoMe2 from './assets/principal/me2.jpeg'
import photoWinner from './assets/principal/Winner.jpeg'

const shots = [
  { id: 'coding', src: photoCoding, width: 1200, height: 900 },
  { id: 'me', src: photoMe, width: 900, height: 1200 },
  { id: 'me2', src: photoMe2, width: 900, height: 1200 },
  { id: 'winner', src: photoWinner, width: 900, height: 1200 },
] as const

export function HeroCollage() {
  return (
    <div className="hero-collage" aria-hidden="true">
      {shots.map((shot) => (
        <figure key={shot.id} className={`hero-shot hero-shot-${shot.id}`}>
          <img src={shot.src} alt="" width={shot.width} height={shot.height} />
        </figure>
      ))}
    </div>
  )
}
