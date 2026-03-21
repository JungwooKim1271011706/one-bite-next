'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './TooltipPreview.module.css'
import { CGCproduct } from '@/types'

type TooltipPreviewProps = {
  product: CGCproduct
  children: React.ReactNode
}

export default function TooltipPreview({ product, children }: TooltipPreviewProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [tooltipDims, setTooltipDims] = useState({ width: 0, height: 0 })

  const handleMouseEnter = () => setVisible(true)
  const handleMouseMove = (e: React.MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
  const handleMouseLeave = () => setVisible(false)

  useEffect(() => {
    if (tooltipRef.current) {
      const { offsetWidth, offsetHeight } = tooltipRef.current
      setTooltipDims({ width: offsetWidth, height: offsetHeight })
    }
  }, [visible])

  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280

  const padding = 20
  let top = mousePos.y + padding
  let left = mousePos.x + padding

  if (top + tooltipDims.height > screenHeight) top = mousePos.y - tooltipDims.height - padding
  if (left + tooltipDims.width > screenWidth) left = screenWidth - tooltipDims.width - padding

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    top,
    left,
    zIndex: 1000,
    pointerEvents: 'none',
    maxWidth: '400px',
  }

  return (
    <div className={styles.wrapper} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && (
        <div className={styles.tooltip} ref={tooltipRef} style={tooltipStyle}>
          <strong>{product.name}</strong>
          {product.imageA && (
            <div className={styles.tooltipImage}>
              <Image src={product.imageA} alt='미리보기' width={300} height={300} />
            </div>
          )}
          <p className={styles.row}>{product.itemFeatures?.slice(0, 50)}...</p>
          <p className={styles.row}>구분: {product.category}</p>
          <p className={styles.row}>규격: {product.specification}</p>
        </div>
      )}
    </div>
  )
}
