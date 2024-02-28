'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useLocalStorage } from 'usehooks-ts';

async function getSchoolInfo(code: number) {
    return await (await fetch(`/api/getSchoolInfo?code=${code}`)).json();
}

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const AddClass: React.FC = () => {
    const [schoolList, setSchoolList] = useState([]);
    const [tmpSchool, setTmpSchool] = useState({ name: '', code: 0 });
    const [phase, setPhase] = useState(1);
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const router = useRouter();

    return phase === 1 ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem]" tabIndex={1} /></button>
                <h1 className="text-center text-3xl ml-12">시간표 추가하기</h1>
                <br />
                <p>학교를 먼저 선택하세요.</p>
                <br />
                <input type="text" className="border border-slate-400 h-12 rounded-lg p-4 w-[100%]" id="schoolName" placeholder="학교 이름" onKeyUp={async (e) => {
                    if (e.currentTarget.value.length < 1) return;
                    const schoolList = await fetch(`/api/search?name=${e.currentTarget.value}`).then(res => res.json());
                    setSchoolList(schoolList.data || []);
                }} tabIndex={2} />
                {schoolList.length > 0 &&
                    <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                        {schoolList.map((school: ({ name: string, code: number }), i) => (
                            <div key={i} tabIndex={i + 3} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === schoolList.length - 1 ? 'rounded-lg' : ''}`} style={{ cursor: 'pointer' }} onClick={() => {
                                setTmpSchool(school);
                                setPhase(2);
                            }}>
                                {school.name}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </main>
    ) : (
        <AddClass2 school={tmpSchool} addedClasses={addedClasses} setAddedClasses={setAddedClasses} setPhase={setPhase} />
    );
}

const AddClass2: React.FC<{
    school: { name: string, code: number },
    addedClasses: Array<LSClass>,
    setAddedClasses: React.Dispatch<React.SetStateAction<Array<LSClass>>>,
    setPhase: React.Dispatch<React.SetStateAction<number>>
}> = ({ school, addedClasses, setAddedClasses, setPhase }) => {
    const router = useRouter();
    const [grade, setGrade] = useState(-1);
    const [classNum, setClassNum] = useState(-1);
    const [schoolInfo, setSchoolInfo] = useState({ lastUpdated: new Date(0), data: { grades: 0, classes: [] } });
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    useEffect(() => {
        const fetchSchoolInfo = async () => {
            const result = await getSchoolInfo(school.code);
            setSchoolInfo(result.data);
        };

        fetchSchoolInfo();
    }, [school]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    setPhase(1);
                    
                }}><Image src="back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem]" /></button>
                <h1 className="text-center text-3xl ml-12">시간표 추가하기</h1>
                <br />
                <p>학년, 반을 선택하세요.</p>
                <br />
                <select className="border border-slate-400 h-12 rounded-lg p-4 pt-2 mr-2 w-[45%]" id="grade" onChange={(e) => {
                    if (e.target.value === "placeholder") setGrade(-1);
                    else setGrade(parseInt(e.currentTarget.value) - 1);
                }}>
                    <option value="placeholder">학년</option>
                    {
                        Array.from({ length: schoolInfo.data.grades }, (_, i) => (
                            <option key={i} value={i + 1}>{i + 1}학년</option>
                        ))
                    }
                </select>
                <select className="border border-slate-400 h-12 rounded-lg p-4 pt-2 ml-2 w-[45%]" id="class" onChange={(e) => {
                    if (e.target.value === "placeholder") setClassNum(-1);
                    else setClassNum(parseInt(e.currentTarget.value) - 1);
                }}>
                    <option value="placeholder">반</option>
                    {
                        grade >= 0 && grade < schoolInfo.data.grades && (
                            Array.from({ length: schoolInfo.data.classes[grade] }, (_, i) => (
                                <option key={i} value={i + 1}>{i + 1}반</option>
                            ))
                        )
                    }
                </select>
                {(addedClasses.some(x => x.school.code == school.code && x.grade === grade && x.classNum === classNum)) ? <div className="text-red-500">이미 추가된 반입니다.</div> : <br />}
                <button className="w-[40%] ml-[30%] mr-[30%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-500 transition-all ease-in-out duration-200 focus:ring" disabled={grade === -1 || classNum == -1 || addedClasses.some(x => x.school.code == school.code && x.grade === grade && x.classNum === classNum)} onClick={(e) => {
                    setAddedClasses([...addedClasses, { school, grade, classNum }]);
                    setClassSelection(addedClasses.length);
                    router.push('/');
                }}>
                    추가하기
                </button>
            </div>
        </main>
    );
}

export default AddClass;