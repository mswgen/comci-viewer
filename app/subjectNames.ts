const data = {
    subjectNameSubstitutes: {
        // many teachers
        "A": " (A)",
        "B": " (B)",
        "C": " (C)",
        "D": " (D)",
        "E": " (E)",
        "F": " (F)",
        "G": " (G)",
        "H": " (H)",
        "I": " (I)",
        "J": " (J)",

        // Korean
        "화작": "화법과 작문",
        "언매": "언어와 매체",
        "심국": "심화 국어",
        "실국": "실용 국어",
        "고전읽": "고전 읽기",
        "고읽": "고전 읽기",
        "고전": "고전 읽기",

        // English
        "영1": "영어 I",
        "영 1": "영어 I",
        "영Ⅰ": "영어 I",
        "영 Ⅰ": "영어 I",
        "영어1": "영어 I",
        "영여Ⅰ": "영어 I",
        "영2": "영어 II",
        "영 2": "영어 II",
        "영Ⅱ": "영어 II",
        "영 Ⅱ": "영어 II",
        "영어2": "영어 II",
        "영어Ⅱ": "영어 II",
        "영회": "영어 회화",
        "영독작": "영어 독해와 작문",
        "영독": "영어 독해와 작문",
        "실영": "실용 영어",
        "영미": "영미 문학 읽기",
        "영문": "영어권 문화",
        "진영": "진로 영어",
        // Below are for Foreign Language High School
        "심영1": "심화 영어 I",
        "심영Ⅰ": "심화 영어 I",
        "심영2": "심화 영어 II",
        "심영Ⅱ": "심화 영어 II",
        "영회1": "심화 영어 회화 I",
        "영회Ⅰ": "심화 영어 회화 I",
        "영회2": "심화 영어 회화 II",
        "영회Ⅱ": "심화 영어 회화 II",
        "영독1": "심화 영어 독해 I",
        "영독Ⅰ": "심화 영어 독해 I",
        "영독2": "심화 영어 독해 II",
        "영독Ⅱ": "심화 영어 독해 II",
        "영작1": "심화 영어 작문 I",
        "영작Ⅰ": "심화 영어 작문 I",
        "영작2": "심화 영어 작문 II",
        "영작Ⅱ": "심화 영어 작문 II",

        // Math
        // Begin Science High School Subjects
        "심화수": "심화 수학",
        "심수학": "심화 수학",
        "심수1": "심화 수학 I",
        "심수Ⅰ": "심화 수학 I",
        "심수2": "심화 수학 II",
        "심수Ⅱ": "심화 수학 II",
        "심수": "심화 수학",
        "고급수": "고급 수학",
        "고수학": "고급 수학",
        "고수1": "고급 수학 I",
        "고수Ⅰ": "고급 수학 I",
        "고수2": "고급 수학 II",
        "고수Ⅱ": "고급 수학 II",
        "고수": "고급 수학",
        // End Science High School Subjects
        "수1": "수학 I",
        "수 1": "수학 I",
        "수Ⅰ": "수학 I",
        "수 Ⅰ": "수학 I",
        "수학1": "수학 I",
        "수학Ⅰ": "수학 I",
        "수2": "수학 II",
        "수 2": "수학 II",
        "수Ⅱ": "수학 II",
        "수 Ⅱ": "수학 II",
        "수학2": "수학 II",
        "수학Ⅱ": "수학 II",
        "미적": "미적분",
        "확통": "확률과 통계",
        "실수": "실용 수학",
        "기수": "기본 수학",
        "경수": "경제 수학",
        "인수": "인공지능 수학",
        "수탐": "수학과제 탐구",

        // Science
        "통과": "통합과학",
        "과탐실": "과학탐구실험",
        "과실": "과학탐구실험",
        "물 1": "물리학 I",
        "물1": "물리학 I",
        "물Ⅰ": "물리학 I",
        "물 Ⅰ": "물리학 I",
        "물리1": "물리학 I",
        "물리Ⅰ": "물리학 I",
        "물 2": "물리학 II",
        "물2": "물리학 II",
        "물Ⅱ": "물리학 II",
        "물 Ⅱ": "물리학 II",
        "물리2": "물리학 II",
        "물리Ⅱ": "물리학 II",
        "화 1": "화학 I",
        "화1": "화학 I",
        "화Ⅰ": "화학 I",
        "화 Ⅰ": "화학 I",
        "화학1": "화학 I",
        "화학Ⅰ": "화학 I",
        "화 2": "화학 II",
        "화2": "화학 II",
        "화Ⅱ": "화학 II",
        "화 Ⅱ": "화학 II",
        "화학2": "화학 II",
        "화학Ⅱ": "화학 II",
        "생1": "생명과학 I",
        "생 1": "생명과학 I",
        "생Ⅰ": "생명과학 I",
        "생 Ⅰ": "생명과학 I",
        "생믈1": "생명과학 I",
        "생물Ⅰ": "생명과학 I",
        "생명1": "생명과학 I",
        "생명Ⅰ": "생명과학 I",
        "생2": "생명과학 II",
        "생 2": "생명과학 II",
        "생Ⅱ": "생명과학 II",
        "생 Ⅱ": "생명과학 II",
        "생물2": "생명과학 II",
        "생물Ⅱ": "생명과학 II",
        "생명2": "생명과학 II",
        "생명Ⅱ": "생명과학 II",
        "지 1": "지구과학 I",
        "지1": "지구과학 I",
        "지Ⅰ": "지구과학 I",
        "지 Ⅰ": "지구과학 I",
        "지학1": "지구과학 I",
        "지학Ⅰ": "지구과학 I",
        "지구1": "지구과학 I",
        "지구Ⅰ": "지구과학 I",
        "지 2": "지구과학 II",
        "지2": "지구과학 II",
        "지Ⅱ": "지구과학 II",
        "지 Ⅱ": "지구과학 II",
        "지학2": "지구과학 II",
        "지학Ⅱ": "지구과학 II",
        "지구2": "지구과학 II",
        "지구Ⅱ": "지구과학 II",
        "생환": "생태와 환경",
        "생과": "생활과 과학",
        "과연": "과학과제 연구",
        // Below are for Science High School
        "고급물": "고급 물리학",
        "고물리": "고급 물리학",
        "고물": "고급 물리학",
        "물실험": "물리학 실험",
        "물리실": "물리학 실험",
        "물실": "물리학 실험",
        "고급화": "고급 화학",
        "고화학": "고급 화학",
        "고화": "고급 화학",
        "화실험": "화학 실험",
        "화학실": "화학 실험",
        "화실": "화학 실험",
        "고생물": "고급 생명과학",
        "고생명": "고급 생명과학",
        "고생": "고급 생명과학",
        "생실험": "생명과학 실험",
        "생명실": "생명과학 실험",
        "생물실": "생명과학 실험",
        "생실": "생명과학 실험",
        "고급지": "고급 지구과학",
        "고지학": "고급 지구과학",
        "고지구": "고급 지구과학",
        "고지": "고급 지구과학",
        "지실험": "지구과학 실험",
        "지학실": "지구과학 실험",
        "지구실": "지구과학 실험",
        "지실": "지구과학 실험",

        // Social Studies
        "통사": "통합사회",
        "한국": "한국사",
        "한국사사": "한국사",
        "국사": "한국사",
        "한한국사": "한국사",
        "정법": "정치와 법",
        "생윤": "생활과 윤리",
        "윤사": "윤리와 사상",
        "한지": "한국 지리",
        "세지": "세계 지리",
        "사문": "사회, 문화",
        "고윤": "고전과 윤리",
        "여지": "여행지리",
        "사탐": "사회문제 탐구",
        "사문탐": "사회문제 탐구",

        // Art, PE
        "음연": "음악 연주",
        "음감비": "음악 감상과 비평",
        "음감": "음악 감상과 비평",
        "미창": "미술 창작",
        "미감비": "미술 감상과 비평",
        "미감": "미술 감상과 비평",
        "운건강": "운동과 건강",
        "운건": "운동과 건강",
        "스생횔": "스포츠 생활",
        "스생": "스포츠 생활",
        "체탐": "체육 탐구",

        // Tech & Home, IT
        "기가": "기술, 가정",
        "프로그": "프로그래밍",
        "정과": "정보과학",

        // Second foreign language
        "중 1": "중국어 I",
        "중1": "중국어 I",
        "중 Ⅰ": "중국어 I",
        "중Ⅰ": "중국어 I",
        "중 2": "중국어 II",
        "중2": "중국어 II",
        "중 Ⅱ": "중국어 II",
        "중Ⅱ": "중국어 II",
        "일 1": "일본어 I",
        "일1": "일본어 I",
        "일 Ⅰ": "일본어 I",
        "일Ⅰ": "일본어 I",
        "일 2": "일본어 II",
        "일2": "일본어 II",
        "일 Ⅱ": "일본어 II",
        "일Ⅱ": "일본어 II",
        "프 1": "프랑스어 I",
        "프1": "프랑스어 I",
        "프 Ⅰ": "프랑스어 I",
        "프Ⅰ": "프랑스어 I",
        "프 2": "프랑스어 II",
        "프2": "프랑스어 II",
        "프 Ⅱ": "프랑스어 II",
        "프Ⅱ": "프랑스어 II",
        "불 1": "프랑스어 I",
        "불1": "프랑스어 I",
        "불 Ⅰ": "프랑스어 I",
        "불Ⅰ": "프랑스어 I",
        "불 2": "프랑스어 II",
        "불2": "프랑스어 II",
        "불 Ⅱ": "프랑스어 II",
        "불Ⅱ": "프랑스어 II",
        "독 1": "독일어 I",
        "독1": "독일어 I",
        "독 Ⅰ": "독일어 I",
        "독Ⅰ": "독일어 I",
        "독 2": "독일어 II",
        "독2": "독일어 II",
        "독 Ⅱ": "독일어 II",
        "독Ⅱ": "독일어 II",
        "스 1": "스페인어 I",
        "스1": "스페인어 I",
        "스 Ⅰ": "스페인어 I",
        "스Ⅰ": "스페인어 I",
        "스 2": "스페인어 II",
        "스2": "스페인어 II",
        "스 Ⅱ": "스페인어 II",
        "스Ⅱ": "스페인어 II",
        "서 1": "스페인어 I",
        "서1": "스페인어 I",
        "서 Ⅰ": "스페인어 I",
        "서Ⅰ": "스페인어 I",
        "서 2": "스페인어 II",
        "서2": "스페인어 II",
        "서 Ⅱ": "스페인어 II",
        "서Ⅱ": "스페인어 II",
        "러 1": "러시아어 I",
        "러1": "러시아어 I",
        "러 Ⅰ": "러시아어 I",
        "러Ⅰ": "러시아어 I",
        "러 2": "러시아어 II",
        "러2": "러시아어 II",
        "러 Ⅱ": "러시아어 II",
        "러Ⅱ": "러시아어 II",
        "노 1": "러시아어 I",
        "노1": "러시아어 I",
        "노 Ⅰ": "러시아어 I",
        "노Ⅰ": "러시아어 I",
        "노 2": "러시아어 II",
        "노2": "러시아어 II",
        "노 Ⅱ": "러시아어 II",
        "노Ⅱ": "러시아어 II",
        "아 1": "아랍어 I",
        "아1": "아랍어 I",
        "아 Ⅰ": "아랍어 I",
        "아Ⅰ": "아랍어 I",
        "아 2": "아랍어 II",
        "아2": "아랍어 II",
        "아 Ⅱ": "아랍어 II",
        "아Ⅱ": "아랍어 II",
        "베 1": "베트남어 I",
        "베1": "베트남어 I",
        "베 Ⅰ": "베트남어 I",
        "베Ⅰ": "베트남어 I",
        "베 2": "베트남어 II",
        "베2": "베트남어 II",
        "베 Ⅱ": "베트남어 II",
        "베Ⅱ": "베트남어 II",
        "한 1": "한문 I",
        "한1": "한문 I",
        "한 Ⅰ": "한문 I",
        "한Ⅰ": "한문 I",
        "한 2": "한문 II",
        "한2": "한문 II",
        "한 Ⅱ": "한문 II",
        "한Ⅱ": "한문 II"
    },
    subjectCategories: {
        "국어": ["국어", "독서", "화법과 작문", "언어와 매체", "고전 읽기"],
        "영어": ["영어", "원어민"],
        "수학": ["수학", "미적분", "확률과 통계", "기하"],
        "과학": ["과학", "물리학", "화학", "생태와 환경"],
        "사회": ["사회", "도덕", "역사", "한국사", "세계사", "동아시아사", "지리", "윤리", "정치와 법", "경제"],
        "기술가정, 정보": ["기술, 가정", "정보", "프로그래밍"],
        "제2외국어": ["중국어", "일본어", "프랑스어", "독일어", "스페인어", "러시아어", "아랍어", "베트남어", "한문"],
        "예술, 체육": ["음악", "미술", "체육", "운동과 건강", "스포츠 생활", "문학"]
    }
}

export default data;