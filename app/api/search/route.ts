import comcigan from 'comcigan.js';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has('name')) return new Response(JSON.stringify({
        code: 3,
        error: 'Enter school name.'
    }), { status: 400 });

    try {
        const school = await comcigan.searchSchool(searchParams.get('name')!);
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
            code: e.erroCode,
            error: e.message
        }), { status: 404 });
    }
}