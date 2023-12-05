import { useSession } from "next-auth/react";
import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Footer from "@/components/ui/footer";

export default async function Home() {
  //data = info user
  // const {data} = useSession();

  // Just products that contains deal
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="">
      <PromoBanner
        src="/banner_home/banner_home01.svg"
        alt="around 10% of discount"
      />

      <Categories />

      <SectionTitle>Ofertas</SectionTitle>
      <ProductList products={deals} />
      <PromoBanner src="/banner_home/banner_home02.svg" alt="Mouses 10% off" />

      <SectionTitle>Teclados</SectionTitle>
      <ProductList products={keyboards} />

      <PromoBanner src="/banner_home/banner_home03.svg" alt="Mouses 10% off" />

      <SectionTitle>Mouses</SectionTitle>
      <ProductList products={mouses} />
    </div>
  );
}
