import comcigan from 'comcigan.js';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('code') || isNaN(parseInt(searchParams.get('code')!))) return new Response(JSON.stringify({
        code: 5,
        error: 'Enter school code.'
    }), { status: 400 });
    if (!searchParams.has('grade') || isNaN(parseInt(searchParams.get('grade')!))) return new Response(JSON.stringify({
        code: 6,
        error: 'Enter grade.'
    }), { status: 400 });
    if (!searchParams.has('classNum') || isNaN(parseInt(searchParams.get('classNum')!))) return new Response(JSON.stringify({
        code: 7,
        error: 'Enter classs number.'
    }), { status: 400 });

    try {
        const timetable = await comcigan.getTimetable(parseInt(searchParams.get('code')!), parseInt(searchParams.get('grade')!), parseInt(searchParams.get('classNum')!));
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