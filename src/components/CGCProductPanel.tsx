'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CGCproduct } from '@/types'
import styles from './CGCProductPanel.module.css'

type Props = {
  product: CGCproduct
  onClose: () => void
}

export default function CGCProductPanel({ product, onClose }: Props) {
  const panelRef = useRef<HTMLElement | null>(null)
  const [width, setWidth] = useState(420)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setWidth(Math.min(Math.floor(window.innerWidth * 0.92), 420))
        return
      }
      setWidth(current => Math.min(Math.max(current, 320), Math.floor(window.innerWidth * 0.7)))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) {
      return
    }

    const startX = event.clientX
    const startWidth = panelRef.current?.offsetWidth ?? width

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = startX - moveEvent.clientX
      const nextWidth = Math.min(Math.max(startWidth + delta, 320), Math.floor(window.innerWidth * 0.7))
      setWidth(nextWidth)
    }

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  return (
    <div className={styles.overlay} onClick={onClose} aria-hidden='true'>
      <aside
        ref={panelRef}
        className={styles.panel}
        aria-label={`${product.name} details`}
        style={{ ['--panel-width' as string]: `${width}px` }}
        onClick={event => event.stopPropagation()}
      >
        <div
          className={styles.resizeHandle}
          onPointerDown={onResizeStart}
          role='separator'
          aria-orientation='vertical'
          aria-label='Resize details panel'
        />
        <button className={styles.close} onClick={onClose} aria-label='Close details panel'>
          x
        </button>
        {product.imageA && (
          <div className={styles.imageWrap}>
            <Image src={product.imageA} alt={product.name} width={320} height={320} />
          </div>
        )}
        <h2 className={styles.title}>{product.name}</h2>
        <dl className={styles.metaList}>
          <div>
            <dt>{'유통 기한'}</dt>
            <dd>{product.expirationDate || '-'}</dd>
          </div>
          <div>
            <dt>{'권장 소매가'}</dt>
            <dd>{product.suggestedRetailPrice || '-'}</dd>
          </div>
          <div>
            <dt>{'권장 도매가'}</dt>
            <dd>{product.suggestedWholesalePrice || '-'}</dd>
          </div>
          <div>
            <dt>{'규격'}</dt>
            <dd>{product.specification || '-'}</dd>
          </div>
          <div>
            <dt>{'구분'}</dt>
            <dd>{product.category || '-'}</dd>
          </div>
          <div>
            <dt>{'항목'}</dt>
            <dd>{product.type || '-'}</dd>
          </div>
        </dl>
        <section className={styles.descriptionSection}>
          <h3>{'상세 설명'}</h3>
          <p>{product.itemFeatures || '상세 설명이 없습니다.'}</p>
        </section>
      </aside>
    </div>
  )
}
