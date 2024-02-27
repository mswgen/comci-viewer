'use client';

import Image from 'next/image';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const ManageClasses: React.FC<{
    setSiteCodeChanged: React.Dispatch<React.SetStateAction<boolean>>,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    addedClasses: Array<LSClass>,
    setAddedClasses: React.Dispatch<React.SetStateAction<Array<LSClass>>>
}> = ({ setSiteCodeChanged, setPage, addedClasses, setAddedClasses }) => {
    return addedClasses.length > 0 ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <h1 className="text-center text-3xl">시간표 관리하기</h1>
                <br />
                <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                    {addedClasses.map((addedClass: LSClass, i) => (
                        <div key={i} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === addedClasses.length - 1 ? 'rounded-lg' : ''}`}>
                            <div className="grid grid-cols-[auto_1fr_auto]">
                                <p>{addedClass.school.name} {addedClass.grade + 1}학년 {addedClass.classNum + 1}반</p>
                                <div className="min-w-12" />
                                <button onClick={(e) => {
                                    if (confirm("정말 삭제하시겠습니까?")) {
                                        setAddedClasses(addedClasses.filter((x) => x.school.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                    }
                                }}>
                                    <Image src="remove.svg" alt="삭제" width={24} height={24} className="mr-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-200 focus:ring" onClick={(e) => setPage('add1')}>
                    시간표 추가하기
                </button>
            </div>
        </main>
    ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <h1 className="text-center text-3xl">시간표 관리하기</h1>
                <br />
                <p>현재 추가된 시간표가 없습니다.</p>
                <button className="w-[60%] ml-[20%] mr-[20%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-200 focus:ring" onClick={(e) => {
                    setPage('add1');
                }}>
                    시간표 추가하기
                </button>
            </div>
        </main>
    )
}

export default ManageClasses;