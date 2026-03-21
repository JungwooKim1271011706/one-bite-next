'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './CategoryFilter.module.css'

type Props = {
  categories: string[]
}

function createHref(pathname: string, query: string | null, selectedCategories: string[]) {
  const params = new URLSearchParams()

  if (query) {
    params.set('q', query)
  }

  selectedCategories.forEach(category => {
    params.append('category', category)
  })

  params.set('page', '1')

  const nextQuery = params.toString()
  return nextQuery ? `${pathname}?${nextQuery}` : pathname
}

export default function CategoryFilter({ categories }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q')
  const currentCategories = searchParams.getAll('category').filter(Boolean)

  const isSelected = (category: string) => currentCategories.includes(category)

  const getNextCategories = (category: string) => {
    if (isSelected(category)) {
      return currentCategories.filter(item => item !== category)
    }
    return [...currentCategories, category]
  }

  return (
    <div className={styles.wrap} aria-label="Category filter">
      <Link
        href={createHref(pathname, currentQuery, [])}
        className={`${styles.chip} ${currentCategories.length === 0 ? styles.active : ''}`}
      >
        전체
      </Link>
      {categories.map(category => {
        const nextCategories = getNextCategories(category)
        return (
          <Link
            key={category}
            href={createHref(pathname, currentQuery, nextCategories)}
            className={`${styles.chip} ${isSelected(category) ? styles.active : ''}`}
          >
            {category}
          </Link>
        )
      })}
    </div>
  )
}
