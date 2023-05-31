import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import Layout from "@/components/layout/Layout.js";
import { NextSeo } from "next-seo";
import SEO from "@/../next-seo.config";
import "@/styles/main.scss";
import { PolicyProvider } from "util/policy-provider";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname.startsWith("/pdf"))
    return (
      <>
        <NextSeo {...SEO} />
        <Component {...pageProps} />
      </>
    );

  return (
    <Layout>
      <PolicyProvider>
        <NextSeo {...SEO} />
        <Component {...pageProps} />
      </PolicyProvider>
    </Layout>
  );
}
