import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            email: "test@test.com",
            name: "Test User",
            password: `$2b$12$wylqDr1chQPQ7VPUh9Lo3umThVbp7hKde7zJEx/DY1JFjiLH/3f0q`, //password
            verified: true,
            kycInfo: {
                create: {
                    bvn: "22394832848",
                    userId: 1,
                    status: "APPROVED"
                }
            },
            account: {
                create: {
                    bankCode: "100004",
                    accountNumber: "7055604770",
                    accountName: "EMMANUEL ANUOLUWA ITAKPE",
                    lnAddress: "test@mavapay.money",
                    userId: 1
                }
            },
            lnAddress: {
                create: {
                    address: "test@mavapay.money"
                }
            }
        }
    })
    await prisma.partner.upsert({
        where: { name: "test_partner" },
        update: {},
        create: {
            name: "test_partner",
            domain: "https://test.com",
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3RfcGFydG5lciIsImRvbWFpbiI6Imh0dHBzOi8vdGVzdC5jb20ifQ.vP_xgLN9JbJfsh9_-CbOcskTgceNUhydJVUM_i1a4zc"
        }
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
