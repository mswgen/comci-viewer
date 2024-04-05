export default function dialog({ title, content, type, setShowDialog, callback }: { title: string, content: string, type: 'alert' | 'confirm', setShowDialog: React.Dispatch<React.SetStateAction<boolean>>, callback: (result: boolean) => void }) {
    return (
        <>
            <div className="z-10 bg-black opacity-70 fixed top-0 bottom-0 left-0 right-0 cursor-pointer" onClick={() => { setShowDialog(false); if (callback && type === 'confirm') callback(false); }} />
            <div className={`border border-slate-300 rounded p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-[#424242] pt-2`}>
                <br />
                <div className="mr-16">
                    <p className={`font-bold text-2xl mr-3`}>{title}</p>
                </div>
                <br />
                {
                    content ? <p className="whitespace-pre-wrap">{content}</p> : null
                }
                <br />
                <div className="grid grid-cols-[1fr_auto_auto]">
                    <div />
                    {type == 'confirm' ?
                        <button className="p-4" onClick={(e) => {
                            e.preventDefault();
                            setShowDialog(false);
                            callback(false);
                        }}>취소</button>
                        : <></>}
                    <button className="p-4" onClick={(e) => {
                        e.preventDefault();
                        setShowDialog(false);
                        if (callback && type === 'confirm') callback(true);
                    }}>확인</button>
                </div>
            </div>
        </>
    )
}