import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { ShoppingCartIcon } from "lucide-react";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
    return ( 
        <div className="flex h-full flex-col gap-4">
            <Badge
            className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
            variant="outline"
            >
              <ShoppingCartIcon size={16} />
            Carrinho
        </Badge>

        <div className="flex flex-col h-full mt-4 overflow-hidden">
        <ScrollArea>
          <div className="flex flex-col h-full gap-4">
          {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product as any) as any}
            />
          ))
        ) : (
          <p>
            Você ainda não adicionou nenhum produto ao carrinho
          </p>
        )}
        
          </div>
        </ScrollArea>

        </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
          >
            Finalizar compra
          </Button>
          
        </div>
      )}
  
        </div>
     );
}
 
export default Cart;