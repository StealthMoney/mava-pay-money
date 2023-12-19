import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
	    password: `$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy`, //password
      kycInfo: {
        create: {
          bvn: "22394832848"
        }
      },
      account: {
        create: {
          bankCode: "100004",
          accountNumber: "7055604770",
          accountName: "EMMANUEL ANUOLUWA ITAKPE",
          lnAddress: "test@mavapay.money"
        }
      }
    },
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })