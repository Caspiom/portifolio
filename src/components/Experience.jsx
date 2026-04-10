import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import CodeBg from './CodeBg'
import './Experience.css'

const DOCKER_CODE = `# docker-compose.yml
version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/app
      SPRING_PROFILES_ACTIVE: prod
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules

  db:
    image: postgres:15-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: \${DB_PASSWORD}

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

volumes:
  pgdata:`

const PWSH_CODE = `# Provision Azure VM
$rg = "prod-resources"
$vm = New-AzVM \`
  -ResourceGroupName $rg \`
  -Name "api-server-01" \`
  -Location "eastus" \`
  -Size "Standard_B2s"

# Sync M365 licenses
$users = Get-MgUser -Filter "department eq 'Engineering'"
foreach ($user in $users) {
  Set-MgUserLicense \`
    -UserId $user.Id \`
    -AddLicenses @{SkuId = $E3SkuId} \`
    -RemoveLicenses @()
}

# Monitor cloud costs
Get-AzConsumptionUsageDetail \`
  -StartDate (Get-Date).AddDays(-30) \`
  -EndDate (Get-Date) |
  Group-Object ResourceType |
  Sort-Object Count -Descending |
  Select-Object -First 10`

const jobTags = [
  ['AWS', 'Azure', 'Python', 'Rust', 'Java', 'React', 'PowerShell'],
  ['Java', 'React', 'TypeScript', 'SQL', 'Git', 'Agile'],
  ['Filming', 'Video Editing', 'Live Streaming'],
]

export default function Experience() {
  const { lang } = useLang()
  const tx = t[lang].experience

  return (
    <section id="experience" className="section experience has-code-bg">
      <CodeBg
        snippets={[
          { code: DOCKER_CODE, side: 'left',  color: '#3eccc1', rotate: -1.5, top: '4rem',  opacity: 0.048 },
          { code: PWSH_CODE,   side: 'right', color: '#8957e5', rotate:  1.5, top: '6rem',  opacity: 0.048 },
        ]}
      />
      <div className="container">
        <p className="section-tag reveal">{tx.label}</p>
        <h2 className="section-title reveal d1">{tx.title}</h2>

        <div className="timeline">
          {tx.jobs.map((job, i) => (
            <div key={i} className={`timeline__item ${i < 2 ? 'current' : ''} reveal reveal--left d${i + 2}`}>
              <div className="timeline__dot" />
              <div className="timeline__card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{job.role}</h3>
                    <p className="exp-company">
                      {job.company} <span className="exp-location">· {job.location}</span>
                    </p>
                  </div>
                  <span className="exp-period mono">{job.period}</span>
                </div>

                <ul className="exp-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {jobTags[i].map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="education-card reveal d2">
          <div className="edu-icon">🎓</div>
          <div>
            <h3 className="exp-role">{tx.edu.degree}</h3>
            <p className="exp-company">{tx.edu.school}</p>
            <p className="exp-period mono" style={{ marginTop: '0.25rem' }}>{tx.edu.period}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
