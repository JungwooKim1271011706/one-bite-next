import TooltipPreview from '@/component/TooltipPreview'
import { CGCproduct } from '@/types'
import Image from 'next/image'
import style from './book-item.module.css'

export default function CGCProductItem(product: CGCproduct) {
  return (
    <TooltipPreview product={product}>
      <div className={style.container}>
        {product.imageA && (
          <Image src={product.imageA} alt={product.name} width={200} height={200} />
        )}
        <div>
          <div className={style.title}>{product.name}</div>
          <div className={style.subTitle}>Expiration: {product.expirationDate}</div>
          <br />
          <div className={style.author}>Retail: {product.suggestedRetailPrice}</div>
          <div className={style.author}>Wholesale: {product.suggestedWholesalePrice}</div>
        </div>
      </div>
    </TooltipPreview>
  )
}
