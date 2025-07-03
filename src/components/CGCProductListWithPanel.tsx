'use client'

import { useState } from 'react'
import CGCProductItem from './cgcProduct-item'
import CGCProductPanel from './CGCProductPanel'
import { CGCproduct } from '@/types'

export default function CGCProductListWithPanel({ products }: { products: CGCproduct[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ flex: 1 }}>
        {products.map(product => (
          <div key={product.id} onClick={() => setSelectedId(product.id)}>
            <CGCProductItem {...product} />
          </div>
        ))}
      </div>

      {selectedId && (
        <CGCProductPanel
          productId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}