import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './SpaceInvaders.css'

const W = 560
const H = 420
const PLAYER_SPEED = 4
const BULLET_SPEED = 7
const ALIEN_BULLET_SPEED = 2.8
const ALIEN_ROWS = 3
const ALIEN_COLS = 9
const ALIEN_W = 30
const ALIEN_H = 22
const ALIEN_COL_GAP = 22
const ALIEN_ROW_GAP = 18
const ALIEN_COLORS = ['#8957e5', '#3eccc1', '#3eccc1']

function initState() {
  const aliens = []
  const totalW = ALIEN_COLS * ALIEN_W + (ALIEN_COLS - 1) * ALIEN_COL_GAP
  const startX = (W - totalW) / 2
  for (let r = 0; r < ALIEN_ROWS; r++) {
    for (let c = 0; c < ALIEN_COLS; c++) {
      aliens.push({
        x: startX + c * (ALIEN_W + ALIEN_COL_GAP),
        y: 54 + r * (ALIEN_H + ALIEN_ROW_GAP),
        r, alive: true,
      })
    }
  }
  return {
    player: { x: W / 2 - 18, y: H - 44, w: 36, h: 18 },
    playerBullets: [],
    aliens,
    alienBullets: [],
    dir: 1,
    moveTimer: 0,
    moveInterval: 52,
    shootTimer: 0,
    shootInterval: 80,
    score: 0,
    lives: 3,
    status: 'playing',
    keys: {},
    shotCooldown: 0,
    step: 0,
    frame: 0,
  }
}

function drawAlien(ctx, x, y, row, step) {
  const color = ALIEN_COLORS[row]
  const phase = step % 2
  ctx.fillStyle = color

  if (row === 0) {
    // Top row: purple crab-like
    ctx.fillRect(x + 6, y + 2, ALIEN_W - 12, ALIEN_H - 6)
    ctx.fillRect(x + 2, y + 6, 6, 8)
    ctx.fillRect(x + ALIEN_W - 8, y + 6, 6, 8)
    ctx.fillRect(x + 10, y, ALIEN_W - 20, 4)
    if (phase === 0) {
      ctx.fillRect(x, y + 12, 4, 4)
      ctx.fillRect(x + ALIEN_W - 4, y + 12, 4, 4)
    } else {
      ctx.fillRect(x + 2, y + 14, 4, 4)
      ctx.fillRect(x + ALIEN_W - 6, y + 14, 4, 4)
    }
    // eyes
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(x + 9, y + 5, 4, 4)
    ctx.fillRect(x + ALIEN_W - 13, y + 5, 4, 4)
  } else {
    // Bottom rows: teal squid-like
    ctx.fillRect(x + 4, y, ALIEN_W - 8, ALIEN_H - 4)
    ctx.fillRect(x, y + 6, 6, 10)
    ctx.fillRect(x + ALIEN_W - 6, y + 6, 6, 10)
    if (phase === 0) {
      ctx.fillRect(x + 4, y + ALIEN_H - 4, 6, 4)
      ctx.fillRect(x + ALIEN_W - 10, y + ALIEN_H - 4, 6, 4)
    } else {
      ctx.fillRect(x + 2, y + ALIEN_H - 4, 6, 4)
      ctx.fillRect(x + ALIEN_W - 8, y + ALIEN_H - 4, 6, 4)
    }
    // eyes
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(x + 8, y + 5, 4, 5)
    ctx.fillRect(x + ALIEN_W - 12, y + 5, 4, 5)
  }
}

function drawPlayer(ctx, x, y, w, h) {
  ctx.fillStyle = '#3eccc1'
  ctx.fillRect(x + 4, y + 6, w - 8, h - 6)
  ctx.fillRect(x + w / 2 - 3, y, 6, 8)
  ctx.fillRect(x, y + h - 4, w, 4)
}

