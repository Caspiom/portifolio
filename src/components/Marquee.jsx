import './Marquee.css'

/**
 * Thin ticker of markup tags that opens the contact section.
 *
 * The track is rendered twice and translated by exactly -50%, so the second
 * copy is arriving as the first leaves and the loop never shows a seam. The
 * band is decorative, so it stays out of the accessibility tree entirely.
 */
export default function Marquee({ items, repeat = 6 }) {
  // The three source strings are far narrower than a desktop viewport, so a
  // single pass would leave a visible gap between loops. Repeating them fills
  // the track before the duplication trick is applied.
  const filled = Array.from({ length: repeat }, () => items).flat()

  const track = (
    <div className="marquee__track">
      {filled.map((item, i) => (
        <span key={i} className="marquee__item">
          <span className="marquee__mark" />
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__inner">
        {track}
        {track}
      </div>
    </div>
  )
}
