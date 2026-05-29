'use client'
import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '5521999999999'
const WHATSAPP_MSG = 'Olá! Vim pelo site e gostaria de solicitar um orçamento para móveis planejados.'

export default function WhatsAppBtn() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 200,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        transition: 'opacity 0.3s, transform 0.3s, background 0.2s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#1ebe5d'
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#25D366'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.54 4.07 1.486 5.788L.057 23.854c-.073.31.214.582.52.499l6.198-1.63A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.012-1.373l-.36-.213-3.726.98 1-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
      </svg>
    </a>
  )
}
