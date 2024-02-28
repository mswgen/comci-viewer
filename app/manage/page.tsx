'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const ManageClasses: React.FC = () => {
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        if (addedClasses.length > 0 && isClient) (document.querySelector('meta[name="viewport"]') as HTMLMetaElement).setAttribute('content', 'width=device-width, initial-scale=' + screen.width / 434);
    });

    return (addedClasses.length > 0 && isClient) ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem] dark:invert" /></button>
                <h1 className="text-center text-3xl ml-12">시간표 관리하기</h1>
                <br />
                <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                    {addedClasses.map((addedClass: LSClass, i) => (
                        <div key={i} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === addedClasses.length - 1 ? 'rounded-lg' : ''}`}>
                            <div className="grid grid-cols-[auto_1fr_auto]">
                                <p>{addedClass.school.name} {addedClass.grade + 1}학년 {addedClass.classNum + 1}반</p>
                                <div className="min-w-12" />
                                <button onClick={(e) => {
                                    if (confirm("정말 삭제하시겠습니까?")) {
                                        if (classSelection >= addedClasses.length - 1) setClassSelection(addedClasses.length - 2);
                                        setAddedClasses(addedClasses.filter((x) => x.school.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                    }
                                }}>
                                    <Image src="remove.svg" alt="삭제" width={24} height={24} className="mr-3 dark:invert" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <Link href="/add">
                    <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                        시간표 추가하기
                    </button>
                </Link>
            </div>
        </main>
    ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem]" /></button>
                <h1 className="text-center text-3xl ml-12">시간표 관리하기</h1>
                <br />
                <p>현재 추가된 시간표가 없습니다.</p>
                <Link href="/add">
                    <button className="w-[60%] ml-[20%] mr-[20%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                        시간표 추가하기
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default ManageClasses;