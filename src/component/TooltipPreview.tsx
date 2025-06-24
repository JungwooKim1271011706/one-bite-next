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

  const handleMouseEnter = () => {
    setVisible(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setVisible(false)
  }

  // 툴팁 크기 측정
  useEffect(() => {
    if (tooltipRef.current) {
      const { offsetWidth, offsetHeight } = tooltipRef.current
      setTooltipDims({ width: offsetWidth, height: offsetHeight })
    }
  }, [visible])

  // 화면 크기
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280

  // 위치 계산
  const padding = 20
  let top = mousePos.y + padding
  let left = mousePos.x + padding

  // 화면 아래 벗어나면 위로
  if (top + tooltipDims.height > screenHeight) {
    top = mousePos.y - tooltipDims.height - padding
  }

  // 화면 오른쪽 벗어나면 왼쪽으로 조정
  if (left + tooltipDims.width > screenWidth) {
    left = screenWidth - tooltipDims.width - padding
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    top,
    left,
    zIndex: 1000,
    pointerEvents: 'none',
    maxWidth: '400px',
    background: 'white',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {visible && (
        <div className={styles.tooltip} ref={tooltipRef} style={tooltipStyle}>
          <strong>{product.name}</strong>
          {product.imageA && (
            <div className={styles.tooltipImage}>
              <Image src={product.imageA} alt="미리보기" width={300} height={300} />
            </div>
          )}
          <p style={{ textAlign: 'left' }}>{product.itemFeatures?.slice(0, 50)}...</p>
          <p style={{ textAlign: 'left' }}>구분: {product.category}</p>
          <p style={{ textAlign: 'left' }}>규격: {product.specification}</p>
        </div>
      )}
    </div>

  )
}