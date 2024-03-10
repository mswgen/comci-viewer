'use server';

import Timetable from '../../../../timetable';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { code: string, grade: string, classNum: string } }): Promise<Metadata> {
    return {
        title: `학교 코드 ${params.code} ${params.grade}학년 ${params.classNum}반`,
        twitter: {
            card: 'summary_large_image',
            title: `컴시간 뷰어 - 학교 코드 ${params.code} ${params.grade}학년 ${params.classNum}반`,
            description: '컴시간 뷰어'
        },
        openGraph: {
            title: `컴시간 뷰어 - 학교 코드 ${params.code} ${params.grade}학년 ${params.classNum}반`,
            description: '컴시간 뷰어',
            type: 'website',
            url: `${process.env.URL!}/timetable/${params.code}/${params.grade}/${params.classNum}`,
            siteName: '컴시간 뷰어',
            locale: 'ko_KR'
        }
    };
}

const CustomTimetable: React.FC<{
    params: {
        code: string,
        grade: string,
        classNum: string
    }
}> = ({ params }: { params: { code: string, grade: string, classNum: string } }) => {
    return (
        <>
            <h1 className="text-center text-3xl">컴시간 뷰어</h1>
            <br />
            <Timetable classData={({ school: { code: parseInt(params.code) }, grade: parseInt(params.grade) - 1, classNum: parseInt(params.classNum) - 1 })} />
        </>
    );
}

export default CustomTimetable;