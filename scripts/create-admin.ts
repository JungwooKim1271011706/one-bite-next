// scripts/create-admin.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AdminUser from '../src/models/CgcUser'
import { hashPassword } from '../src/lib/password/password'

dotenv.config()

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!)
  const hashed = await hashPassword('cgc2025!@#$')
  const user = new AdminUser({
    id: 'admin',
    password: hashed,
  })
  await user.save()
  console.log('✅ Admin user created')
  process.exit()
}

main()