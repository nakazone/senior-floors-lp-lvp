import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: { sub: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { sub: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; email: string }
    return decoded
  } catch {
    return null
  }
}

export async function findAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({ where: { email } })
}

export async function createAdmin(email: string, password: string) {
  const hash = await hashPassword(password)
  return prisma.adminUser.create({ data: { email, password: hash } })
}
