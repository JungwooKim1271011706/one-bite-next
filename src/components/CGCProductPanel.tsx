'use client'

import { useEffect, useRef, useState } from 'react'
import { CGCproduct } from '@/types'
import styles from './CGCProductPanel.module.css'
import CGCProductDetail from './CGCProductDetail'

export default function CGCProductPanel({ productId, onClose, baseUrl }: { productId: number, onClose: () => void, baseUrl: string }) {
  const [product, setProduct] = useState<CGCproduct | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [width, setWidth] = useState(420)
  const panelRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)  

  useEffect(() => {
    fetch(`/api/cgcProduct/${productId}`).then(res => res.json()).then(setProduct)
  }, [productId])

  // 리사이즈 핸들러
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current && panelRef.current) {
        const newWidth = window.innerWidth - e.clientX
        setWidth(Math.max(300, Math.min(newWidth, 800))) // 최소/최대값 설정
      }
    }
    const handleMouseUp = () => {
      isResizing.current = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (!product) return null

  const handleClose = () => {
  setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300) // 애니메이션 시간과 일치시킴 
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.panel} ${isClosing ? styles.closing : ''}`}
        style={{ width }}
        onClick={e => e.stopPropagation()}
        ref={panelRef}
      >
        <div
          className={styles.resizer}
          onMouseDown={() => { isResizing.current = true }}
        />
        <CGCProductDetail product={product} audioUrl={`${baseUrl}/uploads/audio/${encodeURIComponent(product.audioFileKey)}`} />
      </div>
    </div>
  )
}