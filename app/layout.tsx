import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "컴시간 뷰어",
  description: "컴시간 뷰어",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

async function getSiteCodeStatus() {
  return await (await fetch(`${process.env.URL}/api/checkSiteCode`, { cache: 'no-store' })).json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stat = await getSiteCodeStatus();
  if (stat.code === 1) {
    return (
      <html lang="ko" style={{ fontFamily: NotoSansKR.style.fontFamily }}>
        <body className={NotoSansKR.className}>
          <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="border border-slate-300 rounded p-8">
              <h1 className="text-center text-3xl">데이터를 가져올 수 없음</h1>
              <br />
              <p>컴시간 사이트가 변경되어 데이터를 가져올 수 없습니다.</p>
              <p>관리자에게 문의해주세요.</p>
            </div>
          </main>
        </body>
      </html>
    );
  }
  return (
    <html lang="ko" style={{ fontFamily: NotoSansKR.style.fontFamily }}>
      <body className={NotoSansKR.className}>
        {children}
      </body>
    </html>
  );
}