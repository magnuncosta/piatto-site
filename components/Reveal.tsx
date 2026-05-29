'use client'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  style?: React.CSSProperties
}

export default function Reveal({ children, delay = 0, direction = 'up', className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translate(0, 0)'
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const initialTransform =
    direction === 'up'    ? 'translateY(32px)' :
    direction === 'left'  ? 'translateX(-32px)' :
    direction === 'right' ? 'translateX(32px)'  : 'none'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity 0.7s ease, transform 0.7s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
