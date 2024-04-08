import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = '컴시간 뷰어'

export const size = {
    width: 1600,
    height: 900,
}

export const contentType = 'image/png'

// Image generation
export default async function OpenGraphImage({ params }: { params: { code: string, grade: string, classNum: string } }) {
    // Font
    const PretendardRegular = fetch(
        new URL(`${process.env.URL!}/Pretendard-Regular.ttf`)
    ).then((res) => res.arrayBuffer())
    const PretendardBold = fetch(
        new URL(`${process.env.URL!}/Pretendard-Bold.ttf`)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#333333',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '36px',
                    fontFamily: 'Noto Sans KR Regular'
                }}
            >
                <p style={{ fontSize: '200px', color: 'white', margin: 0, fontFamily: 'Noto Sans KR Bold' }}>컴시간 뷰어</p>
                <p style={{ fontSize: '100px', color: 'white', margin: 0, fontFamily: 'Noto Sans KR Bold' }}>시간표 확인하기</p>
                <p style={{ fontSize: '60px', color: 'lightgray', margin: 0, paddingLeft: '5px', paddingTop: '5px' }}>학교 코드 {params.code}</p>
                <p style={{ fontSize: '60px', color: 'lightgray', margin: 0, paddingTop: '5px', paddingLeft: '5px' }}>{params.grade}학년 {params.classNum}반</p>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Noto Sans KR Regular',
                    data: await PretendardRegular
                },
                {
                    name: 'Noto Sans KR Bold',
                    data: await PretendardBold
                },
            ],
        }
    )
}