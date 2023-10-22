import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";

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
        <div>
            <ProductImages
            name={product.name}
            imageUrls={product.imageUrls}/>
        </div>
     );
}
 
export default ProductDetailPage;