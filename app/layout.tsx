import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import SecondLayout from "./second-layout";

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

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
    <html lang="ko" className="text-variable" style={{ fontFamily: NotoSansKR.style.fontFamily }}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
          <div className="border border-slate-300 rounded p-8">
            <SecondLayout>
              {children}
            </SecondLayout>
          </div>
        </main>
      </body>
    </html>
  )
}
