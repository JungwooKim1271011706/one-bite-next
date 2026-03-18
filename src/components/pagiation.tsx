'use client'

import Link from 'next/link'
import styles from './pagination.module.css'

type Props = {
  currentPage: number
  totalCount?: number
  groupSize: number
  searchQuery: string
  categoryQuery?: string
}

function createPageHref(page: number, searchQuery: string, categoryQuery?: string) {
  const params = new URLSearchParams()
  if (searchQuery) {
    params.set('q', searchQuery)
  }
  if (categoryQuery) {
    params.set('category', categoryQuery)
  }
  params.set('page', String(page))
  return `?${params.toString()}`
}

export default function Pagination({ currentPage, totalCount = 1, groupSize, searchQuery = '', categoryQuery = '' }: Props) {
  const safePage = Math.max(currentPage, 1)
  const currentGroup = Math.floor((safePage - 1) / groupSize)
  const startPage = currentGroup * groupSize + 1
  const totalPage = Math.max(Math.ceil(totalCount / groupSize), 1)
  const endPage = Math.min(startPage + groupSize - 1, totalPage)
  const prevGroupPage = Math.max(startPage - 1, 1)
  const nextGroupPage = Math.min(endPage + 1, totalPage)
  const canGoPrev = startPage > 1
  const canGoNext = endPage < totalPage

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <div className={styles.group}>
        <Link
          href={createPageHref(1, searchQuery, categoryQuery)}
          aria-disabled={!canGoPrev}
          className={`${styles.control} ${!canGoPrev ? styles.disabled : ''}`}
          tabIndex={canGoPrev ? 0 : -1}
        >
          {'<<'}
        </Link>
        <Link
          href={createPageHref(prevGroupPage, searchQuery, categoryQuery)}
          aria-disabled={!canGoPrev}
          className={`${styles.control} ${!canGoPrev ? styles.disabled : ''}`}
          tabIndex={canGoPrev ? 0 : -1}
        >
          {'<'}
        </Link>
        <div className={styles.pages}>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i
            const isActive = page === safePage
            return (
              <Link
                key={page}
                href={createPageHref(page, searchQuery, categoryQuery)}
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.page} ${isActive ? styles.active : ''}`}
              >
                {page}
              </Link>
            )
          })}
        </div>
        <Link
          href={createPageHref(nextGroupPage, searchQuery, categoryQuery)}
          aria-disabled={!canGoNext}
          className={`${styles.control} ${!canGoNext ? styles.disabled : ''}`}
          tabIndex={canGoNext ? 0 : -1}
        >
          {'>'}
        </Link>
        <Link
          href={createPageHref(totalPage, searchQuery, categoryQuery)}
          aria-disabled={!canGoNext}
          className={`${styles.control} ${!canGoNext ? styles.disabled : ''}`}
          tabIndex={canGoNext ? 0 : -1}
        >
          {'>>'}
        </Link>
      </div>
    </nav>
  )
}
