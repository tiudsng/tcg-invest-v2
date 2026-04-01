import { useEffect } from 'react'
import { sendTelegramMessage } from './services/telegram'

const CARDS = [
  { id: '1', name: 'Lugia Neo Revelation', grade: 'PSA 10', price_hkd: 165036, emoji: '🦅', source: 'Snkrdunk' },
  { id: '2', name: 'Charizard ex MA', grade: 'PSA 10', price_hkd: 336, emoji: '🔥', source: 'Snkrdunk' },
  { id: '3', name: 'Umbreon VMAX', grade: 'PSA 9', price_hkd: 520, emoji: '🌙', source: 'Snkrdunk' },
  { id: '4', name: 'Pikachu Van Gogh', grade: 'PSA 10', price_hkd: 5880, emoji: '⚡', source: 'Snkrdunk' },
  { id: '5', name: 'Mewtwo GX SSR', grade: 'PSA 10', price_hkd: 890, emoji: '🧬', source: 'Snkrdunk' },
]

function CardItem({ card, rank }: { card: typeof CARDS[0]; rank: number }) {
  const isTop = rank === 1
  return (
    <div style={{
      background: isTop ? 'linear-gradient(135deg, #fbbf24, #f97316)' : '#1a1a1a',
      borderRadius: '1.5rem',
      padding: '1.5rem',
      border: isTop ? 'none' : '1px solid #333',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {isTop && (
        <div style={{
          position: 'absolute', top: 8, left: 12,
          background: '#000', color: '#fbbf24',
          borderRadius: '999px', padding: '2px 10px',
          fontSize: '10px', fontWeight: 900
        }}>#1 HOT</div>
      )}
      <div style={{
        width: '100%', aspectRatio: '3/4',
        background: isTop ? 'rgba(255,255,255,0.2)' : '#2a2a2a',
        borderRadius: '1rem', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem', fontSize: '3rem'
      }}>
        {card.emoji}
      </div>
      <div style={{ fontSize: '11px', color: isTop ? 'rgba(0,0,0,0.6)' : '#888', marginBottom: '4px' }}>
        {card.grade} · {card.source}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: isTop ? '#000' : '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
        {card.name}
      </div>
      <div style={{ borderTop: isTop ? '1px solid rgba(0,0,0,0.2)' : '1px solid #333', paddingTop: '8px' }}>
        <div style={{ fontSize: '10px', color: isTop ? 'rgba(0,0,0,0.5)' : '#666' }}>HKD</div>
        <div style={{ fontSize: isTop ? 28 : 22, fontWeight: 900, color: isTop ? '#000' : '#fff' }}>
          ${card.price_hkd.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    sendTelegramMessage("🚀 TCG INVEST v2 正式上線！Telegram 連動測試成功！")
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '0 24px 48px' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #222',
        margin: '0 -24px', padding: '16px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>🎴 TCG INVEST</h1>
          <p style={{ fontSize: '12px', color: '#666' }}>即時追蹤熱門卡牌價格</p>
        </div>
        <button style={{ background: '#222', border: 'none', borderRadius: '12px', padding: '8px 16px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
          ↻ 重新整理
        </button>
      </div>

      <div style={{
        marginTop: '32px', padding: '32px',
        background: 'linear-gradient(135deg, #1a1a0a, #0a0a1a)',
        borderRadius: '2rem', border: '1px solid #333',
        marginBottom: '32px', textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🦅</div>
        <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>⭐ 最高價卡牌</div>
        <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '4px' }}>Lugia Neo Revelation</div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '24px' }}>PSA 10 · Snkrdunk</div>
        <div style={{ fontSize: '11px', color: '#666' }}>最新成交價 (HKD)</div>
        <div style={{ fontSize: '56px', fontWeight: 900, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          HK$165,036
        </div>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '16px' }}>🔥 熱門卡牌</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px'
      }}>
        {CARDS.map((card, i) => (
          <CardItem key={card.id} card={card} rank={i + 1} />
        ))}
      </div>

      <div style={{ marginTop: '48px', textAlign: 'center', color: '#444', fontSize: '11px', borderTop: '1px solid #222', paddingTop: '24px' }}>
        數據來源：Snkrdunk · Firebase Realtime Sync
      </div>
    </div>
  )
}

export default App
