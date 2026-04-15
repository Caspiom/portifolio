import { useRef, useCallback } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './Projects.css'

const MATRIX_CHARS = 'アイウエオカキクケコ0123456789ABCDEF<>{}[]=+*#@!'
const PURPLE = [137, 87, 229]
const TEAL   = [62, 204, 193]

const projectMeta = [
  { lang: 'Python', langColor: '#3572A5', tags: ['Python', 'Machine Learning', 'Math'], repo: 'https://github.com/Caspiom/Neural_Network_From_Scratch', featured: true },
  { lang: 'Python', langColor: '#3572A5', tags: ['Python', 'AI', 'Pathfinding'], repo: 'https://github.com/Caspiom/PacmanIA', featured: true },
  { lang: 'Rust',   langColor: '#dea584', tags: ['Rust', 'CLI', 'Systems'],           repo: 'https://github.com/Caspiom/TodoList', featured: true },
  { lang: 'Java',   langColor: '#b07219', tags: ['Java', 'Hackathon'],                repo: 'https://github.com/Caspiom/HACKATHON-TJBA-2025', featured: true },
  { lang: 'HTML',   langColor: '#e34c26', tags: ['Google Workspace', 'Admin', 'CLI'], repo: 'https://github.com/Caspiom/Filtro-de-Usu-rios-do-Google-Workspace' },
  { lang: 'Python', langColor: '#3572A5', tags: ['Python', 'Discord', 'AI'],          repo: 'https://github.com/Caspiom/DiscordBotAi' },
  { lang: 'Java',   langColor: '#b07219', tags: ['Java', 'Spring Boot', 'Microservices'], repo: 'https://github.com/Caspiom/eurekaServerMicrosServices' },
  { lang: 'Python', langColor: '#3572A5', tags: ['Python', 'Data', 'Automation'],     repo: 'https://github.com/Caspiom/PDF_TO_CSV' },
  { lang: 'Rust',   langColor: '#dea584', tags: ['Rust', 'Game Dev'],                 repo: 'https://github.com/Caspiom/flappyfox' },
]

const RUST_CODE = `struct Alien {
    x: f32,
    y: f32,
    alive: bool,
}

impl Alien {
    fn new(x: f32, y: f32) -> Self {
        Alien { x, y, alive: true }
    }
}

fn main() {
    let aliens: Vec<Alien> = (0..9)
        .map(|i| Alien::new(i as f32 * 52.0, 80.0))
        .collect();

    for alien in &aliens {
        println!("pos ({:.1}, {:.1})", alien.x, alien.y);
    }
}

fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

struct Player {
    x: f32,
    health: u8,
}

impl Player {
    fn shoot(&self) -> Bullet {
        Bullet { x: self.x, y: 0.0 }
    }
}

struct Bullet { x: f32, y: f32 }

trait Entity {
    fn update(&mut self);
    fn is_alive(&self) -> bool;
}

impl Entity for Alien {
    fn update(&mut self) {
        self.x += 1.0;
    }
    fn is_alive(&self) -> bool {
        self.alive
    }
}`

const JAVA_CODE = `@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    public List<User> getAll() {
        return service.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<User> create(
            @RequestBody @Valid User user) {
        User saved = service.save(user);
        return ResponseEntity.ok(saved);
    }
}

public class NeuralNetwork {
    private final double[][] weights;
    private final int layers;

    public NeuralNetwork(int layers, int nodes) {
        this.layers = layers;
        this.weights = new double[layers][nodes];
    }

    public double activate(double x) {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    public double[] forward(double[] input) {
        double[] out = input;
        for (int l = 0; l < layers; l++) {
            out = applyLayer(out, weights[l]);
        }
        return out;
    }
}

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;
}`

