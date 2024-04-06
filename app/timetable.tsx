'use client';

import Image from 'next/image';
import LessonPopup from './lesson-popup';
import Dialog from './dialog';

import { useState, useEffect } from 'react';
import type { Timetable } from 'comcigan.js';

type LSStudentClass = {
    school: {
        name?: string,
        code: number
    },
    grade: number,
    classNum: number
};

async function isOnline() {
    try {
        await fetch('/api/isOnline', { cache: 'no-store' });
        return true;
    } catch (e) {
        return false;
    }
}

function Card({ content1, content2, grayText, gradient, onClickEvent }: { content1: string, content2?: string, grayText?: boolean, gradient?: boolean, onClickEvent?: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    return (
        <div className={`${gradient && `bg-gradient-to-br from-slate-300 to-white dark:from-slate-800 dark:to-black`} rounded-lg p-2 mb-2 whitespace-nowrap cursor-pointer`} onClick={onClickEvent}>
            {
                content1 == '' ? <div className="h-5" /> : <p className={`font-bold text-lg ${grayText && 'text-gray-400 dark:text-gray-500'}`}>{content1}</p>
            }
            {
                content2 ? <p className="center text-sm">{content2}</p> : <div className="h-5" />
            }
        </div>
    )
}

const Timetable: React.FC<{
    classData: LSStudentClass
}> = ({ classData }) => {
    const [timetable, setTimetable] = useState<Timetable>({ lastUpdated: new Date(0), date: { start: [1970, 1, 1], end: [1970, 1, 5] }, timetable: [] });
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasCache, setHasCache] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<{ day: number, nth: number, lesson: { subject: string, teacher: string, prevData?: { subject: string, teacher: string } } }>({ day: 0, nth: 0, lesson: { subject: '', teacher: '' } });
    const [isLessonPopupOpen, setIsLessonPopupOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [lastCopied, setLastCopied] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [dialogType, setDialogType] = useState<'alert' | 'confirm'>('alert');
    const [dialogCallback, setDialogCallback] = useState<{ callback: (result: boolean) => void }>({ callback: () => { } });

    useEffect(() => {
        async function checkConnectivity() {
            if (await isOnline() && isOffline) {
                setTimeout(() => {
                    setIsOffline(false);
                }, 300);
            } else if (isOffline === await isOnline()) setIsOffline(!await isOnline());
        }
        const onlineCheck = setInterval(async () => {
            checkConnectivity();
        }, 1000);
        checkConnectivity();
        return () => clearInterval(onlineCheck);
    }, [isOffline]);
    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/getTimetable?code=${classData.school.code}&grade=${classData.grade + 1}&classNum=${classData.classNum + 1}`);
                const result = await response.json();
                setIsLoading(false);
                setIsOffline(response.headers.has('X-Is-Cache') && response.headers.get('X-Is-Cache') === 'true');
                setHasCache(true);
                setTimetable(result.data);
            } catch (e) {
                setIsOffline(true);
                setHasCache(false);
            }
        }
        fetchTimetable();
    }, [classData, isOffline]);
    useEffect(() => {
        document.documentElement.style.setProperty("--viewport-width", ((document.querySelector('main') as HTMLElement).clientWidth / 9 * 10).toString());
        return () => document.documentElement.style.setProperty("--viewport-width", "100vw");
    }, [isOffline, hasCache, isLoading]);
    useEffect(() => {
        if (!isCopied) return;
        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [lastCopied, isCopied]);

    return (
        <>
            <br />
            <div className='grid grid-cols-[auto_1fr_auto]'>
                <h2 className="font-bold text-xl">{classData.school.name || `학교 코드 ${classData.school.code}`} {classData.grade + 1}학년 {classData.classNum + 1}반</h2>
                <div></div>
                <button onClick={() => {
                    if ('clipboard' in navigator) {
                        navigator.clipboard.writeText(`${location.origin}/timetable/${classData.school.code}/${classData.grade + 1}/${classData.classNum + 1}`).then(() => {
                            setIsCopied(true);
                            setLastCopied(Date.now());
                        }).catch(() => {
                            setDialogType('alert');
                            setDialogTitle('클립보드에 복사할 수 없음');
                            setDialogContent('이 브라우저는 클립보드에 복사 기능을 지원하지만 알 수 없는 오류로 인해 현재 복사할 수 없습니다.\n아래 링크를 수동으로 복사해주세요.\n\n' + `${location.origin}/timetable/${classData.school.code}/${classData.grade + 1}/${classData.classNum + 1}`);
                            setShowDialog(true);
                        });
                    } else {
                        setDialogType('alert');
                        setDialogTitle('클립보드 미지원 브라우저');
                        setDialogContent('이 브라우저는 현재 클립보드에 복사 기능을 지원하지 않습니다.\n아래 링크를 수동으로 복사해주세요.\n\n' + `${location.origin}/timetable/${classData.school.code}/${classData.grade + 1}/${classData.classNum + 1}`);
                        setShowDialog(true);
                    }
                }}>
                    {isCopied ?
                        <Image src="/check.svg" alt="시간표 링크 복사하기" width={24} height={24} className="dark:invert max-w-8 max-h-8" />
                        : <Image src="/copy.svg" alt="시간표 링크 복사하기" width={24} height={24} className="dark:invert max-w-8 max-h-8" />
                    }
                </button>
            </div>
            <p>{`${timetable.date.start[0]}년 ${timetable.date.start[1]}월 ${timetable.date.start[2]}일~${timetable.date.end[0]}년 ${timetable.date.end[1]}월 ${timetable.date.end[2]}일`}</p>
            <p>마지막 업데이트: {new Date(timetable.lastUpdated).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}{isOffline ? (
                <span className="text-red-500"> (오프라인 모드)</span>
            ) : <></>}</p>
            <br />
            {
                (!isOffline || hasCache)
                    ? <div className="grid grid-cols-5 gap-0">
                        {timetable.timetable.map((content: Array<({
                            subject: string, teacher: string, prevData?: { subject: string, teacher: string }
                        })>, i) => (
                            <div key={i} className="bg-gradient-to-br rounded-lg p-2">
                                <p className="text-center font-bold text-lg mb-4">{['월', '화', '수', '목', '금'][i]}</p>
                                {isLoading ? (
                                    <>
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                        <Card content1={''} gradient={true} />
                                    </>
                                ) : content.map((lesson, j) => (
                                    (lesson.subject != '' ?
                                        <Card key={j} content1={lesson.subject || '수업 없음'} content2={`${lesson.teacher} 교사`} grayText={lesson.subject ? false : true} gradient={lesson.prevData ? true : false} onClickEvent={(e) => {
                                            setSelectedLesson({ day: i, nth: j, lesson: content[j] });
                                            setIsLessonPopupOpen(true);
                                        }} /> :
                                        (lesson.prevData &&
                                            <Card key={j} content1={'수업 없음'} grayText={true} gradient={true} onClickEvent={(e) => {
                                                setSelectedLesson({ day: i, nth: j, lesson: content[j] });
                                                setIsLessonPopupOpen(true);
                                            }} />
                                        )
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                    : <div>
                        <Image src="/offline.svg" alt="오프라인 상태" width={150} height={150} className="mt-2 mb-8 ml-auto mr-auto dark:invert" />
                        <h2>오프라인 상태입니다.</h2>
                        <p>시간표를 보려면 인터넷 연결이 필요합니다.</p>
                    </div>
            }
            {isLessonPopupOpen && <LessonPopup data={selectedLesson} setIsOpen={setIsLessonPopupOpen} />}
            {showDialog && <Dialog title={dialogTitle} content={dialogContent} type={dialogType} setShowDialog={setShowDialog} callback={dialogCallback.callback} />}
        </>
    );
};

export default Timetable;