"use client"

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, Percent, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "./separator"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  const {status, data} = useSession()

  const handleLoginClick = async () => {
      await signIn()
    }
  const handleLogoutClick = async () => {
      await signOut();
    };

    return (
        <Card className="flex justify-between p-[1.875rem] items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon/>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="text-left text-lg font-semibold ">
                Menu
                </SheetHeader>


            {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-8 py-4 ">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} className="w-10 rounded-full" />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

                <div className="mt-2 flex flex-col gap-4">

                {status === "unauthenticated" ?
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            
              :
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Logout
              </Button>
            }


              <SheetClose asChild>
              <Link href="/">
                <Button variant="outline" className="justify-start w-full gap-2">
                <HomeIcon size={16}/>
                  Home
                </Button>
                </Link>
              </SheetClose>

                <SheetClose asChild>
                <Link href="/deals">
                  <Button variant="outline" className="justify-start w-full gap-2">
                  <Percent size={16}/>
                    Ofertas
                  </Button>
                </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href='/catalog'>
                    <Button variant="outline" className="justify-start w-full gap-2">
                    <ListOrderedIcon size={16}/>
                      Catalogo
                    </Button>
                  </Link>
                </SheetClose>

                </div>
            </SheetContent>
            
          </Sheet>
          <Link href="/">
            <h1 className="text-lg font-bold">
              <span className="text-primary">FIRE</span> Store
            </h1>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <ShoppingCartIcon/>
              </Button>
            </SheetTrigger>
              <SheetContent>
                <Cart/>
              </SheetContent>
          </Sheet>
        </Card>
      );
}
 
export default Header;