export default function SpaceInvaders() {
  const { lang } = useLang()
  const tx = t[lang].game
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const rafRef = useRef(null)
  const mobileRef = useRef({ left: false, right: false, shoot: false })
  const [overlay, setOverlay] = useState({ status: 'idle', score: 0, lives: 3 })

  const startGame = () => {
    stateRef.current = initState()
    setOverlay({ status: 'playing', score: 0, lives: 3 })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const handlers = {}
    handlers.down = (e) => {
      if (!stateRef.current) return
      stateRef.current.keys[e.code] = true
      if (['Space', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault()
    }
    handlers.up = (e) => {
      if (!stateRef.current) return
      stateRef.current.keys[e.code] = false
    }

    window.addEventListener('keydown', handlers.down)
    window.addEventListener('keyup', handlers.up)

    function loop() {
      rafRef.current = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)

      const s = stateRef.current
      if (!s || s.status !== 'playing') return

      s.frame++

      // Merge mobile controls into keys
      if (mobileRef.current.left) s.keys['ArrowLeft'] = true
      if (mobileRef.current.right) s.keys['ArrowRight'] = true

      // Player movement
      if (s.keys['ArrowLeft'] || s.keys['KeyA'])
        s.player.x = Math.max(0, s.player.x - PLAYER_SPEED)
      if (s.keys['ArrowRight'] || s.keys['KeyD'])
        s.player.x = Math.min(W - s.player.w, s.player.x + PLAYER_SPEED)

      // Shoot
      s.shotCooldown = Math.max(0, s.shotCooldown - 1)
      if ((s.keys['Space'] || s.keys['ArrowUp'] || mobileRef.current.shoot) && s.shotCooldown === 0) {
        s.playerBullets.push({ x: s.player.x + s.player.w / 2, y: s.player.y })
        s.shotCooldown = 18
      }

      // Player bullets
      s.playerBullets = s.playerBullets.filter(b => { b.y -= BULLET_SPEED; return b.y > 0 })

      // Alien bullets
      s.alienBullets = s.alienBullets.filter(b => { b.y += ALIEN_BULLET_SPEED; return b.y < H })

      // Move aliens
      s.moveTimer++
      if (s.moveTimer >= s.moveInterval) {
        s.moveTimer = 0
        s.step++
        const alive = s.aliens.filter(a => a.alive)
        if (alive.length === 0) { s.status = 'win'; setOverlay({ status: 'win', score: s.score, lives: s.lives }); return }
        const minX = Math.min(...alive.map(a => a.x))
        const maxX = Math.max(...alive.map(a => a.x + ALIEN_W))
        let drop = false
        if (s.dir === 1 && maxX >= W - 8) { s.dir = -1; drop = true }
        if (s.dir === -1 && minX <= 8) { s.dir = 1; drop = true }
        s.aliens.forEach(a => {
          if (!a.alive) return
          if (drop) a.y += 14
          else a.x += s.dir * 12
        })
        const pct = alive.length / (ALIEN_ROWS * ALIEN_COLS)
        s.moveInterval = Math.max(6, Math.round(52 * pct))
      }

      // Alien shooting
      s.shootTimer++
      if (s.shootTimer >= s.shootInterval) {
        s.shootTimer = 0
        const alive = s.aliens.filter(a => a.alive)
        if (alive.length > 0) {
          const shooter = alive[Math.floor(Math.random() * alive.length)]
          s.alienBullets.push({ x: shooter.x + ALIEN_W / 2, y: shooter.y + ALIEN_H })
        }
      }

      // Bullet vs alien collisions
      s.playerBullets = s.playerBullets.filter(b => {
        for (const a of s.aliens) {
          if (!a.alive) continue
          if (b.x > a.x && b.x < a.x + ALIEN_W && b.y > a.y && b.y < a.y + ALIEN_H) {
            a.alive = false
            s.score += (ALIEN_ROWS - a.r) * 10
            return false
          }
        }
        return true
      })

      // Alien bullet vs player
      s.alienBullets = s.alienBullets.filter(b => {
        const p = s.player
        if (b.x > p.x && b.x < p.x + p.w && b.y > p.y && b.y < p.y + p.h) {
          s.lives--
          return false
        }
        return true
      })

      // Win / lose checks
      if (s.aliens.every(a => !a.alive)) { s.status = 'win' }
      if (s.lives <= 0) { s.status = 'gameover' }
      if (s.aliens.filter(a => a.alive).some(a => a.y + ALIEN_H >= s.player.y)) { s.status = 'gameover' }

      if (s.status !== 'playing') {
        setOverlay({ status: s.status, score: s.score, lives: s.lives })
        return
      }

      setOverlay(prev =>
        prev.score !== s.score || prev.lives !== s.lives
          ? { status: 'playing', score: s.score, lives: s.lives }
          : prev
      )

      // Draw aliens
      s.aliens.forEach(a => { if (a.alive) drawAlien(ctx, a.x, a.y, a.r, s.step) })

      // Draw player
      drawPlayer(ctx, s.player.x, s.player.y, s.player.w, s.player.h)

      // Draw player bullets
      ctx.fillStyle = '#3eccc1'
      s.playerBullets.forEach(b => ctx.fillRect(b.x - 1.5, b.y, 3, 10))

      // Draw alien bullets
      ctx.fillStyle = '#f85149'
      s.alienBullets.forEach(b => ctx.fillRect(b.x - 1.5, b.y, 3, 10))

      // Ground line
      ctx.fillStyle = 'rgba(62,204,193,0.25)'
      ctx.fillRect(0, H - 1, W, 1)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', handlers.down)
      window.removeEventListener('keyup', handlers.up)
    }
  }, [])

  const hearts = Math.max(0, overlay.lives)

  return (
    <section id="game" className="section game-section">
      <div className="container">
        <p className="section-tag">{tx.label}</p>
        <h2 className="section-title">{tx.title}</h2>
        <p className="game__desc">{tx.desc}</p>

        <div className="game__wrapper">
          <div className="game__hud">
            <span className="game__score mono">score: {overlay.score}</span>
            <span className="game__lives">{Array.from({ length: hearts }, (_, i) => (
              <span key={i} className="heart">♥</span>
            ))}</span>
          </div>

          <div className="game__canvas-wrap">
            <canvas ref={canvasRef} width={W} height={H} className="game__canvas" />

            {overlay.status !== 'playing' && (
              <div className="game__overlay">
                {overlay.status === 'idle' && (
                  <>
                    <p className="game__overlay-alien">👾</p>
                    <p className="game__overlay-title">Space Invaders</p>
                    <p className="game__overlay-hint">{tx.controls}</p>
                    <button className="btn-primary" onClick={startGame}>{tx.play}</button>
                  </>
                )}
                {overlay.status === 'gameover' && (
                  <>
                    <p className="game__overlay-alien">💀</p>
                    <p className="game__overlay-title">{tx.gameOver}</p>
                    <p className="game__overlay-hint mono">score: {overlay.score}</p>
                    <button className="btn-primary" onClick={startGame}>{tx.retry}</button>
                  </>
                )}
                {overlay.status === 'win' && (
                  <>
                    <p className="game__overlay-alien">🏆</p>
                    <p className="game__overlay-title">{tx.win}</p>
                    <p className="game__overlay-hint mono">score: {overlay.score}</p>
                    <button className="btn-primary" onClick={startGame}>{tx.playAgain}</button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="game__mobile-controls">
            <button
              className="game__btn"
              onPointerDown={() => { mobileRef.current.left = true }}
              onPointerUp={() => { mobileRef.current.left = false }}
              onPointerLeave={() => { mobileRef.current.left = false }}
            >◀</button>
            <button
              className="game__btn game__btn--shoot"
              onPointerDown={() => { mobileRef.current.shoot = true; setTimeout(() => { mobileRef.current.shoot = false }, 80) }}
            >▲</button>
            <button
              className="game__btn"
              onPointerDown={() => { mobileRef.current.right = true }}
              onPointerUp={() => { mobileRef.current.right = false }}
              onPointerLeave={() => { mobileRef.current.right = false }}
            >▶</button>
          </div>
        </div>
      </div>
    </section>
  )
}
