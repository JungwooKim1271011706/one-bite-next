import fs from 'fs/promises'
import path from 'path'
import { BaseProvider } from '@adminjs/upload'

export class SafeLocalProvider extends BaseProvider {
  name = 'SafeLocalProvider'
  bucket: string

  constructor(bucket: string) {
    super(bucket)
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
    // 다운로드용 경로 반환
    return `${key}`
  }
}