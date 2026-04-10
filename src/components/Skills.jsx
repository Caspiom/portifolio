import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import CodeBg from './CodeBg'
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
  ['Git', 'PostgreSQL', 'Linux', 'React', 'Vue.js', 'Google Workspace Admin', 'Microsoft 365 Admin'],
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
        <p className="section-tag reveal">{tx.label}</p>
        <h2 className="section-title reveal d1">{tx.title}</h2>

        <div className="skills__grid">
          {tx.groups.map((group, i) => (
            <div key={group.category} className={`skill-group reveal reveal--scale d${i + 2}`}>
              <div className="skill-group__header">
                <span className="skill-group__icon mono">{group.icon}</span>
                <h3 className="skill-group__title">{group.category}</h3>
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
          <div className="lang-badge">
            <span className="lang-flag">🇧🇷</span>
            <span>Português</span>
            <span className="lang-level">{tx.langNative}</span>
          </div>
          <div className="lang-badge">
            <span className="lang-flag">🇺🇸</span>
            <span>English</span>
            <span className="lang-level">{tx.langFluent}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
