import comci from 'comci.js';

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('code') || isNaN(parseInt(searchParams.get('code')!))) return new Response(JSON.stringify({
        code: 2,
        error: '학교 코드를 입력해주세요.'
    }), { status: 400 });

    try {
        const school = await comci.getSchoolInfo(parseInt(searchParams.get('code')!));
        return new Response(JSON.stringify({
            code: 0,
            data: school
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