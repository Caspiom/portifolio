/**
 * Renders subtle code snippets as decorative section backgrounds.
 * Each snippet: { code, side ('left'|'right'), color, rotate, top, opacity }
 */
export default function CodeBg({ snippets, bg }) {
  return (
    <>
      {snippets.map((s, i) => (
        <pre
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: s.top ?? '3rem',
            [s.side ?? 'left']: '-0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            lineHeight: '1.65',
            whiteSpace: 'pre',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            color: s.color,
            opacity: s.opacity ?? 0.055,
            transform: `rotate(${s.rotate ?? 0}deg)`,
            transformOrigin: s.side === 'right' ? 'top right' : 'top left',
            zIndex: 0,
            margin: 0,
          }}
        >
          {s.code}
        </pre>
      ))}

      {/* Edge fades — hide overflow without clipping mid-character */}
      {bg && (
        <>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 100,
            background: `linear-gradient(to right, ${bg}, transparent)`,
            pointerEvents: 'none', zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 100,
            background: `linear-gradient(to left, ${bg}, transparent)`,
            pointerEvents: 'none', zIndex: 1,
          }} />
        </>
      )}
    </>
  )
}
