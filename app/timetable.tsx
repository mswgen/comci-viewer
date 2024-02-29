'use client';

import LessonPopup from './lesson-popup';

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


function Card({ content1, content2, gradient, onClickEvent }: { key: number, content1: string, content2?: string, gradient?: boolean, onClickEvent?: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    return (
        <div className={`${gradient && `bg-gradient-to-br from-slate-300 to-white dark:from-slate-800 dark:to-black`} rounded-lg p-2 mb-2 min-w-16 whitespace-nowrap`} style={{ cursor: 'pointer' }} onClick={onClickEvent}>
            <p className={`center font-bold text-lg ${content1 == '' && 'text-gray-400 dark:text-gray-500'}`}>{content1 == '' ? '수업 없음' : content1}</p>
            {
                content2 ? <p className="center text-sm">{content2}</p> : <div className="h-5" />
            }
        </div>
    )
}

const Timetable: React.FC<{
    classData: LSClass
}> = ({ classData }) => {
    const [timetable, setTimetable] = useState<Timetable>({ lastUpdated: new Date(0), timetable: [] });
    const [selectedLesson, setSelectedLesson] = useState<{ subject: string, teacher: string, prevData?: { subject: string, teacher: string } }>({ subject: '', teacher: '' });
    const [isLessonPopupOpen, setIsLessonPopupOpen] = useState(false);
    useEffect(() => {
        const fetchTimetable = async () => {
            const result = await (await fetch(`/api/getTimetable?code=${classData.school.code}&grade=${classData.grade + 1}&classNum=${classData.classNum + 1}`)).json();
            setTimetable(result.data);
        }
        fetchTimetable();
    }, [classData]);

    useEffect(() => {
        (document.querySelector('meta[name="viewport"]') as HTMLMetaElement).setAttribute('content', 'width=device-width, initial-scale=' + Math.min(1, screen.width / 697))
    });
    return (
        <>
            <br />
            <h2 className="font-bold text-xl">{classData.school.name} {classData.grade + 1}학년 {classData.classNum + 1}반</h2>
            <p>마지막 업데이트: {new Date(timetable.lastUpdated).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            <br />
            <div className="grid grid-cols-5 gap-0">
                {timetable.timetable.map((content: Array<({
                    subject: string, teacher: string, prevData?: { subject: string, teacher: string }
                })>, i) => (
                    <div key={i} className="bg-gradient-to-br rounded-lg p-2">
                        {content.map((lesson, j) => (
                            (lesson.subject != '' ?
                                <Card key={j} content1={lesson.subject} content2={`${lesson.teacher} 선생님`} gradient={lesson.prevData ? true : false} onClickEvent={(e) => {
                                    setSelectedLesson(content[j]);
                                    setIsLessonPopupOpen(true);
                                }} /> :
                                (lesson.prevData &&
                                    <Card key={j} content1={''} gradient={true} onClickEvent={(e) => {
                                        setSelectedLesson(content[j]);
                                        setIsLessonPopupOpen(true);
                                    }} />
                                )
                            )
                        ))}
                    </div>
                ))}
            </div>
            {isLessonPopupOpen && <LessonPopup data={selectedLesson} setIsOpen={setIsLessonPopupOpen} />}
        </>
    );
};

export default Timetable;