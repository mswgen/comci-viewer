import comcigan from 'comcigan.js';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('code') || isNaN(parseInt(searchParams.get('code')!))) return new Response(JSON.stringify({
        code: 3,
        error: '.'
    }), { status: 400 });

    try {
        const school = await comcigan.getSchoolInfo(parseInt(searchParams.get('code')!));
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