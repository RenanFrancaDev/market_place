import { prismaClient } from "@/lib/prisma";

interface ProducDetailsPageProps{
    params:{
        slug: string
    }
}
 
const ProductDetailPage = async ({params: { slug }}: ProducDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug: slug,
        }
    })

    if (!product) return null

    return ( 
        <div>{product.slug}</div>
     );
}
 
export default ProductDetailPage;