import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기본 위치(좌하단)가 사이드바 푸터의 프로젝트 블록을 가린다.
  devIndicators: {
    position: "bottom-right",
  },
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
