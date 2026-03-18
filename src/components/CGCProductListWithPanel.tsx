'use client'

import { useState } from 'react'
import CGCProductItem from './cgcProduct-item'
import CGCProductPanel from './CGCProductPanel'
import { CGCproduct } from '@/types'
import styles from './CGCProductListWithPanel.module.css'

export default function CGCProductListWithPanel({ products }: { products: CGCproduct[] }) {
  const [selectedProduct, setSelectedProduct] = useState<CGCproduct | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {products.map(product => (
          <div
            key={product.id}
            role="button"
            tabIndex={0}
            className={styles.itemButton}
            onClick={() => setSelectedProduct(product)}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedProduct(product)
              }
            }}
          >
            <CGCProductItem {...product} />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <CGCProductPanel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
