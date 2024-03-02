'use client';

import localforage from 'localforage';

import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

type LSClass = {
    school: {
        name: string,
        code: number
    },
    grade: number,
    classNum: number
};

const ManageClasses: React.FC = () => {
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [notification, setNotification] = useLocalStorage<Array<{ code: number, grade: number, classNum: number }>>("notification", []);
    const [isClient, setIsClient] = useState(false);
    // @ts-ignore
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        localforage.setItem("classSelection", classSelection);
    }, [classSelection]);
    useEffect(() => {
        localforage.setItem("addedClasses", addedClasses);
    }, [addedClasses]);
    useEffect(() => {
        localforage.setItem("notification", notification);
    }, [notification]);
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            setInstallPrompt(e);
        });
    }, []);


    return (addedClasses.length > 0 && isClient) ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem] dark:invert" /></button>
                <h1 className="text-center text-v3xl ml-12">시간표 관리하기</h1>
                <br />
                <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                    {addedClasses.map((addedClass: LSClass, i) => (
                        <div key={i} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === addedClasses.length - 1 ? 'rounded-lg' : ''}`}>
                            <div className="grid grid-cols-[auto_1fr_auto_auto]">
                                <p>{addedClass.school.name} {addedClass.grade + 1}학년 {addedClass.classNum + 1}반</p>
                                <div className="min-w-12" />
                                <button onClick={async (e) => {
                                    if (notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum)) {
                                        if (!confirm('알림을 해제하시겠습니까?')) return;
                                        setNotification(notification.filter(x => x.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                    } else {
                                        if (!('Notification' in window)) {
                                            alert('이 브라우저는 알림을 지원하지 않습니다.');
                                            return;
                                        }
                                        if (window.matchMedia('(display-mode: standalone)').matches) {
                                            if (Notification.permission === 'denied') {
                                                alert('알림이 차단되어 있습니다. 사이트 설정에서 알림을 허용해주세요.');
                                                return;
                                            }
                                            if (confirm(`알림을 설정하시겠습니까?${Notification.permission === 'default' ? ' 설정하려면 확인을 누른 다음 알림을 허용해주세요.' : ''}`)) {
                                                Notification.requestPermission().then((permission) => {
                                                    if (permission === 'granted') {
                                                        setNotification([...notification, { code: addedClass.school.code, grade: addedClass.grade, classNum: addedClass.classNum }]);
                                                    } else {
                                                        alert('알림이 차단되어 알림을 설정할 수 없습니다.');
                                                    }
                                                });
                                            }
                                        } else {
                                            alert('브라우저 제약으로 인해 앱을 설치해야 알림을 받을 수 있습니다. 앱이 설치되어 있다면 앱에서 실행해주세요.');
                                            if (!installPrompt) return;
                                            const installResult = await installPrompt.prompt();
                                            if (installResult.outcome === 'accepted') {
                                                setInstallPrompt(null);
                                            }
                                        }
                                    }
                                }}>
                                    {notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum) ? (
                                        <Image src="/notification-off.svg" alt="알림 해제" width={24} height={24} className="mr-3" />
                                    ) : (
                                        <Image src="/notification.svg" alt="알림 해제" width={24} height={24} className="mr-3 dark:invert" />
                                    )}
                                </button>
                                <button onClick={(e) => {
                                    if (confirm(`${notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum) ? '시간표를 삭제하면 변경 알림도 해제됩니다. ' : ''}정말 삭제하시겠습니까?`)) {
                                        if (classSelection >= addedClasses.length - 1) setClassSelection(addedClasses.length - 2);
                                        setAddedClasses(addedClasses.filter((x) => x.school.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                        if (notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum)) setNotification(notification.filter(x => x.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                    }
                                }}>
                                    <Image src="/remove.svg" alt="삭제" width={24} height={24} className="mr-3 dark:invert" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <Link href="/add">
                    <button className="w-[70%] ml-[15%] mr-[15%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                        시간표 추가하기
                    </button>
                </Link>
            </div>
        </main>
    ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <button onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.4rem] dark:invert" /></button>
                <h1 className="text-center text-v3xl ml-12">시간표 관리하기</h1>
                <br />
                <p>현재 추가된 시간표가 없습니다.</p>
                <Link href="/add">
                    <button className="w-[60%] ml-[20%] mr-[20%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                        시간표 추가하기
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default ManageClasses;