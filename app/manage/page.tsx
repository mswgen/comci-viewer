'use client';

import localforage from 'localforage';

import Image from 'next/image';
import Link from 'next/link';
import Dialog from '../dialog';

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

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

const ManageClasses: React.FC = () => {
    const [addedClasses, setAddedClasses] = useLocalStorage<Array<LSClass>>("addedClasses", []);
    const [classSelection, setClassSelection] = useLocalStorage("classSelection", 0);
    const [notification, setNotification] = useLocalStorage<Array<{ code: number, grade: number, classNum: number }>>("notification", []);
    const [isClient, setIsClient] = useState(false);
    // @ts-ignore
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [dialogType, setDialogType] = useState<'alert' | 'confirm'>('alert');
    const [dialogCallback, setDialogCallback] = useState<{ callback: (result: boolean) => void }>({ callback: () => { } });
    const [loaded, setLoaded] = useState(false);
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
    useEffect(() => {
        if (loaded) document.documentElement.style.setProperty("--viewport-width", ((document.querySelector('main') as HTMLElement).clientWidth / 9 * 10).toString());
        return () => document.documentElement.style.setProperty("--viewport-width", "100vw");
    }, [loaded]);
    useEffect(() => {
        if (isClient) setLoaded(true);
        return () => setLoaded(false);
    }, [isClient]);

    function afterConfirm(addedClass: LSClass) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                setNotification([...notification, { code: addedClass.school.code, grade: addedClass.grade!, classNum: addedClass.classNum! }]);
                setDialogTitle('알림 설정 완료');
                setDialogContent(`알림을 설정했습니다.\n\n브라우저 제약으로 인해 현재 상태로는 알림 받기를 위한 동기화가 2~3일에 한 번 이루어집니다.\n동기화 간격을 6시간으로 줄이려면\n앱을 설치한 브라우저를 열고\n주소창에 chrome://site-engagement를 입력해 접속한 다음\n${location.origin}을 찾고\n그 옆에 있는 숫자(Base 값)를 100으로 수정하세요.\n\n이후에도 주기적으로 앱을 실행해야 합니다.`);
                setDialogType('alert');
                setShowDialog(true);
            } else {
                setDialogTitle('알림을 설정할 수 없음');
                setDialogContent('알림이 차단되어 알림을 설정할 수 없습니다.');
                setDialogType('alert');
                setShowDialog(true);
            }
        });
    }


    return (addedClasses.length > 0 && isClient) ? (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                router.back();
            }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.5rem] dark:invert w-9 h-9" /></button>
            <h1 className="text-center text-3xl ml-12">시간표 관리하기</h1>
            <br />
            <div className="border-slate-400 border-t border-l border-r rounded-lg mt-4">
                {addedClasses.map((addedClass: LSClass, i) => (
                    <div key={i} className={`pt-3 pl-3 pb-3 border-b border-slate-400 ${i === addedClasses.length - 1 ? 'rounded-lg' : ''}`}>
                        <div className="grid grid-cols-[auto_1fr_auto_auto]">
                            <div className="grid grid-rows-[1fr_auto_1fr]">
                                <div />
                                <p>{
                                    addedClass.grade != null ? `${addedClass.school.name} ${addedClass.grade! + 1}학년 ${addedClass.classNum! + 1}반`
                                        : `${addedClass.school.name} ${addedClass.teacher!.name} 교사`
                                }</p>
                                <div />
                            </div>
                            <div className="min-w-12" />
                            {addedClass.grade != null &&
                                <button onClick={async (e) => {
                                    if (notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum)) {
                                        setNotification(notification.filter(x => x.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                    } else {
                                        if (!('Notification' in window)) {
                                            setDialogTitle('알림을 설정할 수 없음');
                                            setDialogContent('이 브라우저는 알림을 지원하지 않습니다.');
                                            setDialogType('alert');
                                            setShowDialog(true);
                                            return;
                                        }
                                        if (window.matchMedia('(display-mode: standalone)').matches) {
                                            switch (Notification.permission) {
                                                case 'denied':
                                                    setDialogTitle('알림을 설정할 수 없음');
                                                    setDialogContent('알림이 차단되어 있습니다.\n브라우저 설정에서 알림을 허용하세요.');
                                                    setDialogType('alert');
                                                    setShowDialog(true);
                                                    break;
                                                case 'granted':
                                                    afterConfirm(addedClass);
                                                    break;
                                                case 'default':
                                                    setDialogTitle('알림 설정하기');
                                                    setDialogContent('알림을 허용하면 시간표 변경 알림을 받을 수 있습니다.\n알림을 설정하려면 확인을 누른 다음 알림을 허용하세요.\n\n저희는 광고를 보내지 않아요.');
                                                    setDialogType('confirm');
                                                    setDialogCallback({
                                                        callback: (result: boolean) => {
                                                            if (result) {
                                                                afterConfirm(addedClass);
                                                            }
                                                        }
                                                    });
                                                    setShowDialog(true);
                                                    break;
                                            }
                                        } else {
                                            setDialogTitle('앱 설치 필요');
                                            setDialogContent('브라우저 제약으로 인해 알림을 받으러면 앱 설치가 필요합니다.\n앱이 설치되어 있다면 앱에서 실행하세요.');
                                            setDialogType('alert');
                                            setDialogCallback({
                                                callback: async () => {
                                                    if (!installPrompt) return;
                                                    const installResult = await installPrompt.prompt();
                                                    if (installResult.outcome === 'accepted') {
                                                        setInstallPrompt(null);
                                                    }
                                                }
                                            });
                                            setShowDialog(true);
                                        }
                                    }
                                }}>
                                    {notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum) ? (
                                        <Image src="/notification-off.svg" alt="알림 해제" width={24} height={24} className="mr-3 w-7 h-7" />
                                    ) : (
                                        <Image src="/notification.svg" alt="알림 해제" width={24} height={24} className="mr-3 w-7 h-7 dark:invert" />
                                    )}
                                </button>
                            }
                            <button onClick={(e) => {
                                const hasNotification = addedClass.grade != null && notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum)
                                if (hasNotification) {
                                    setDialogTitle('시간표 삭제 확인');
                                    setDialogContent('시간표를 삭제하면 시간표 변경 알림을 받을 수 없습니다.\n정말 삭제하시겠습니까?');
                                    setDialogType('confirm');
                                    setDialogCallback({
                                        callback: (result: boolean) => {
                                            if (result) afterDeleteConfirm();
                                        }
                                    });
                                    setShowDialog(true);
                                } else afterDeleteConfirm();
                                function afterDeleteConfirm() {
                                    if (classSelection >= addedClasses.length - 1) setClassSelection(addedClasses.length - 2);
                                    setAddedClasses(addedClasses.filter((x) => x.school.code !== addedClass.school.code ||
                                        (addedClass.grade != null ? (x.grade !== addedClass.grade || x.classNum !== addedClass.classNum) : (!x.teacher || x.teacher!.code !== addedClass.teacher!.code))
                                    ));
                                    if (addedClass.grade != null && notification.some(x => x.code === addedClass.school.code && x.grade === addedClass.grade && x.classNum === addedClass.classNum)) setNotification(notification.filter(x => x.code !== addedClass.school.code || x.grade !== addedClass.grade || x.classNum !== addedClass.classNum));
                                }
                            }}>
                                <Image src="/remove.svg" alt="삭제" width={24} height={24} className="mr-3 w-7 h-7 dark:invert" />
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
            {showDialog && <Dialog title={dialogTitle} content={dialogContent} type={dialogType} setShowDialog={setShowDialog} callback={dialogCallback.callback} />}
        </>
    ) : (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                router.back();
            }}><Image src="/back.svg" alt="뒤로가기" height={36} width={36} className="absolute mt-[.5rem] dark:invert w-9 h-9" /></button>
            <h1 className="text-center text-3xl ml-12">시간표 관리하기</h1>
            <br />
            <p>현재 추가된 시간표가 없습니다.</p>
            <Link href="/add">
                <button className="w-[60%] ml-[20%] mr-[20%] pt-3 pb-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-all ease-in-out duration-200 focus:ring">
                    시간표 추가하기
                </button>
            </Link>
        </>
    )
}

export default ManageClasses;