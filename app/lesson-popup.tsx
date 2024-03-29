'use client';

import Image from 'next/image';

import subjectNameSubstitutesOrig from './subjectNames';

const subjectNameSubstitutes: { [key: string]: string } = subjectNameSubstitutesOrig.subjectNameSubstitutes;
const subjectCategories: { [key: string]: Array<string> } = subjectNameSubstitutesOrig.subjectCategories;

function Tag({ subject }: { subject: string }) {
    const tag = Object.keys(subjectCategories).find((key) => subjectCategories[key].some((val) => subject.includes(val)));
    return (
        <div className="rounded-lg bg-blue-500 p-1 h-8 text-white">
            #{tag || '기타 과목'}
        </div>
    )
}

function LessonPopup({ data, setIsOpen }: { data: { day: number, nth: number, lesson: { subject: string, teacher: string, prevData?: { subject: string, teacher: string } } }, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <div className="z-10 bg-black opacity-70 fixed top-0 bottom-0 left-0 right-0 cursor-pointer" onClick={(e) => { setIsOpen(false); }} />
            <div className={`border border-slate-300 rounded p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#424242] pt-2`}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                }}><Image src="/close.svg" alt="닫기" height={36} width={36} className="absolute mt-[.1rem] -ml-2 dark:invert w-9 h-9" tabIndex={1} /></button>
                <h1 className="text-xl ml-10">상세정보</h1>
                <br />
                <p>{['월', '화', '수', '목', '금'][data.day]}요일 {data.nth + 1}교시</p>
                <br />
                <div className="grid grid-cols-[auto_auto_1fr] mr-16">
                    <p className={`font-bold text-2xl mr-3 ${data.lesson.subject == '' && 'text-gray-400 dark:text-gray-500'}`}>{data.lesson.subject == '' ? '수업 없음' : (
                        Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                            return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                        }, data.lesson.subject.toUpperCase())
                    )}</p>
                    {data.lesson.subject !== '' && <Tag subject={
                        Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                            return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                        }, data.lesson.subject.toUpperCase())
                    } />}
                </div>
                {
                    data.lesson.teacher ? <p>{data.lesson.teacher} 교사</p> : null
                }
                {
                    data.lesson.prevData && (
                        <div className="border-slate-400 border rounded-lg mt-4 p-4">
                            <div className="p-3">
                                <p className="text-sm text-gray-400 dark:text-gray-500 mr-8">시간표 변경 전 수업</p>
                                <br />
                                <div className="grid grid-cols-[auto_auto_1fr]">
                                    <p className={`font-bold text-2xl mr-3 ${Object.keys(data.lesson.prevData).length === 0 && 'text-gray-400 dark:text-gray-500'}`}>
                                        {Object.keys(data.lesson.prevData).length === 0 ? '수업 없음' : (
                                            Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                                                return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                                            }, data.lesson.prevData.subject.toUpperCase())
                                        )}
                                    </p>
                                    {Object.keys(data.lesson.prevData).length > 0 && <Tag subject={
                                        Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                                            return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                                        }, data.lesson.prevData.subject.toUpperCase())
                                    } />}
                                    <div />
                                </div>
                                {Object.keys(data.lesson.prevData).length > 0 && <p>{data.lesson.prevData.teacher} 교사</p>}
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default LessonPopup;
