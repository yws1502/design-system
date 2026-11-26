import type { NextConfig } from "next";

// GitHub Pages 배포(.github/workflows/pages.yml)에서만 켠다.
// 프로젝트 페이지라 https://yws1502.github.io/design-system/ 아래에 놓이므로 basePath 가 필요하고,
// 정적 호스팅이라 이미지 최적화 서버가 없다. 로컬 dev · build 는 그대로 둔다.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // 좌하단은 사이드바 푸터의 프로젝트 블록, 우하단은 토스트가 쓴다.
  // 갤러리에서는 양쪽 하단이 모두 검수 대상이라 인디케이터를 끈다.
  devIndicators: false,
  ...(isPages && {
    output: "export",
    basePath: "/design-system",
    trailingSlash: true,
  }),
  images: {
    unoptimized: isPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
