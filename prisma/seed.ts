import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@webrain.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@webrain.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin kullanıcısı oluşturuldu:', adminUser.email)
  
  // Test kullanıcıları oluştur
  const testUsers = [
    {
      firstName: 'Mal',
      lastName: 'Kabulcü',
      email: 'mal@webrain.com',
      password: 'mal123',
      role: 'MAL_KABULCU' as const,
    },
    {
      firstName: 'Muhasebe',
      lastName: 'Kullanıcı',
      email: 'muhasebe@webrain.com',
      password: 'muhasebe123',
      role: 'MUHASEBE' as const,
    },
    {
      firstName: 'Satın',
      lastName: 'Almacı',
      email: 'satin@webrain.com',
      password: 'satin123',
      role: 'SATIN_ALMACI' as const,
    },
  ]

  for (const userData of testUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      },
    })
    
    console.log(`${userData.role} kullanıcısı oluşturuldu:`, userData.email)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
