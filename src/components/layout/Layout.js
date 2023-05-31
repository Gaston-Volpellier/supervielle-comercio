import Head from "next/head";
import { useRouter } from "next/router.js";
import Footer from "@/components/footer/index.js";
import Menu from "@/components/navbar/index.js";

const Layout = ({ children, props }) => {
  const router = useRouter();
  const showFooter =
    router.pathname === "/coberturas-extras" ||
    router.pathname === "/clausulas-adicionales"
      ? true
      : false;

  return (
    <>
      <Menu />
      <main>
        <Head>
          <title>Integral de comercio - Supervielle</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
