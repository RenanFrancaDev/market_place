
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Categories from './components/categories';
import ProductList from '@/components/ui/product-list';
import { prismaClient } from '@/lib/prisma';

export default async function Home() {
  //data = info user
  // const {data} = useSession();

  // Just products that contains deal
  const deals = await prismaClient.product.findMany({
    where:{
      discountPercentage: {
        gt:0,
      },
    },
  })
  return (
    <div>
    <Image
    src="/banner_home/banner_home01.svg"
    alt='around 10% of discount'
    height={0}
    width={0}
    className='h-auto w-full p-5'
    sizes='100vw'
    />
    <Categories/>
    <ProductList products={deals}/>
    </div>
  )
}
