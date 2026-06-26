import Head from "next/head";
import { useRouter } from "next/router";

import AchievementToast from "../components/AchievementToast";
import AnimatedBackground from "../components/AnimatedBackground";
import CursorGlow from "../components/CursorGlow";
import GameHud from "../components/GameHud";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ScrollProgress from "../components/ScrollProgress";
import TopLeftImg from "../components/TopLeftImg";
import { getBaseUrl, pageMetaByPath, siteConfig } from "../data/siteConfig";

const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/$/, "");
};

const buildCanonicalUrl = (pathname) => {
  const cleanPath = pathname === "/" ? "" : pathname;

  return `${getBaseUrl()}${cleanPath}`;
};

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const normalizedPathname = normalizePathname(pathname);
  const pageMeta = pageMetaByPath[normalizedPathname] || pageMetaByPath["/"];
  const canonicalUrl = buildCanonicalUrl(normalizedPathname);
  const title = pageMeta.title || `${siteConfig.name} | ${siteConfig.role}`;
  const description = pageMeta.description || siteConfig.description;
  const robots = pageMeta.robots || "index, follow";
  const previewImage = `${getBaseUrl()}/og-image.png`;

  return (
    <main className="page bg-site text-white bg-cover bg-no-repeat font-sora relative">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={siteConfig.keywords} />
        <meta name="author" content={siteConfig.owner} />
        <meta name="creator" content={siteConfig.owner} />
        <meta name="publisher" content={siteConfig.owner} />
        <meta name="robots" content={robots} />
        <meta name="theme-color" content="#f13024" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={previewImage} />
      </Head>

      <AnimatedBackground />
      <CursorGlow />
      <GameHud />
      <AchievementToast />
      <ScrollProgress />

      <a
        href="#page-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      <TopLeftImg />
      <Nav />
      <Header />

      <div id="page-content" tabIndex={-1} className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default Layout;
