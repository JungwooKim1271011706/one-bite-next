'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './CategoryFilter.module.css'

type Props = {
  categories: string[]
}

function createHref(pathname: string, query: string | null, category: string | null) {
  const params = new URLSearchParams()

  if (query) {
    params.set('q', query)
  }

  if (category) {
    params.set('category', category)
  }

  params.set('page', '1')

  const nextQuery = params.toString()
  return nextQuery ? `${pathname}?${nextQuery}` : pathname
}

export default function CategoryFilter({ categories }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q')
  const currentCategory = searchParams.get('category')

  return (
    <div className={styles.wrap} aria-label="Category filter">
      <Link
        href={createHref(pathname, currentQuery, null)}
        className={`${styles.chip} ${!currentCategory ? styles.active : ''}`}
      >
        전체
      </Link>
      {categories.map(category => (
        <Link
          key={category}
          href={createHref(pathname, currentQuery, category)}
          className={`${styles.chip} ${currentCategory === category ? styles.active : ''}`}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
