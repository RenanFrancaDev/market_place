import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order, Prisma } from "@prisma/client";
import { format } from 'date-fns'
import OrderProductItem from "./order-product-item";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/products";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
      include: {
        orderProducts: {
          include: { product: true };
        };
      };
    }>;
  }

const OrderItem = ({order}: OrderItemProps) => {


    const subtotal = useMemo(() => {
        return order.orderProducts.reduce((acc, orderProduct) => {
          return (
            acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
          );
        }, 0);
      }, [order.orderProducts]);

      const total = useMemo(() => {
          return order.orderProducts.reduce((acc, product) => {
        const productTotalPrice = computeProductTotalPrice(product.product);
          return acc + productTotalPrice.totalPrice * product.quantity;
        }, 0);
      }, [order.orderProducts]);
    
      const totalDiscounts = subtotal - total;

    return ( 
        <Card>
        <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value={order.id}>
                <AccordionTrigger>
                    <div className="flex flex-col gap-1 text-left px-12">
                        Pedido com {order.orderProducts.length} produtos(s)
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                <div className="flex flex-col gap-4 w-full px-2">
              <div className="flex items-center justify-between lg:hidden">
                <div className="font-bold">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="text-xs text-primary lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="text-xs opacity-60 lg:text-sm">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>
              
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

                <div className="flex flex-col w-full gap-1 text-xs">
                    <Separator/>
                    <div className="flex w-full justify-between py-3">
                        <p>Subtotal</p>
                        <p>R$ {subtotal},00</p>
                    </div>

                    <Separator/>
                    <div className="flex w-full justify-between py-3">
                        <p>Entrega</p>
                        <p>Grátis</p>
                    </div>

                    <Separator/>
                    <div className="flex w-full justify-between py-3">
                        <p>Descontos</p>
                        <p>R$ {totalDiscounts},00</p>
                    </div>

                    <Separator/>
                    <div className="flex w-full justify-between py-3 text-sm font-bold">
                        <p>Total</p>
                        <p>R$ {total},00</p>
                    </div>

                </div>

            </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>  
        </Card>
     );
}
 
export default OrderItem;