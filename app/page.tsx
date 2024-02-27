'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import AddSchool from './add1';
import SetClass from './add2';
import Main from './main';
import ManageClasses from './manage';

async function getSiteCodeStatus() {
  return await (await fetch("/api/checkSiteCode")).json();
}

type LSClass = {
  school: {
    name: string,
    code: number
  },
  grade: number,
  classNum: number
};


export default function Home() {
  const [siteCodeChanged, setSiteCodeChanged] = useState(false);
  const [page, setPage] = useState('firstload');
  const [school, setSchool] = useState({ name: "", code: 0 });
  const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
  const [classSelection, setClassSelection] = useState(-1);

  useEffect(() => {
    const fetchSiteCodeChanged = async () => {
      const result = await getSiteCodeStatus();
      setSiteCodeChanged(result.code === 1);
    };

    fetchSiteCodeChanged();
  }, []);

  if (siteCodeChanged) {
    return (
      <main className="flex min-h-screen flex-col items-start justify-between p-12">
        <div className="border border-slate-300 rounded p-8">
          <h1 className="text-center text-3xl">데이터를 가져올 수 없음</h1>
          <br />
          <p>컴시간 사이트가 변경되어 데이터를 가져올 수 없습니다.</p>
          <p>관리자에게 문의해주세요.</p>
        </div>
      </main>
    )
  }
  return (
    page === 'add1' ? <AddSchool setSiteCodeChanged={setSiteCodeChanged} setPage={setPage} setSchool={setSchool} /> :
      page === 'add2' ? <SetClass school={school} addedClasses={addedClasses} setAddedClasses={setAddedClasses} setPage={setPage} /> :
        page === 'manage' ? <ManageClasses setSiteCodeChanged={setSiteCodeChanged} setPage={setPage} addedClasses={addedClasses} setAddedClasses={setAddedClasses} /> :
          <Main addedClasses={addedClasses} classSelection={classSelection} setClassSelection={setClassSelection} setPage={setPage} />
  );
}