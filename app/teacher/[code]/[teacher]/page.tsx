'use server';

import TeacherTimetable from '../../../teacher-timetable';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { code: string, teacher: string } }): Promise<Metadata> {
    return {
        title: `학교 코드 ${params.code} ${params.teacher}번 교사`,
        twitter: {
            card: 'summary_large_image',
            title: `컴시간 뷰어 - 학교 코드 ${params.code} ${params.teacher}번 교사`,
            description: '컴시간 뷰어'
        },
        openGraph: {
            title: `컴시간 뷰어 - 학교 코드 ${params.code} ${params.teacher}번 교사`,
            description: '컴시간 뷰어',
            type: 'website',
            url: `${process.env.URL!}/teacher/${params.code}/${params.teacher}`,
            siteName: '컴시간 뷰어',
            locale: 'ko_KR'
        }
    };
}

const CustomTeacherTimetable: React.FC<{
    params: {
        code: string,
        teacher: string
    }
}> = async ({ params }: { params: { code: string, teacher: string } }) => {
    return (
        <>
            <h1 className="text-center text-3xl">컴시간 뷰어</h1>
            <br />
            <TeacherTimetable classData={({ school: { code: parseInt(params.code) }, teacher: { code: parseInt(params.teacher) - 1 } })} />
        </>
    );
}

export default CustomTeacherTimetable;