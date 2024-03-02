import Timetable from '../../../../timetable';

const CustomTimetable: React.FC<{
    params: {
        code: string,
        grade: string,
        classNum: string
    }
}> = ({ params }: { params: { code: string, grade: string, classNum: string } }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 overflow-auto whitespace-nowrap text-nowrap overflow-y-hidden w-max ml-auto mr-auto">
            <div className="border border-slate-300 rounded p-8">
                <h1 className="text-center text-3xl">컴시간 뷰어</h1>
                <br />
                <Timetable classData={({ school: { code: parseInt(params.code) }, grade: parseInt(params.grade) + 1, classNum: parseInt(params.classNum) + 1 })} />
            </div>
        </main>
    );
}

export default CustomTimetable;