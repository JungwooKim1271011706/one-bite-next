// lib/upload/customLocalProvider.ts
import fs, { existsSync } from "fs";
import { move } from "fs-extra";
import path from "path";
import { UploadedFile } from "adminjs";
import { BaseProvider } from "@adminjs/upload";

const UPLOADS_DIR = 'uploads/audio'; // 절대경로 또는 상대경로로 지정

export class UploadProvider extends BaseProvider {
  constructor() {
    super(UPLOADS_DIR);
    if (!existsSync(UPLOADS_DIR)) {
      throw new Error(`directory: "${UPLOADS_DIR}" does not exists. Create it before running LocalAdapter`);
    }
  }

  async upload(file: UploadedFile, key: string): Promise<void> {
    const filePath = process.platform === "win32" ? this.path(key) : this.path(key).slice(1);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await move(file.path, filePath, { overwrite: true });
  }

  async delete(key: string, bucket?: string): Promise<void> {
    const filePath = process.platform === "win32"
      ? this.path(key, bucket)
      : this.path(key, bucket).slice(1);

    await fs.promises.unlink(filePath).catch(() => {});
  }

  path(key: string, bucket?: string): string {
    return process.platform === "win32"
      ? path.join(bucket || this.bucket, key)
      : `/${path.join(bucket || this.bucket, key)}`;
  }
}