export default function Projects() {
  const { lang } = useLang()
  const tx = t[lang].projects

  const featured = tx.items.filter((_, i) => projectMeta[i]?.featured)
  const featuredMeta = projectMeta.filter(m => m.featured)
  const rest = tx.items.filter((_, i) => !projectMeta[i]?.featured)
  const restMeta = projectMeta.filter(m => !m.featured)

  return (
    <section id="projects" className="section projects">
      {/* Code background */}
      <pre className="code-bg code-bg--rust" aria-hidden="true">{RUST_CODE}</pre>
      <pre className="code-bg code-bg--java" aria-hidden="true">{JAVA_CODE}</pre>

      <div className="container">
        <p className="section-tag reveal">{tx.label}</p>
        <h2 className="section-title reveal d1">{tx.title}</h2>

        <div className="projects__featured">
          {featured.map((item, i) => (
            <ProjectCard key={item.name} item={item} meta={featuredMeta[i]} featured delay={`d${i + 2}`} />
          ))}
        </div>

        <h3 className="projects__other-title mono reveal d1">{tx.otherTitle}</h3>
        <div className="projects__grid">
          {rest.map((item, i) => (
            <ProjectCard key={item.name} item={item} meta={restMeta[i]} delay={`d${Math.min(i + 2, 7)}`} />
          ))}
        </div>

        <div className="projects__github-cta reveal d2">
          <a href="https://github.com/Caspiom" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {tx.githubCta}
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ item, meta, featured, delay = '' }) {
  const canvasRef  = useRef(null)
  const rafRef     = useRef(null)
  const activeRef  = useRef(false)
  const trailsRef  = useRef([])

  const startMatrix = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const FONT = 11
    const w = canvas.width  = canvas.offsetWidth
    const h = canvas.height = canvas.offsetHeight
    const cols = Math.floor(w / FONT)
    const count = Math.max(3, Math.floor(cols * 0.18))

    trailsRef.current = Array.from({ length: count }, () => ({
      col:   Math.floor(Math.random() * cols),
      y:     Math.random() * -h * 0.6,
      speed: 1.5 + Math.random() * 2.5,
      len:   4 + Math.floor(Math.random() * 5),
      color: Math.random() < 0.55 ? PURPLE : TEAL,
    }))

    const ctx = canvas.getContext('2d')
    ctx.font = `${FONT}px "JetBrains Mono", monospace`

    const draw = () => {
      if (!activeRef.current) {
        ctx.clearRect(0, 0, w, h)
        return
      }

      ctx.clearRect(0, 0, w, h)

      trailsRef.current.forEach(tr => {
        tr.y += tr.speed
        const [r, g, b] = tr.color

        for (let j = 0; j <= tr.len; j++) {
          const fy = tr.y - j * FONT
          if (fy < 0 || fy > h) continue
          const fade = j === 0 ? 0.85 : Math.max(0, 0.45 - j * 0.08)
          ctx.fillStyle = `rgba(${r},${g},${b},${fade})`
          const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          ctx.fillText(ch, tr.col * FONT, fy)
        }

        if (tr.y - tr.len * FONT > h) {
          tr.y = -FONT * 2
          tr.col = Math.floor(Math.random() * cols)
          tr.color = Math.random() < 0.55 ? PURPLE : TEAL
        }
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  const stopMatrix = useCallback(() => {
    activeRef.current = false
    cancelAnimationFrame(rafRef.current)
    const canvas = canvasRef.current
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  return (
    <a
      href={meta.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${featured ? 'project-card--featured' : ''} reveal reveal--scale ${delay}`}
      onMouseEnter={startMatrix}
      onMouseLeave={stopMatrix}
    >
      {/* Matrix rain overlay — activated on hover */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: 0.35,
        }}
      />

      <div className="project-card__top">
        <FolderIcon />
        <ExternalIcon />
      </div>
      <h3 className="project-card__name">{item.name}</h3>
      <p className="project-card__desc">{item.description}</p>
      <div className="project-card__footer">
        <div className="project-card__tags">
          {meta.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-card__lang">
          <span className="lang-dot" style={{ background: meta.langColor }} />
          <span>{meta.lang}</span>
        </div>
      </div>
    </a>
  )
}

function FolderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-cyan)' }}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
