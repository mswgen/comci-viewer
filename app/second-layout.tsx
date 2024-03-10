'use client';

import localforage from "localforage";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import "./globals.css";

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

async function getSiteCodeStatus() {
  return await (await fetch(`/api/checkSiteCode`, { cache: 'no-store' })).json();
}

export default function SecondLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSiteCodeChanged, setIsSiteCodeChanged] = useState(false);
  const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);

  useEffect(() => {
    getSiteCodeStatus().then((stat) => {
      if (stat.code === 1) {
        setIsSiteCodeChanged(true);
      }
    }).catch(() => {
      setIsSiteCodeChanged(false);
    });
  });
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);
  useEffect(() => {
    async function registerPeriodicFeedUpdate() {
      const registration = await navigator.serviceWorker.ready;
      const status = await navigator.permissions.query({
        name: 'periodic-background-sync' as PermissionName
      });
      if (status.state !== 'granted') return;
      try {
        const tags: Array<string> = await (registration as any).periodicSync.getTags();
        tags.forEach(async tag => {
          if (addedClasses.filter(x => x.grade).some((cls) => tag === `timetable-${cls.school.code}-${cls.grade}-${cls.classNum}`)) return;
          await (registration as any).periodicSync.unregister(tag);
        });
        addedClasses.filter(x => x.grade).forEach(async cls => {
          if (tags.some((tag) => tag === `timetable-${cls.school.code}-${cls.grade}-${cls.classNum}`)) return;
          await (registration as any).periodicSync.register(`timetable-${cls.school.code}-${cls.grade}-${cls.classNum}`, {
            minInterval: 60 * 60 * 1000
          });
        });
      } catch (e) { }
    }
    registerPeriodicFeedUpdate();
  }, [addedClasses]);
  useEffect(() => {
    localforage.setItem('addedClasses', addedClasses);
  }, [addedClasses]);

  if (isSiteCodeChanged) {
    return (
      <>
        <h1 className="text-center text-3xl">데이터를 가져올 수 없음</h1>
        <br />
        <p>컴시간 사이트가 변경되어 데이터를 가져올 수 없습니다.</p>
        <p>관리자에게 문의하세요.</p>
      </>
    );
  }
  return children;
}