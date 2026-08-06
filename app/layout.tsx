import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/playground/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design System Playground",
  description: "shadcn/ui (Base UI) 컴포넌트 갤러리",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      // components.json의 style(`base-vega`)과 일치해야 한다.
      // app/globals.css의 style-* variant가 이 값으로 매칭된다.
      data-style="vega"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/*
            두 토스트 구현을 나란히 전시하므로 Toaster도 둘 다 마운트한다.
            - Base UI toast: `components/ui/toast`의 모듈 레벨 매니저를 물고 있어
              앱에 한 번만 있으면 어디서 toast.add()를 불러도 렌더된다.
            - sonner: 자체 Toaster가 필요하고, next-themes의 useTheme을 쓰므로
              ThemeProvider 안쪽에 있어야 한다.
          */}
          <Toaster />
          {/* 둘 다 기본이 우하단이라 겹친다. 갤러리에서는 나란히 비교해야 하므로
              sonner만 상단으로 뺀다. 실제 앱이라면 둘 중 하나만 마운트한다. */}
          <SonnerToaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
