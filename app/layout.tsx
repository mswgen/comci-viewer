import type { Metadata, Viewport } from "next";

import "./globals.css";
import SecondLayout from "./second-layout";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
      title: {
        default: `컴시간 뷰어`,
        template: '컴시간 뷰어 - %s'
      },
      description: '컴시간 뷰어',
      keywords: ['컴시간', '시간표', '뷰어'],
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
    <SecondLayout>
      {children}
    </SecondLayout>
  )
}