import './WireGlobe.css'

/**
 * The hero centrepiece: a wireframe sphere of meridians and parallels.
 *
 * Continuous 1px strokes are the point. The page background is a dense field
 * of scattered glyphs, and anything else built from glyphs — an ASCII torus, a
 * second rain — cannot separate from it, because figure and ground end up made
 * of the same material. Unbroken curves read as an object against that noise
 * on shape alone, with no dark plate needed to punch a hole in the rain.
 *
 * Pure CSS 3D: eleven rings on a spinning `preserve-3d` parent. No canvas, no
 * per-frame JavaScript, no font metrics, nothing to miscalculate.
 */

// Six meridians, evenly spaced around the axis. Half a turn covers the sphere
// because a ring is symmetric.
const MERIDIANS = [0, 30, 60, 90, 120, 150]

// Parallels as fractions of the radius. The scale is the ring's own radius at
// that height: sqrt(1 - y²) for a unit sphere.
const PARALLELS = [-0.66, -0.33, 0, 0.33, 0.66].map((y) => ({
  y,
  scale: Math.sqrt(1 - y * y).toFixed(3),
}))

export default function WireGlobe() {
  return (
    <div className="globe" aria-hidden="true">
      <div className="globe__spin">
        {MERIDIANS.map((deg) => (
          <span key={`m${deg}`} className="globe__ring globe__ring--meridian" style={{ '--deg': `${deg}deg` }} />
        ))}
        {PARALLELS.map(({ y, scale }) => (
          <span
            key={`p${y}`}
            className="globe__ring globe__ring--parallel"
            style={{ '--y': `${y * 50}%`, '--scale': scale }}
          />
        ))}
      </div>
    </div>
  )
}
