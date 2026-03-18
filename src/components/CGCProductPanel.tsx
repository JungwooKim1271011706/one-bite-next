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
          <dt>{'\uC720\uD1B5 \uAE30\uD55C'}</dt>
          <dd>{product.expirationDate || '-'}</dd>
        </div>
        <div>
          <dt>{'\uAD8C\uC7A5 \uC18C\uB9E4\uAC00'}</dt>
          <dd>{product.suggestedRetailPrice || '-'}</dd>
        </div>
        <div>
          <dt>{'\uAD8C\uC7A5 \uB3C4\uB9E4\uAC00'}</dt>
          <dd>{product.suggestedWholesalePrice || '-'}</dd>
        </div>
        <div>
          <dt>{'\uADDC\uACA9'}</dt>
          <dd>{product.specification || '-'}</dd>
        </div>
        <div>
          <dt>{'\uAD6C\uBD84'}</dt>
          <dd>{product.category || '-'}</dd>
        </div>
        <div>
          <dt>{'\uD56D\uBAA9'}</dt>
          <dd>{product.type || '-'}</dd>
        </div>
      </dl>
      <section className={styles.descriptionSection}>
        <h3>{'\uC0C1\uC138 \uC124\uBA85'}</h3>
        <p>{product.itemFeatures || '\uC0C1\uC138 \uC124\uBA85\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'}</p>
      </section>
    </aside>
  )
}
