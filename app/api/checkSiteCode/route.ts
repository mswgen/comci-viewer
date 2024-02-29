import comci from 'comci.js';

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const school = await comci.searchSchool("고등");
        return new Response(JSON.stringify({
            code: 0
        }));
    } catch (e: any) {
        return new Response(JSON.stringify({
            code: 1
        }));
    }
}