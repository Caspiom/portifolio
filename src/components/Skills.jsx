import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import CodeBg from './CodeBg'
import SectionHead from './SectionHead'
import './Skills.css'

const TS_CODE = `interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>
  findAll(filter?: Partial<T>): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: ID): Promise<void>
}

type CloudProvider = 'AWS' | 'Azure' | 'GCP'

interface DeployConfig {
  provider: CloudProvider
  region: string
  image: string
  replicas: number
  env: Record<string, string>
}

async function deploy(
  config: DeployConfig
): Promise<{ url: string; id: string }> {
  const client = await createClient(config.provider)
  const { url, id } = await client.deploy({
    image: config.image,
    region: config.region,
    scale: config.replicas,
    environment: config.env,
  })
  return { url, id }
}

const pipeline = {
  lint:   () => exec('eslint src --ext .ts,.tsx'),
  test:   () => exec('vitest run'),
  build:  () => exec('vite build'),
  deploy: (env: string) => exec(\`deploy --env=\${env}\`),
} satisfies Record<string, () => Promise<void>>`

const skillData = [
  ['Java', 'Python', 'Rust', 'TypeScript', 'SQL', 'JavaScript', 'C#', 'HTML/CSS', 'PowerShell'],
  ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Docker', 'Docker Compose', 'CI/CD'],
  ['React', 'Spring Boot', 'FastAPI', 'Axum', 'PostgreSQL', 'Git', 'Linux', 'Vue.js', 'Google Workspace Admin', 'Microsoft 365 Admin'],
  ['Agile / Scrum', 'Kanban', 'RESTful APIs', 'Microservices', 'Design Patterns', 'OOP', 'SDLC', 'TDD'],
]

export default function Skills() {
  const { lang } = useLang()
  const tx = t[lang].skills

  return (
    <section id="skills" className="section skills has-code-bg">
      <CodeBg

        snippets={[{ code: TS_CODE, side: 'left', color: '#3178c6', rotate: -2, top: '4rem', opacity: 0.052 }]}
      />
      <div className="container">
        <SectionHead id="skills" label={tx.label} title={tx.title} />

        <div className="skills__grid">
          {tx.groups.map((group, i) => (
            <div key={i} className={`skill-group reveal d${i + 2}`}>
              <div className="skill-group__header">
                <span className="skill-group__icon mono" aria-hidden="true">{group.icon}</span>
                <h3 className="skill-group__title">{group.category}</h3>
                <span className="rule rule--dim" />
                <span className="hud skill-group__count">{String(skillData[i].length).padStart(2, '0')}</span>
              </div>
              <div className="skill-group__pills">
                {skillData[i].map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills__lang reveal d2">
          <span className="hud skills__lang-label">LANG</span>
          <div className="lang-badge">
            <span className="lang-code">PT</span>
            <span>Português</span>
            <span className="lang-level">{tx.langNative}</span>
          </div>
          <div className="lang-badge">
            <span className="lang-code">EN</span>
            <span>English</span>
            <span className="lang-level">{tx.langFluent}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
