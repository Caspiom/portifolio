import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import CodeBg from './CodeBg'
import './About.css'

const PYTHON_CODE = `import boto3
from googleapiclient.discovery import build

class InfraManager:
    def __init__(self, region='us-east-1'):
        self.session = boto3.Session(region_name=region)
        self.ec2 = self.session.client('ec2')
        self.s3  = self.session.client('s3')

    def list_instances(self):
        resp = self.ec2.describe_instances()
        return [
            i for r in resp['Reservations']
            for i in r['Instances']
        ]

    def upload_artifact(self, bucket, path):
        self.s3.upload_file(path, bucket, path)
        print(f"uploaded {path} → s3://{bucket}/{path}")

def sync_workspace_users(domain):
    svc = build('admin', 'directory_v1')
    result = svc.users().list(
        domain=domain,
        maxResults=500,
    ).execute()
    return result.get('users', [])

def provision_instance(ami, itype='t3.micro'):
    ec2 = boto3.resource('ec2')
    inst = ec2.create_instances(
        ImageId=ami,
        InstanceType=itype,
        MinCount=1, MaxCount=1,
    )[0]
    inst.wait_until_running()
    return inst.id`

export default function About() {
  const { lang } = useLang()
  const tx = t[lang].about

  return (
    <section id="about" className="section about has-code-bg">
      <CodeBg
        snippets={[{ code: PYTHON_CODE, side: 'right', color: '#3572A5', rotate: 2, top: '5rem', opacity: 0.052 }]}
      />
      <div className="container">
        <p className="section-tag reveal">{tx.label}</p>
        <h2 className="section-title reveal d1">{tx.title}</h2>

        <div className="about__grid">
          <div className="about__text reveal d2">
            <p dangerouslySetInnerHTML={{ __html: tx.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: tx.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: tx.p3 }} />
          </div>

          <div className="about__stats">
            <StatCard number="3+" label={tx.stats.experience} delay="d2" />
            <StatCard number="29+" label={tx.stats.repos} delay="d3" />
            <StatCard number="5+" label={tx.stats.languages} delay="d4" />
            <StatCard number="3" label={tx.stats.cloud} delay="d5" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, label, delay = '' }) {
  return (
    <div className={`stat-card reveal reveal--scale ${delay}`}>
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function SectionLabel({ children }) {
  return <p className="section-tag">{children}</p>
}
