'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import style from './searchbar.module.css'

type Props = {
  className?: string
  placeholder?: string
}

export default function Searchbar({ className = '', placeholder = '검색어를 입력하세요' }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')

  const q = searchParams.get('q')
  const selectedCategories = searchParams.getAll('category').filter(Boolean)

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    const nextSearch = search.trim()

    if (!nextSearch) {
      const params = new URLSearchParams()
      selectedCategories.forEach(category => params.append('category', category))
      params.set('page', '1')

      const query = params.toString()
      router.push(query ? `/?${query}` : '/')
      return
    }

    const params = new URLSearchParams()
    params.set('q', nextSearch)
    params.set('page', '1')
    selectedCategories.forEach(category => params.append('category', category))

    router.push(`/search?${params.toString()}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={`${style.container} ${className}`.trim()}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} placeholder={placeholder} />
      <button onClick={onSubmit}>{'검색'}</button>
    </div>
  )
}
