"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Categories from './components/categories';

export default function Home() {
  //data = info user
  const {data} = useSession();
  return (
    <div className='p-5'>
    <Image
    src="/banner_home/banner_home01.svg"
    alt='around 10% of discount'
    height={0}
    width={0}
    className='h-auto w-full'
    sizes='100vw'
    />
    <Categories className="mt-8"/>
    </div>
  )
}
