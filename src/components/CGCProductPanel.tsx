'use client'

import { useEffect, useState } from 'react'
import { CGCproduct } from '@/types'
import styles from './CGCProductPanel.module.css'

export default function CGCProductPanel({ productId, onClose }: { productId: number, onClose: () => void }) {
  const [product, setProduct] = useState<CGCproduct | null>(null)

  useEffect(() => {
    fetch(`/api/cgcProduct/${productId}`).then(res => res.json()).then(setProduct)
  }, [productId])

  if (!product) return null

  return (
    <div className={styles.panel}>
      <button className={styles.close} onClick={onClose}>✖</button>
      <h2>{product.name}</h2>
      <p>{product.itemFeatures}</p>
      <p>유통기한: {product.expirationDate}</p>
      {/* 이미지 등 추가 가능 */}
    </div>
  )
}