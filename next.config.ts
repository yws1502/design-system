import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 좌하단은 사이드바 푸터의 프로젝트 블록, 우하단은 토스트가 쓴다.
  // 갤러리에서는 양쪽 하단이 모두 검수 대상이라 인디케이터를 끈다.
  devIndicators: false,
  images: {
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
