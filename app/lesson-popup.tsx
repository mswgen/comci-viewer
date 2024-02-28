'use client';

import Image from 'next/image';

import subjectNameSubstitutesOrig from './subjectNames.json';

const subjectNameSubstitutes: { [key: string]: string } = subjectNameSubstitutesOrig.subjectNameSubstitutes;


function LessonPopup({ data, setIsOpen }: { data: { subject: string, teacher: string, prevData?: { subject: string, teacher: string } }, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <div className="z-10 bg-black opacity-70 fixed top-0 bottom-0 left-0 right-0" style={{ cursor: 'pointer' }} onClick={(e) => { setIsOpen(false); }} />
            <div className={`border border-slate-300 rounded p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#424242] pt-2`}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                }}><Image src="close.svg" alt="닫기" height={36} width={36} className="absolute mt-[.1rem] -ml-2 dark:invert" tabIndex={1} /></button>
                <h1 className="text-center text-xl -ml-8">상세정보</h1>
                <br />
                <p className={`center font-bold text-2xl mr-32 ${data.subject == '' && 'text-gray-400 dark:text-gray-500'}`}>{data.subject == '' ? '수업 없음' : (
                    Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                        return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                    }, data.subject)
                )}</p>
                {
                    data.teacher ? <p className="center text-md">{data.teacher} 선생님</p> : null
                }
                {
                    data.prevData && (
                        <div className="border-slate-400 border rounded-lg mt-4 p-4">
                            <div className="p-3">
                                <p className="text-sm text-gray-400 dark:text-gray-500 mr-8">시간표 변경 전 수업</p>
                                <br />
                                <p className="center font-bold text-2xl">{Object.keys(subjectNameSubstitutes).reduce((prevVal, currVal) => {
                                    return prevVal.replace(new RegExp(currVal, 'gi'), subjectNameSubstitutes[currVal]);
                                }, data.prevData.subject)}</p>
                                <p>{data.prevData.teacher} 선생님</p>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default LessonPopup;