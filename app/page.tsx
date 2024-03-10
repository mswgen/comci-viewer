'use client';

import localforage from 'localforage';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import Timetable from './timetable';
import TeacherTimetable from './teacher-timetable';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade?: number,
    classNum?: number,
    teacher?: {
        name: string,
        code: number
    }
};

const Home: React.FC = () => {
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [isClient, setIsClient] = useState(false);
    const [classSelectionInit, setClassSelectionInit] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        const getIndexedDBClassSelection = async () => {
            const classSelection = await localforage.getItem("classSelection");
            return classSelection;
        }
        if (classSelectionInit) return;
        getIndexedDBClassSelection().then(IDClassSelection => {
            if (typeof IDClassSelection === 'number' && IDClassSelection !== classSelection) setClassSelection(IDClassSelection);
            setClassSelectionInit(true);
        });
    }, [classSelection, setClassSelection, classSelectionInit]);
    useEffect(() => {
        if (classSelectionInit) {
            localforage.setItem("classSelection", classSelection);
        }
    }, [classSelection, classSelectionInit]);
    useEffect(() => {
        localforage.setItem("addedClasses", addedClasses);
    }, [addedClasses]);

    if (!addedClasses || addedClasses.length === 0 || !isClient) {
        return (
            <>
                <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                <br />
                <p>시간표를 추가하세요.</p>
                <Link href="/add">
                    <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                        추가하기
                    </button>
                </Link>
            </>
        );
    } else {
        return (
            <>
                <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                <br />
                <div className="grid grid-cols-[auto_1fr_auto]">
                    <div className="grid grid-rows-[1fr_auto_1fr]">
                        <div />
                        <p>시간표를 선택하세요.</p>
                        <div />
                    </div>
                    <span />
                    <Link href="/manage">
                        <button className="grid grid-cols-[1fr_auto_1fr]">
                            <div />
                            <Image src="/settings.svg" alt="시간표 관리하기" width={24} height={24} className="dark:invert max-w-8 max-h-8" />
                            <div />
                        </button>
                    </Link>
                </div>
                <br />
                <label htmlFor="grade" className="block w-0 h-0">시간표 선택</label>
                <select className="border border-slate-400 h-12 rounded-lg p-4 pt-0 pb-0 mr-2 w-[100%] dark:bg-[#424242]" id="grade" defaultValue={classSelection} onChange={(e) => {
                    setClassSelection(parseInt(e.currentTarget.value));
                }}>
                    {
                        Array.from({ length: addedClasses.length }, (_, i) => (
                            <option key={i} value={i}>{
                                // @ts-ignore
                                addedClasses[i].grade != null ? `${addedClasses[i].school.name} ${addedClasses[i].grade + 1}학년 ${addedClasses[i].classNum + 1}반`
                                    : `${addedClasses[i].school.name} ${addedClasses[i].teacher!.name} 교사`
                            }</option>
                        ))
                    }
                </select>
                <br />
                {addedClasses[classSelection].grade != null ?
                    // @ts-ignore
                    <Timetable classData={addedClasses[classSelection]} />
                    // @ts-ignore
                    : <TeacherTimetable classData={addedClasses[classSelection]} />
                }
            </>
        );
    }
}

export default Home;