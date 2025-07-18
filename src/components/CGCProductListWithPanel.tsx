'use client'

import { useState } from 'react'
import CGCProductItem from './cgcProduct-item'
import CGCProductPanel from './CGCProductPanel'
import { CGCproduct } from '@/types'
import style from './CGCProductListWithPanel.module.css'

export default function CGCProductListWithPanel({ products, baseUrl }: { products: CGCproduct[], baseUrl: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ flex: 1 }}>
        {products.map(product => (
          <div className={style.container} key={product.id} onClick={() => setSelectedId(product.id)}>
            <CGCProductItem {...product} />
          </div>
        ))}
      </div>

      {selectedId && (
        <CGCProductPanel
          productId={selectedId}
          onClose={() => setSelectedId(null)}
          baseUrl={baseUrl}
        />
      )}
    </div>
  )
}