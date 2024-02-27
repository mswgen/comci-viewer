'use client';

import { useState } from 'react';

const AddSchool: React.FC<{
    setSiteCodeChanged: React.Dispatch<React.SetStateAction<boolean>>,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    setSchool: React.Dispatch<React.SetStateAction<{ name: string, code: number }>>
}> = ({ setSiteCodeChanged, setPage, setSchool }) => {
    const [schoolList, setSchoolList] = useState([]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <h1 className="text-center text-3xl">시간표 추가하기</h1>
                <br />
                <p>학교를 먼저 선택하세요.</p>
                <br />
                <input type="text" className="border border-slate-400 h-12 rounded-lg p-4" id="schoolName" placeholder="학교 이름" onKeyUp={async (e) => {
                    if (e.currentTarget.value.length < 1) return;
                    const schoolList = await fetch(`/api/search?name=${e.currentTarget.value}`).then(res => res.json());
                    switch (schoolList.code) {
                        case 0: // Success
                            setSchoolList(schoolList.data);
                            break;
                        case 1: // Site code changed
                            setSiteCodeChanged(true);
                            break;
                    }
                }} />
                {schoolList.length > 0 &&
                    <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                        {schoolList.map((school: ({ name: string, code: number }), i) => (
                            <div key={i} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === schoolList.length - 1 ? 'rounded-lg' : ''}`} style={{ cursor: 'pointer' }} onClick={() => {
                                setSchool(school);
                                setPage('add2');
                            }}>
                                {school.name}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </main>
    );
}

export default AddSchool;