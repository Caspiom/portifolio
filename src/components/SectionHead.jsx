import { sectionMeta } from '../i18n/translations'

/**
 * The header every section opens with:
 *
 *   [01]  SOBRE ─────────────────────────  私について
 *   Um pouco sobre mim
 *
 * `id` keys into sectionMeta for the index and the Japanese counterpart, so a
 * section only has to pass its own label and title.
 */
export default function SectionHead({ id, label, title }) {
  const meta = sectionMeta[id]

  return (
    <header className="section-head">
      <div className="section-head__meta reveal">
        <span className="section-head__index">[{meta.index}]</span>
        <span className="section-head__label">{label}</span>
        <span className="rule" />
        {/* Decorative: screen readers would spell these out glyph by glyph. */}
        <span className="section-head__ja" aria-hidden="true">{meta.ja}</span>
      </div>
      <h2 className="section-title reveal d1">{title}</h2>
    </header>
  )
}
