import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import "./globals.css";
import SecondLayout from "./second-layout";

const Pretendard = localFont({
  src: '../public/PretendardVariable.woff2',
  weight: "45 920",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: `컴시간 뷰어`,
      template: '컴시간 뷰어 - %s'
    },
    description: '컴시간 뷰어',
    keywords: ['컴시간', '알리미', '컴시간알리미', '시간표', '뷰어'],
    metadataBase: new URL(process.env.URL!),
    twitter: {
      title: `컴시간 뷰어`,
      description: '컴시간 뷰어'
    },
    openGraph: {
      title: `컴시간 뷰어`,
      description: '컴시간 뷰어',
      type: 'website',
      url: `${process.env.URL!}`,
      siteName: '컴시간 뷰어',
      locale: 'ko_KR'
    },
    verification: {
      google: 'psSpWDOJRFV-eoCrziljPAXCtNfdjz4pXqcT3dzf60k'
    },
    alternates: {
      canonical: '/'
    }
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#333333' },
    { media: '(prefers-color-scheme: light)', color: 'white' },
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="text-variable" style={{ fontFamily: Pretendard.style.fontFamily }}>
      <body>
        <main className="flex flex-col items-center justify-between p-12 pb-0 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
          <div className="border border-slate-300 rounded p-8">
            <SecondLayout>
              {children}
            </SecondLayout>
          </div>
        </main>
        <div className="w-full mt-8 mb-8">
          <Link href="https://github.com/mswgen/comci-viewer" rel="noopener noreferrer" target="_blank">
            <Image src="/github.svg" alt="소스코드 보기" width={24} height={24} className="dark:invert opacity-40 ml-auto mr-auto" />
          </Link>
        </div>
      </body>
    </html>
  )
}
