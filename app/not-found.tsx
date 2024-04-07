'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {

    return (
        <>
            <Link href="/"><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.1rem] dark:invert w-9 h-9" tabIndex={1} /></Link>
            <h1 className="text-center text-3xl ml-12">404 Not Found</h1>
            <br />
            <br />
            <p>페이지를 찾을 수 없습니다.</p>
            <p>URL을 맞게 입력했는지 확인하세요.</p>
        </>
    );
}