'use client';

import localforage from 'localforage';

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
    grade?: number,
    classNum?: number,
    teacher?: {
        name: string,
        code: number
    }
};

async function isOnline() {
    try {
        await fetch('/api/isOnline', { cache: 'no-store' });
        return true;
    } catch (e) {
        return false;
    }
}

const AddClass: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [schoolList, setSchoolList] = useState([]);
    const [tmpSchool, setTmpSchool] = useState({ name: '', code: 0 });
    const [isOffline, setIsOffline] = useState(false);
    const [phase, setPhase] = useState(1);
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [isInvalidSchool, setIsInvalidSchool] = useState(false);
    const router = useRouter();

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
        localforage.setItem("addedClasses", addedClasses);
    }, [addedClasses]);
    useEffect(() => {
        document.documentElement.style.setProperty("--viewport-width", ((document.querySelector('main') as HTMLElement).clientWidth / 9 * 10).toString());
        return () => document.documentElement.style.setProperty("--viewport-width", "100vw");
    }, [phase]);
    useEffect(() => {
        let isValid = true;
        async function fetchSearchResults() {
            const schoolList = await fetch(`/api/search?name=${keyword}`).then(res => res.json());
            if (isValid) setSchoolList(schoolList.data || []);
        }
        fetchSearchResults();
        return () => { isValid = false; };
    }, [keyword]);

    return isOffline ? (
        <>
            <Image src="/offline.svg" alt="오프라인 상태" width={150} height={150} className="mt-2 mb-8 ml-auto mr-auto dark:invert" />
            <h2>오프라인 상태입니다.</h2>
            <p>시간표를 추가하려면 인터넷 연결이 필요합니다.</p>
        </>
    )
        : (phase === 1 ? (
            <>
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem] dark:invert w-9 h-9" tabIndex={1} /></button>
                <h1 className="text-center text-3xl ml-12">시간표 추가하기</h1>
                <br />
                <p>학교를 먼저 선택하세요.</p>
                <br />
                <input type="text" className="border border-slate-400 h-12 rounded-lg p-4 w-[100%] dark:bg-[#424242]" id="schoolName" placeholder="학교 이름" onKeyUp={(e) => { setIsInvalidSchool(false); setKeyword(e.currentTarget.value); }} tabIndex={2} />
                {isInvalidSchool && <div className="text-red-500">컴시간을 사용하지 않는 학교입니다.</div>}
                {schoolList.length > 0 &&
                    <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                        {schoolList.map((school: ({ name: string, code: number }), i) => (
                            <button key={i} tabIndex={i + 3} className={`block w-full pt-3 pb-3 border-b border-slate-400 cursor-pointer ${i === schoolList.length - 1 ? 'rounded-lg' : ''}`} onClick={() => {
                                setIsInvalidSchool(false);
                                setTmpSchool(school);
                                setPhase(2);
                            }}>
                                {school.name}
                            </button>
                        ))}
                    </div>
                }
            </>
        ) : (
            <AddClass2 school={tmpSchool} addedClasses={addedClasses} setAddedClasses={setAddedClasses} setPhase={setPhase} setIsInvalidSchool={setIsInvalidSchool} />
        ));
}

