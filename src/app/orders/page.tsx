import { Badge } from "@/components/ui/badge";
import OrderItem from "@/app/orders/components/order-itens";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const OrderPage = async () => {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Access Denied</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="mb-5 w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>

      {orders.map((order: any) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderPage;
