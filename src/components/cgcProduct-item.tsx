import TooltipPreview from '@/component/TooltipPreview'
import { CGCproduct } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import style from './book-item.module.css'

export default function CGCProductItem(product: CGCproduct) {
  return (
    <Link href={`/cgcProduct/${product.id}`} className={style.container}>
        <TooltipPreview product={product}>
            <div className={style.container}>
            {product.imageA && (
                <Image src={product.imageA} alt="썸네일 이미지" width={200} height={200} />
            )}
            <div>
                <div className={style.title}>{product.name}</div>
                <div className={style.subTitle}>유통 기한 : {product.expirationDate}</div>
                <br />
                <div className={style.author}>권장 소매가 : {product.suggestedRetailPrice}</div>
                <div className={style.author}>권장 도매가 : {product.suggestedWholesalePrice}</div>
            </div>
            </div>
        </TooltipPreview>
    </Link>
  )
}