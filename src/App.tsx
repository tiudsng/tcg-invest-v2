import { useEffect } from 'react'
import { sendTelegramMessage } from './services/telegram'

function App() {
  useEffect(() => {
    sendTelegramMessage("🚀 TCG INVEST v2 正式上線！Telegram 連動測試成功！")
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>TCG INVEST v2</h1>
      <p>Telegram 連動測試中...</p>
    </div>
  )
}

export default App