const AddClass2: React.FC<{
    school: { name: string, code: number },
    addedClasses: Array<LSClass>,
    setAddedClasses: React.Dispatch<React.SetStateAction<Array<LSClass>>>,
    setPhase: React.Dispatch<React.SetStateAction<number>>,
    setIsInvalidSchool: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ school, addedClasses, setAddedClasses, setPhase, setIsInvalidSchool }) => {
    const router = useRouter();
    const [grade, setGrade] = useState(-1);
    const [classNum, setClassNum] = useState(-1);
    const [teacher, setTeacher] = useState(-1);
    const [schoolInfo, setSchoolInfo] = useState({ lastUpdated: new Date(0), data: { grades: 0, classes: [], teachers: [] } });
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [isTeacherSelected, setIsTeacherSelected] = useState(false);

    useEffect(() => {
        let isValid = true;
        const fetchSchoolInfo = async () => {
            const result = await getSchoolInfo(school.code);
            if (isValid) {
                if (result.code === 2) {
                    setIsInvalidSchool(true);
                    setPhase(1);
                }
                else setSchoolInfo(result.data);
            }
        };
        fetchSchoolInfo();
        return () => { isValid = false; };
    }, [school, setPhase, setIsInvalidSchool]);
    useEffect(() => {
        localforage.setItem("classSelection", classSelection);
    }, [classSelection]);

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                setPhase(1);
            }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem] dark:invert w-9 h-9" /></button>
            <h1 className="text-center text-3xl ml-12">시간표 추가하기</h1>
            <br />
            <input type="radio" name="teacher" id="student" value="student" checked={!isTeacherSelected} onChange={(e) => { setIsTeacherSelected(!e.currentTarget.checked); }} />
            <label htmlFor="student" className="ml-4 mr-6">학생 시간표</label>
            <input type="radio" name="teacher" id="teacher" value="teacher" checked={isTeacherSelected} onChange={(e) => { setIsTeacherSelected(e.currentTarget.checked); }} />
            <label htmlFor="teacher" className="ml-4">교사 시간표</label>
            <br />
            <br />
            {isTeacherSelected ?
                <>
                    <p>교사를 선택하세요.</p>
                    <br />
                    <select className="border border-slate-400 h-12 rounded-lg p-4 pt-0 pb-0 mr-2 w-full dark:bg-[#424242]" id="teacher" onChange={(e) => {
                        if (e.target.value === "placeholder") setGrade(-1);
                        else setTeacher(parseInt(e.currentTarget.value) - 1);
                    }}>
                        <option value="placeholder">교사</option>
                        {
                            Array.from({ length: schoolInfo.data.teachers.length }, (_, i) => (
                                <option key={i} value={i + 1}>{schoolInfo.data.teachers[i]} 교사</option>
                            ))
                        }
                    </select>
                    {(addedClasses.some(x => x.school.code === school.code && x.grade == null && x.teacher!.code === teacher)) ? <div className="text-red-500">이미 추가된 교사입니다.</div> : <br />}
                    <button className="w-[40%] ml-[30%] mr-[30%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:hover:bg-gray-500 dark:disabled:hover:bg-gray-700 transition-all ease-in-out duration-200 focus:ring" disabled={teacher === -1 || addedClasses.some(x => x.school.code == school.code && x.grade == null && x.teacher!.code === teacher)} onClick={(e) => {
                        setAddedClasses([...addedClasses, { school, teacher: { name: schoolInfo.data.teachers[teacher], code: teacher } }]);
                        setClassSelection(addedClasses.length);
                        router.push('/');
                    }}>
                        추가하기
                    </button>
                </>
                : <>
                    <p>학년, 반을 선택하세요.</p>
                    <br />
                    <select className="border border-slate-400 h-12 rounded-lg p-4 pt-0 pb-0 mr-2 w-[45%] dark:bg-[#424242]" id="grade" onChange={(e) => {
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
                    <select className="border border-slate-400 h-12 rounded-lg p-4 pt-0 pb-0 ml-2 w-[45%] dark:bg-[#424242]" id="class" onChange={(e) => {
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
                    {(addedClasses.some(x => x.school.code === school.code && x.grade === grade && x.classNum === classNum)) ? <div className="text-red-500">이미 추가된 반입니다.</div> : <br />}
                    <button className="w-[40%] ml-[30%] mr-[30%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:hover:bg-gray-500 dark:disabled:hover:bg-gray-700 transition-all ease-in-out duration-200 focus:ring" disabled={grade === -1 || classNum == -1 || addedClasses.some(x => x.school.code == school.code && x.grade === grade && x.classNum === classNum)} onClick={(e) => {
                        setAddedClasses([...addedClasses, { school, grade, classNum }]);
                        setClassSelection(addedClasses.length);
                        router.push('/');
                    }}>
                        추가하기
                    </button>
                </>
            }
        </>
    );
}

export default AddClass;