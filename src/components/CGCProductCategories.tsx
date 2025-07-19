'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CGCProductListWithPanel from './CGCProductListWithPanel'
import Pagination from './pagiation'
import style from "./searchbar.module.css";

export default function CGCProductCategories({ categories, baseUrl }: { categories: string[], baseUrl: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL을 단일 정보 소스로 사용. 컴포넌트의 상태는 URL을 따라감.
  const page = Number(searchParams.get('page') || 1);
  const selectedCategories = searchParams.get('category')?.split(',') || [];
  const query = searchParams.get('q') || '';

  // API로부터 받은 데이터 상태
  const [products, setProducts] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const size = 10

  // 검색어 입력을 위한 별도 상태 (URL과 즉시 동기화하지 않음)
  const [searchQuery, setSearchQuery] = useState(query);

  // searchParams가 변경될 때마다 API 호출
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    fetch(`/api/cgcProduct?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setTotalCount(data.totalCount)
      })
  }, [searchParams]);

  // URL 쿼리 파라미터를 업데이트하는 함수
  const updateUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
    });
    router.push(`?${params.toString()}`);
  }

  const handleCategoryClick = (category: string) => {
    const nextSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    updateUrl({ category: nextSelected.join(','), page: '1' });
  }

  const handlePageChange = (newPage: number) => {
    updateUrl({ page: newPage.toString() });
  }

  const handleSearch = () => {
    updateUrl({ q: searchQuery, page: '1' });
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  // URL의 'q'가 바뀔 때 검색창의 내용도 동기화
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <div>
      {/* 검색바 */}
      <div className={style.container}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 카테고리 버튼 */}
      <div style={{ marginTop: 16 }}>
        {categories
          .filter(category => category && category.trim() !== '')
          .map((category) => {
            const isSelected = selectedCategories.includes(category)
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  margin: '0px 10px 8px 0',
                  padding: '4px 12px',
                  borderRadius: 10,
                  border: isSelected ? '2px solid #388e3c' : '1px solid #ccc',
                  background: isSelected ? '#c8e6c9' : '#fff',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {category}{isSelected && ' ×'}
              </button>
            )
          })}
      </div>

      {/* 상품 목록 및 페이지네이션 */}
      <div style={{ marginTop: 24 }}>
        <CGCProductListWithPanel products={products} baseUrl={baseUrl} />
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          groupSize={size}
          searchQuery={query}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
