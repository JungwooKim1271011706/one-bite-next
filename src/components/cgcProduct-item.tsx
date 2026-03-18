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
          <div className={style.subTitle}>{'\uC720\uD1B5 \uAE30\uD55C'} : {product.expirationDate}</div>
          <br />
          <div className={style.author}>{'\uAD8C\uC7A5 \uC18C\uB9E4\uAC00'} : {product.suggestedRetailPrice}</div>
          <div className={style.author}>{'\uAD8C\uC7A5 \uB3C4\uB9E4\uAC00'} : {product.suggestedWholesalePrice}</div>
        </div>
      </div>
    </TooltipPreview>
  )
}
