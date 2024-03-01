import type { Metadata, Viewport } from "next";

import "./globals.css";
import SecondLayout from "./second-layout";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: '컴시간 뷰어',
  description: '컴시간 뷰어'
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