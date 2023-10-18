import { HomeIcon, ListOrderedIcon, LogInIcon, MenuIcon, Percent, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
    return (
        <Card className="flex justify-between p-[1.875rem] items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon/>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="text-left text-lg font-semibold">
                Menu
                </SheetHeader>
                <div className="mt-2 flex flex-col gap-4">
                <Button variant="outline" className="justify-start w-full gap-2">
                <LogInIcon size={16}/>
                  Login
                </Button>

                <Button variant="outline" className="justify-start w-full gap-2">
                <HomeIcon size={16}/>
                  Home
                </Button>

                <Button variant="outline" className="justify-start w-full gap-2">
                <Percent size={16}/>
                  Deals
                </Button>

                <Button variant="outline" className="justify-start w-full gap-2">
                <ListOrderedIcon size={16}/>
                  Catalog
                </Button>

                </div>
            </SheetContent>
            
          </Sheet>
          <h1 className="text-lg font-bold">
            <span className="text-primary">FIRE</span> Store
          </h1>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon/>
          </Button>
        </Card>
      );
}
 
export default Header;