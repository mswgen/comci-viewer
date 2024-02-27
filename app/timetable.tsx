'use client';

import { useState, useEffect } from 'react';
import type { Timetable } from 'comci.js';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};


function Card({ content1, content2, gradient }: { key: number, content1: string, content2?: string, gradient?: boolean }) {
    return (
        <div className={`${gradient && `bg-gradient-to-br from-slate-300 to-white`} rounded-lg p-2 mb-2 min-w-16 whitespace-nowrap`}>
            <p className={`center font-bold text-lg ${content1 == '' && 'text-gray-400'}`}>{content1 == '' ? '수업 없음' : content1}</p>
            {
                content2 ? <p className="center text-sm">{content2}</p> : <br />
            }
        </div>
    )
}

const Timetable: React.FC<{
    classData: LSClass
}> = ({ classData }) => {
    const [timetable, setTimetable] = useState<Timetable>({ lastUpdated: new Date(0), timetable: [] });
    useEffect(() => {
        const fetchTimetable = async () => {
            const result = await (await fetch(`/api/getTimetable?code=${classData.school.code}&grade=${classData.grade + 1}&classNum=${classData.classNum + 1}`)).json();
            setTimetable(result.data);
        }
        fetchTimetable();
    }, [classData]);
    return (
        <>
            <br />
            <p>{classData.school.name} {classData.grade + 1}학년 {classData.classNum + 1}반</p>
            <p>마지막 업데이트: {new Date(timetable.lastUpdated).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            <br />
            <div className="grid grid-cols-5 gap-0">
                {timetable.timetable.map((content: Array<({ subject: string, teacher: string, isChanged: boolean })>, i) => (
                    <div key={i} className="bg-gradient-to-br rounded-lg p-2">
                        {content.map((lesson, j) => (
                            (lesson.subject != '' ?
                                <Card key={j} content1={lesson.subject} content2={`${lesson.teacher} 선생님`} gradient={lesson.isChanged} /> :
                                (lesson.isChanged &&
                                    <Card key={j} content1={''} gradient={true} />
                                )
                            )
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Timetable;