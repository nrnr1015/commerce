import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();


const productData: Prisma.productsCreateInput[] = Array.apply(
    null,
    Array(100)
).map((_, index) => ({
    name : `Dark Jeans ${index + 1}`,
    category_id:1,
    image_url : `https://picsum.photos/id/1019/250/150/`,
    // price: Math.floor(Math.random() * (10000 - 20000) + 20000),
}))

async function main () {
    await prisma.products.deleteMany({});

    for(const p of productData){
        const product = await prisma.products.create({
            data: p
        })
        console.log(`create id ${product.id}}`);

    }
}
main()
.then(
    async () => {
        await prisma.$disconnect()
    }
)
.catch(async(e) => {
    console.error('e: ', e);
    await prisma.$disconnect()
    process.exit(1)
})