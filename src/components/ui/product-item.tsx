import { ProductWithTotalPrice } from "@/helpers/products";
import { ArrowDownIcon } from "lucide-react";
import Image from 'next/image'
import { Badge } from "./badge";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProp {
    product: ProductWithTotalPrice
}

const ProductItem = ({ product }: ProductItemProp) => {
    return ( 
        <Link href={`/product/${product.slug}`}>
        <div className="flex flex-col gap-4 max-w-[170px]">
             <div className="relative flex h-[170px]  items-center justify-center rounded-lg bg-accent">
             <Image
             src={product.imageUrls[0]}
             height={0}
             width={0}
             sizes="100vw"
             className="h-[90px] max-h-[70%] w-auto max-w[80%]"
             style={{
               objectFit: "contain"
             }}
             alt={product.name}
          />

            {product.discountPercentage > 0 && (
               <DiscountBadge className="absolute left-3 top-3">
                {product.discountPercentage}
               </DiscountBadge>
            )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2 ">
            {product.discountPercentage > 0 ? (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
        </div>
        </Link>
     );
}
 
export default ProductItem