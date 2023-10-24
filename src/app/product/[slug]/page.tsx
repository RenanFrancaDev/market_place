import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/products";
import ProductList from "@/components/ui/product-list";

interface ProducDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({
  params: { slug },
}: ProducDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div>
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <ProductList products={product.category.products} />
    </div>
  );
};

export default ProductDetailPage;
