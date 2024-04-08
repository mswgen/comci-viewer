import comcigan from 'comcigan.js';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('code') || isNaN(parseInt(searchParams.get('code')!))) return new Response(JSON.stringify({
        code: 4,
        error: 'Enter school code.'
    }), { status: 400 });
    if (!searchParams.has('teacher') || isNaN(parseInt(searchParams.get('teacher')!))) return new Response(JSON.stringify({
        code: 5,
        error: 'Enter teacher code.'
    }), { status: 400 });

    try {
        const timetable = await comcigan.getTeacherTimetable(parseInt(searchParams.get('code')!), parseInt(searchParams.get('teacher')!));
        return new Response(JSON.stringify({
            code: 0,
            data: timetable
        }));
    } catch (e: any) {
        if (e.errorCode == 1) {
            return new Response(JSON.stringify({
                code: 1
            }), { status: 500 });
        }
        return new Response(JSON.stringify({
            code: e.errorCode,
            error: e.message
        }), { status: 404 });
    }
}