'use client'

import Image from 'next/image'
import { CGCproduct } from '@/types'
import styles from './CGCProductPanel.module.css'

type Props = {
  product: CGCproduct
  onClose: () => void
}

export default function CGCProductPanel({ product, onClose }: Props) {
  return (
    <aside className={styles.panel} aria-label={`${product.name} details`}>
      <button className={styles.close} onClick={onClose} aria-label="Close details panel">
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
          <dt>Expiration</dt>
          <dd>{product.expirationDate || '-'}</dd>
        </div>
        <div>
          <dt>Retail Price</dt>
          <dd>{product.suggestedRetailPrice || '-'}</dd>
        </div>
        <div>
          <dt>Wholesale Price</dt>
          <dd>{product.suggestedWholesalePrice || '-'}</dd>
        </div>
        <div>
          <dt>Specification</dt>
          <dd>{product.specification || '-'}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{product.category || '-'}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{product.type || '-'}</dd>
        </div>
      </dl>
      <section className={styles.descriptionSection}>
        <h3>Description</h3>
        <p>{product.itemFeatures || 'No description available.'}</p>
      </section>
    </aside>
  )
}
