'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Timetable from './timetable';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const Main: React.FC<{
    addedClasses: Array<LSClass>,
    classSelection: number,
    setClassSelection: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<string>>
}> = ({ addedClasses, classSelection, setClassSelection, setPage }) => {
    const [hasAddedClasses, setHasAddedClasses] = useState(false);
    useEffect(() => {
        if (addedClasses.length > 0) {
            setHasAddedClasses(true);
        }
    }, [addedClasses]);
    if (!hasAddedClasses) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
                <div className="border border-slate-300 rounded p-8">
                    <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                    <br />
                    <p>시간표를 추가하세요.</p>
                    <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-200 focus:ring" onClick={(e) => setPage('add1')}>
                        추가하기
                    </button>
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
                        <button onClick={(e) => setPage('manage')} >
                            <Image src="settings.svg" alt="시간표 관리하기" width={24} height={24} />
                        </button>
                    </div>
                    <br />
                    <select className="border border-slate-400 h-12 rounded-lg p-4 pt-2 mr-2 w-[100%]" id="grade" onChange={(e) => {
                        if (e.target.value === "placeholder") setClassSelection(-1);
                        else setClassSelection(parseInt(e.currentTarget.value));
                    }}>
                    <option value="placeholder">시간표</option>
                    {
                        Array.from({ length: addedClasses.length }, (_, i) => (
                            <option key={i} value={i}>{addedClasses[i].school.name} {addedClasses[i].grade + 1}학년 {addedClasses[i].classNum + 1}반</option>
                        ))
                    }
                </select>
                <br />
                {classSelection >= 0 && <Timetable classData={addedClasses[classSelection]} />}
            </div>
            </main >
        );
    }
}

export default Main;