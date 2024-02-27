import comci from 'comci.js';

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('code') || isNaN(parseInt(searchParams.get('code')!))) return new Response(JSON.stringify({
        code: 2,
        error: '학교 코드를 입력해주세요.'
    }), { status: 400 });
    if (!searchParams.has('grade') || isNaN(parseInt(searchParams.get('grade')!))) return new Response(JSON.stringify({
        code: 3,
        error: '학년을 입력해주세요.'
    }), { status: 400 });
    if (!searchParams.has('classNum') || isNaN(parseInt(searchParams.get('classNum')!))) return new Response(JSON.stringify({
        code: 4,
        error: '반을 입력해주세요.'
    }), { status: 400 });

    try {
        const timetable = await comci.getTimetable(parseInt(searchParams.get('code')!), parseInt(searchParams.get('grade')!), parseInt(searchParams.get('classNum')!));
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