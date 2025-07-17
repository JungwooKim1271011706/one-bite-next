import Image from "next/image";
import { CGCproduct } from "@/types";
import { getMimeType } from "@lib/utils/mime-utils";
import styles from "./CGCProductDetail.module.css"; // 스타일 파일은 필요에 따라 생성/수정

interface CGCProductDetailProps {
  product: CGCproduct;
  audioUrl?: string;
}

export default function CGCProductDetail({ product, audioUrl }: CGCProductDetailProps) {
  return (
    <div className={styles.container}>
      <section>
        {product.imageA?.length > 0 && (
          <div className={styles.cover_img_container} style={{ backgroundImage: `url(${product.imageA})` }}>
            <Image src={product.imageA} width={240} height={300} alt={`제품 ${product.name} 입니다`} />
          </div>
        )}
        <div className={styles.title}>{product.name}</div>
        <div className={styles.subTitle}>유통기한 : {product.expirationDate}</div>
        <div className={styles.author}>권장 소매가 : {product.suggestedRetailPrice}</div>
        <div className={styles.author}>권장 도매가 : {product.suggestedWholesalePrice}</div>
        <div className={styles.author}>규격 : {product.specification}</div>
        <div className={styles.author}>구분 : {product.category}</div>
        <div className={styles.author}>항목 : {product.type}</div>
        {product.audioFileKey && audioUrl && (
          <div>
            <div className={styles.title}>📢 제품 음성 설명</div>
            <div className={styles.audioDescription}>
              <audio controls>
                <source
                  src={audioUrl}
                  type={getMimeType(product.audioFileKey)}
                />
                브라우저가 audio 태그를 지원하지 않습니다.
              </audio>
            </div>
          </div>
        )}
        <div className={styles.title}>📖 제품 상세 설명</div>
        <div className={styles.description}>{product.itemFeatures}</div>
      </section>
    </div>
  );
}