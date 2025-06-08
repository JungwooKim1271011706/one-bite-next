// lib/upload/customLocalProvider.ts
import fs from 'fs/promises'
import path from 'path'
import type { BaseProvider, ProviderOpts } from '@adminjs/upload'

export class SafeLocalProvider implements BaseProvider {
  name = 'SafeLocalProvider'  // ✅ 타입 오류 해결
  bucket: string
  opts?: ProviderOpts | undefined

  constructor(bucket: string) {
    this.bucket = bucket
  }

  async upload(file: any, key: string): Promise<void> {
    const dest = path.join(this.bucket, key)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(file.path, dest)
    await fs.unlink(file.path)
  }

  async delete(key: string, bucket?: string): Promise<void> {
    const filePath = path.join(bucket || this.bucket, key)
    await fs.unlink(filePath).catch(() => {})
  }

  path(key: string, bucket?: string): string {
    return `${key}`
  }
}