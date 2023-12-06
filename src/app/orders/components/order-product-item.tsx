import { computeProductTotalPrice } from "@/helpers/products";
import { Prisma, OrderProduct } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>
      <div className="mr-2 flex w-full flex-col gap-0.5">
        <div className="flex rounded-md bg-accent py-1">
          <p>
            Vendido e entregue por <span className="font-bold">Fire Store</span>
          </p>
        </div>
        <p>{orderProduct.product.name}</p>
        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p>R$ {productTotalPrice.totalPrice},00</p>

            {productTotalPrice.discountPercentage > 0 && (
              <small className="text-ts line-through opacity-60">
                R${Number(productTotalPrice.basePrice).toFixed(2)}
              </small>
            )}
          </div>
          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
