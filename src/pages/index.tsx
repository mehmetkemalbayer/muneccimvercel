import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HeroSection from "../sections/Hero";
import MarketsSection from "../sections/Markets";

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <MarketsSection />
    </>
  );
};

export default Home;
