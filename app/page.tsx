'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import Timetable from './timetable';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const Home: React.FC = () => {
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!addedClasses || addedClasses.length === 0 || !isClient) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto flex-shrink">
                <div className="border border-slate-300 rounded p-8">
                    <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                    <br />
                    <p>시간표를 추가하세요.</p>
                    <Link href="/add">
                        <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-200 focus:ring">
                            추가하기
                        </button>
                    </Link>
                </div>
            </main>
        );
    } else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
                <div className="border border-slate-300 rounded p-8">
                    <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                    <br />
                    <div className="grid grid-cols-[auto_1fr_auto]">
                        <p>시간표를 선택하세요.</p>
                        <span />
                        <Link href="/manage">
                            <button>
                                <Image src="settings.svg" alt="시간표 관리하기" width={24} height={24} />
                            </button>
                        </Link>
                    </div>
                    <br />
                    <select className="border border-slate-400 h-12 rounded-lg p-4 pt-2 mr-2 w-[100%]" id="grade" onChange={(e) => {
                        setClassSelection(parseInt(e.currentTarget.value));
                    }}>
                        {
                            Array.from({ length: addedClasses.length }, (_, i) => (
                                <option key={i} value={i} selected={i === classSelection}>{addedClasses[i].school.name} {addedClasses[i].grade + 1}학년 {addedClasses[i].classNum + 1}반</option>
                            ))
                        }
                    </select>
                    <br />
                    <Timetable classData={addedClasses[classSelection]} />
                </div>
            </main>
        );
    }
}

export default Home;