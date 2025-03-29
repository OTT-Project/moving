import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 기본 메타태그 */}
        <meta
          name="description"
          content="영화를 보는 동안 즐거움이 가득한 MOVING"
        />
        <meta name="keywords" content="무빙, moving, MOVING" />
        <meta name="author" content="moving" />

        {/* 오픈 그래프 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MOVING - 최고의 영화 플랫폼" />
        <meta
          property="og:description"
          content="MOVING은 영화를 사랑하는 모든 이들에게 최고의 경험을 제공합니다."
        />
        <meta property="og:image" content="/images/thumbnail.png" />
        <meta property="og:url" content="https://ott-moving.vercel.app/" />

        {/* 파비콘 */}
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
