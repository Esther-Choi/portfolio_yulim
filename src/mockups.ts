/**
 * Hand-built UI mockups for in-house projects that have no public screenshots.
 * Dummy data only. Sized in `em` against `.mock { font-size: …cqw }`, so each
 * mockup scales with whatever container it is dropped into.
 */

const COLORS = ['#5b8def', '#f2994a', '#27ae60', '#bb6bd9', '#eb5757', '#2d9cdb'];

const avatar = (name: string, i: number) =>
  `<span class="m-av" style="background:${COLORS[i % COLORS.length]}">${name.slice(-2)}</span>`;

const lines = (widths: number[]) => widths.map((w) => `<span class="m-line" style="width:${w}%"></span>`).join('');

/* -------------------------------------------------------------------------- */

const appeal = () => {
  const rows: [string, string, string, string, string][] = [
    ['김하늘', 'B → A', 'blue|처리 대기', 'red|D-3', 'is-active'],
    ['이준호', 'C → B', 'amber|승인 대기', 'gray|D-5', ''],
    ['박서연', 'B → B+', 'green|처리 완료', 'gray|-', ''],
    ['정민재', 'A → S', 'gray|자동 완료', 'gray|마감', ''],
    ['최유진', 'C → B', 'blue|처리 대기', 'red|D-3', ''],
    ['한도윤', 'B → A', 'amber|승인 대기', 'gray|D-5', ''],
  ];
  return `
  <div class="m-win" style="left:5%;top:9%;width:66%;height:82%">
    <div class="m-main">
      <div class="m-head"><b>이의 신청 관리</b><span class="m-s">2026 상반기 종합평가</span></div>
      <div class="m-tabs"><span>신청</span><span class="is-on">처리 <i class="m-dot"></i></span><span>승인</span></div>
      <div class="m-banner m-banner--red"><i class="m-pulse"></i>처리 마감까지 <b>D-3</b> · 10월 24일 18:00</div>
      <div class="m-filters"><span class="m-chip m-chip--dark">전체 12</span><span class="m-chip">처리 대기 5</span><span class="m-chip">처리 완료 7</span></div>
      <div class="m-table">
        <div class="m-tr m-th"><span>대상자</span><span>등급 변경</span><span>단계</span><span>마감</span></div>
        ${rows
          .map(([name, grade, status, dday, cls], i) => {
            const [sc, st] = status.split('|');
            const [dc, dt] = dday.split('|');
            return `<div class="m-tr ${cls}"><span class="m-person">${avatar(name, i)}${name}</span><span class="m-grade">${grade}</span><span><i class="m-chip m-chip--${sc}">${st}</i></span><span><i class="m-chip m-chip--${dc}">${dt}</i></span></div>`;
          })
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:6%;width:33%">
    <div class="m-steps"><span class="is-done">신청</span><span class="is-done">처리</span><span class="is-on">승인</span></div>
    <p class="m-s">김하늘 · 등급 변경 요청</p>
    <div class="m-bigGrade"><span>B</span><i>→</i><b>A</b></div>
    ${lines([92, 70])}
    <div class="m-btns"><span class="m-btn">반려</span><span class="m-btn m-btn--primary">승인</span></div>
  </div>

  <div class="m-float m-float--late m-toast" style="right:6%;bottom:9%;width:36%">
    <span class="m-toast__icon">🔔</span><span>처리자 3명에게 <b>독려 알림</b>을 보냈어요</span>
  </div>`;
};

/* -------------------------------------------------------------------------- */

const goalGroups = () => {
  const groups: [string, string, string][] = [
    ['영업본부 목표 그룹', '대상자 42명', 'blue|정량 70 · 정성 30'],
    ['R&D 목표 그룹', '대상자 28명', 'blue|정량 50 · 정성 50'],
    ['신규 입사자 그룹', '대상자 0명', 'red|대상자 없음'],
  ];
  const people = ['김하늘', '이준호', '박서연', '정민재'];
  return `
  <div class="m-win" style="left:5%;top:9%;width:62%;height:82%">
    <div class="m-main">
      <div class="m-head"><b>평가용 목표 그룹</b><span class="m-btn m-btn--primary m-btn--sm">+ 그룹 만들기</span></div>
      <div class="m-tabs"><span>현황</span><span class="is-on">설정</span></div>
      <div class="m-banner m-banner--amber">⚠ 대상자가 지정되지 않은 그룹이 1개 있어요</div>
      <div class="m-groups">
        ${groups
          .map(([title, count, chip], i) => {
            const [c, t] = chip.split('|');
            return `<div class="m-group ${i === 0 ? 'is-active' : ''}"><div><b>${title}</b><span class="m-s">${count}</span></div><i class="m-chip m-chip--${c}">${t}</i></div>`;
          })
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:5%;top:7%;width:34%">
    <b class="m-ft">대상자 선택</b>
    <div class="m-search">🔍 이름, 조직 검색</div>
    ${people
      .map(
        (n, i) =>
          `<div class="m-check"><i class="m-box ${i < 3 ? 'is-on' : ''}"></i>${avatar(n, i)}<span>${n}</span><span class="m-s">영업${i + 1}팀</span></div>`,
      )
      .join('')}
    <div class="m-btns"><span class="m-s">12명 선택됨</span><span class="m-btn m-btn--primary">확인</span></div>
  </div>

  <div class="m-float m-float--late" style="right:10%;bottom:7%;width:30%">
    <b class="m-ft">목표 가중치</b>
    ${[
      ['매출 목표', 50],
      ['신규 고객', 30],
      ['역량 개발', 20],
    ]
      .map(
        ([n, w]) =>
          `<div class="m-weight"><span>${n}</span><span class="m-bar"><i style="width:${w}%"></i></span><b>${w}%</b></div>`,
      )
      .join('')}
    <p class="m-ok">합계 100% ✓</p>
  </div>`;
};

/* -------------------------------------------------------------------------- */

const revieweeSelection = () => {
  const list: [string, string][] = [
    ['박서연', 'green'],
    ['이준호', 'amber'],
  ];
  return `
  <div class="m-win" style="left:5%;top:9%;width:68%;height:82%">
    <div class="m-lnb">
      <span class="m-s">리뷰할 대상</span>
      <span class="m-add">+ 대상자 추가</span>
      ${list
        .map(([n, c], i) => `<div class="m-lnbItem ${i === 0 ? 'is-active' : ''}">${avatar(n, i + 2)}<span>${n}</span><i class="m-status m-status--${c}"></i></div>`)
        .join('')}
      <div class="m-lnbItem m-lnbItem--empty"><span class="m-av m-av--empty"></span><span>대상자를 추가하세요</span></div>
    </div>
    <div class="m-main">
      <div class="m-head"><b>동료 리뷰</b><span class="m-s">2026 하반기</span></div>
      <div class="m-filters"><span class="m-chip m-chip--dark">제출 2 / 최소 3명</span><span class="m-chip m-chip--red">최소 인원 미달</span></div>
      <div class="m-q"><b>Q1. 함께 일하며 가장 인상 깊었던 점은?</b><div class="m-area">${lines([96, 88, 64])}</div></div>
      <div class="m-q"><b>Q2. 앞으로 기대하는 성장 방향은?</b><div class="m-area m-area--empty"><span class="m-caret"></span></div></div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:8%;width:31%">
    <b class="m-ft">대상자 추가</b>
    <div class="m-search">🔍 정민</div>
    <div class="m-check">${avatar('정민재', 3)}<span>정민재</span><span class="m-btn m-btn--sm m-btn--done">추가됨 ✓</span></div>
    <div class="m-check">${avatar('정민서', 5)}<span>정민서</span><span class="m-btn m-btn--sm">+ 추가</span></div>
  </div>

  <div class="m-float m-float--late" style="right:7%;bottom:8%;width:34%">
    <b class="m-ft">리뷰 진행 단계</b>
    <div class="m-steps m-steps--v"><span class="is-done">대상자 지정</span><span class="is-on">작성</span><span>제출</span></div>
  </div>`;
};

/* -------------------------------------------------------------------------- */

const hrCardFiles = () => {
  const files: [string, string, string][] = [
    ['2025_연말평가_결과.pdf', '1.2MB', 'gray|관리자만'],
    ['근로계약서_2024.pdf', '840KB', 'gray|본인 · 관리자'],
    ['자격증_정보처리기사.pdf', '2.4MB', 'blue|전체 공개'],
    ['2024_승진심사_자료.pdf', '3.1MB', 'gray|관리자만'],
    ['교육이수증_리더십.pdf', '560KB', 'blue|전체 공개'],
  ];
  return `
  <div class="m-win" style="left:5%;top:9%;width:66%;height:82%">
    <div class="m-main">
      <div class="m-profile">${avatar('김하늘', 0)}<div><b>김하늘</b><span class="m-s">프로덕트팀 · 매니저</span></div></div>
      <div class="m-tabs"><span>기본 정보</span><span>평가 이력</span><span class="is-on">파일</span></div>
      <div class="m-filters"><span class="m-chip m-chip--dark">전체 5</span><span class="m-chip">평가</span><span class="m-chip">계약</span><span class="m-chip">기타</span></div>
      <div class="m-table">
        <div class="m-tr m-tr--files m-th"><span>파일명</span><span>크기</span><span>권한</span></div>
        ${files
          .map(([n, s, chip], i) => {
            const [c, t] = chip.split('|');
            return `<div class="m-tr m-tr--files ${i === 0 ? 'is-active' : ''}"><span class="m-file"><i>PDF</i>${n}</span><span class="m-s">${s}</span><span><i class="m-chip m-chip--${c}">${t}</i></span></div>`;
          })
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:10%;width:34%">
    <b class="m-ft">파일 업로드</b>
    <div class="m-drop">⇪<span>파일을 끌어다 놓거나 클릭하세요</span></div>
    <div class="m-upload"><span class="m-file"><i>PDF</i>인사카드_2026.pdf</span><span class="m-bar m-bar--loading"><i></i></span></div>
    <p class="m-s">3 / 10개 · 파일당 최대 20MB</p>
  </div>`;
};

/* -------------------------------------------------------------------------- */

const examRecording = () => {
  const answers: [number, number][] = [
    [1, 2],
    [2, 0],
    [3, 3],
    [4, -1],
    [5, -1],
  ];
  const chunks = Array.from({ length: 32 }, (_, i) => `<i class="${i < 13 ? 'is-done' : i === 13 ? 'is-on' : ''}"></i>`).join('');
  return `
  <div class="m-win m-win--col m-amz" style="left:4%;top:8%;width:66%;height:84%">
    <div class="m-topbar"><b>Training Portal</b><span class="m-rec"><i></i>REC 00:42:18</span><span class="m-searchbar">Search courses</span></div>
    <div class="m-subbar"><span>Module 3 · Final Assessment</span><span>Page 3 / 12</span></div>
    <div class="m-body">
      <div class="m-pdf">
        <div class="m-page">
          <b>Q3.</b>${lines([92, 98, 64])}
          <div class="m-opts">
            ${['A', 'B', 'C', 'D'].map((o, i) => `<div><span>${o}.</span>${lines([[58, 72, 49, 66][i]])}</div>`).join('')}
          </div>
        </div>
      </div>
      <div class="m-side">
        <b class="m-ft">Answer sheet</b>
        ${answers
          .map(
            ([q, a]) =>
              `<div class="m-sheet"><span>Q${q}</span>${[0, 1, 2, 3]
                .map((o) => `<i class="m-bubble ${o === a ? 'is-on' : ''}">${'ABCD'[o]}</i>`)
                .join('')}</div>`,
          )
          .join('')}
        <b class="m-ft">Notes</b>
        <div class="m-area">${lines([90, 66])}<span class="m-caret"></span></div>
        <span class="m-btn m-btn--amz">Submit exam</span>
      </div>
    </div>
  </div>

  <div class="m-float" style="right:3%;top:6%;width:31%">
    <b class="m-ft">Uploading recording</b>
    <div class="m-chunks">${chunks}</div>
    <p class="m-s">Chunk 14 / 32 · Session 12</p>
  </div>

  <div class="m-float m-float--late" style="right:5%;bottom:6%;width:36%">
    <b class="m-ft">Review · Session 12</b>
    <div class="m-player"><span class="m-play">▶</span><span class="m-time">07:40 / 58:12</span></div>
    <div class="m-timeline"><i style="left:12%"></i><i class="is-on" style="left:31%"></i><i style="left:57%"></i><i style="left:78%"></i></div>
    <div class="m-checkRow"><span>Q2 · 07:40</span><span class="m-chip m-chip--green">Correct</span></div>
  </div>`;
};

/* -------------------------------------------------------------------------- */

const videoLecture = () => {
  const modules: [string, string][] = [
    ['Module 1 · Introduction', 'done'],
    ['Module 2 · Core concepts', 'done'],
    ['Module 3 · Case review', 'on'],
    ['Module 4 · Final assessment', 'lock'],
  ];
  return `
  <div class="m-win m-win--col m-amz" style="left:4%;top:8%;width:68%;height:84%">
    <div class="m-topbar"><b>Training Portal</b><span class="m-searchbar">Search courses</span><span class="m-s m-s--light">My learning</span></div>
    <div class="m-body">
      <div class="m-videoCol">
        <div class="m-video">
          <span class="m-play m-play--lg">▶</span>
          <span class="m-caption">Review each step of the protocol before the session.</span>
        </div>
        <div class="m-progress"><i></i></div>
        <div class="m-videoMeta"><b>Module 3 · Case review</b><span class="m-s">12:04 / 24:30 · CC</span></div>
      </div>
      <div class="m-side">
        <b class="m-ft">Course content</b>
        ${modules
          .map(
            ([t, st]) =>
              `<div class="m-module m-module--${st}"><i>${st === 'done' ? '✓' : st === 'on' ? '▶' : '🔒'}</i><span>${t}</span></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:3%;top:7%;width:32%">
    <span class="m-s">Quiz · 2 / 5</span>
    <b class="m-ft">Which step comes first?</b>
    ${['Check the protocol', 'Start the session', 'Write the report']
      .map((o, i) => `<div class="m-radio ${i === 0 ? 'is-on' : ''}"><i></i><span>${o}</span></div>`)
      .join('')}
    <div class="m-btns"><span class="m-btn m-btn--amz">Submit</span></div>
  </div>

  <div class="m-float m-float--late" style="right:8%;bottom:7%;width:26%">
    <b class="m-ft">Subtitles</b>
    <div class="m-filters"><span class="m-chip m-chip--dark">English</span><span class="m-chip">한국어</span><span class="m-chip">Off</span></div>
  </div>`;
};

/* -------------------------------------------------------------------------- */
/* Pandarank (green), Geomexsoft (dark / blue), Dice To Meet You (fantasy red) */

const prTop = (active: string) =>
  `<div class="m-prTop"><b>panda</b>${['셀러', '인플루언서', '체험단', '아카데미']
    .map((t) => `<span class="${t === active ? 'is-on' : ''}">${t}</span>`)
    .join('')}</div>`;

const reward = () => {
  const camps: [string, string][] = [
    ['#f4b183', '맛집 체험'],
    ['#9dc3e6', '카페 리뷰'],
    ['#c5e0b4', '뷰티 체험'],
    ['#ffd966', '여행 숙박'],
    ['#f8cbad', '디저트'],
    ['#b4c7e7', '전시 관람'],
  ];
  return `
  <div class="m-win m-win--col m-pr" style="left:4%;top:8%;width:66%;height:84%">
    ${prTop('체험단')}
    <div class="m-main">
      <div class="m-tabs"><span class="is-on">신청하기</span><span>관리하기</span></div>
      <b class="m-ft">진행 중인 캠페인 <i class="m-green">43개</i></b>
      <div class="m-camps">
        ${camps
          .map(
            ([c, t]) =>
              `<div class="m-camp"><div class="m-thumb" style="background:${c}"><i class="m-pt">3,000P</i></div><b>${t}</b>${lines([80])}</div>`,
          )
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:9%;width:31%">
    <b class="m-ft">포인트 충전</b>
    <div class="m-amount">50,000<span>P</span></div>
    <div class="m-checkRow"><span>계좌 등록</span><span class="m-chip m-chip--green">완료 ✓</span></div>
    <span class="m-btn m-btn--green">충전하기</span>
  </div>

  <div class="m-float m-float--late m-toast" style="right:7%;bottom:9%;width:34%">
    <span class="m-toast__icon">✓</span><span>캠페인 포인트 <b>3,000P</b> 지급 완료</span>
  </div>`;
};

const influencer = () => {
  const rows: [string, string, string][] = [
    ['JIMIN', '532만', '98.2'],
    ['BaekHyun', '220만', '94.7'],
    ['minho', '345만', '91.3'],
    ['RM', '440만', '89.8'],
    ['soyeon', '415만', '87.1'],
  ];
  return `
  <div class="m-win m-win--col m-pr" style="left:4%;top:8%;width:70%;height:84%">
    ${prTop('인플루언서')}
    <div class="m-main">
      <b class="m-heroTitle">요즘 핫한 인플루언서는 누구?</b>
      <div class="m-filters"><span class="m-chip m-chip--green">블로그</span><span class="m-chip m-chip--pink">인스타</span><span class="m-chip m-chip--red">유튜브</span></div>
      <div class="m-table">
        <div class="m-tr m-tr--rank m-th"><span>#</span><span>계정</span><span>구독자</span><span>영향력</span><span>최근 게시물</span></div>
        ${rows
          .map(
            ([n, f, sc], i) =>
              `<div class="m-tr m-tr--rank ${i === 0 ? 'is-active' : ''}"><span>${i + 1}</span><span class="m-person">${avatar(n, i)}${n}</span><span>${f}</span><span><b>${sc}</b></span><span class="m-thumbs"><i></i><i></i><i></i></span></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:12%;width:26%">
    <span class="m-s">이번 주 1위</span>
    <div class="m-person">${avatar('JIMIN', 0)}<b>JIMIN</b></div>
    <div class="m-amount">98.2<span>영향력</span></div>
  </div>`;
};

const naverpay = () => `
  <div class="m-win m-win--col m-pr" style="left:4%;top:8%;width:64%;height:84%">
    ${prTop('셀러')}
    <div class="m-main">
      <b class="m-ft">멤버십 결제</b>
      <div class="m-group is-active"><div><b>프리미엄 멤버십</b><span class="m-s">1개월 · 자동 갱신</span></div><b>29,000원</b></div>
      <span class="m-s">결제 수단</span>
      ${[
        ['신용카드', ''],
        ['네이버페이', 'npay'],
        ['계좌이체', ''],
      ]
        .map(
          ([t, k]) =>
            `<div class="m-radio ${k ? 'is-on m-radio--green' : ''}"><i></i>${k ? '<em class="m-npay">N</em>' : ''}<span>${t}</span></div>`,
        )
        .join('')}
      <span class="m-btn m-btn--green">29,000원 결제하기</span>
    </div>
  </div>

  <div class="m-float" style="right:5%;top:12%;width:30%">
    <div class="m-done">✓</div>
    <b class="m-ft">결제가 완료됐어요</b>
    <div class="m-checkRow"><span>결제 수단</span><span><em class="m-npay">N</em> 네이버페이</span></div>
    <div class="m-checkRow"><span>금액</span><b>29,000원</b></div>
  </div>`;

const academy = () => {
  const lectures: [string, number][] = [
    ['1강 · 스마트스토어 시작하기', 100],
    ['2강 · 상품 등록 전략', 100],
    ['3강 · 상세페이지 만들기', 72],
    ['4강 · 광고 운영 기초', 0],
  ];
  return `
  <div class="m-win m-win--col m-pr" style="left:4%;top:8%;width:68%;height:84%">
    ${prTop('아카데미')}
    <div class="m-body">
      <div class="m-videoCol">
        <div class="m-video m-video--green"><span class="m-play m-play--lg">▶</span></div>
        <div class="m-progress m-progress--green"><i></i></div>
        <div class="m-videoMeta"><b>3강 · 상세페이지 만들기</b><span class="m-s">12:34 / 17:20</span></div>
      </div>
      <div class="m-side">
        <b class="m-ft">강의 목록</b>
        ${lectures
          .map(
            ([t, pct]) =>
              `<div class="m-lecture"><span>${t}</span><span class="m-bar m-bar--green"><i style="width:${pct}%"></i></span><span class="m-s">${pct ? `시청 ${pct}%` : '미시청'}</span></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float m-toast" style="right:6%;bottom:10%;width:32%">
    <span class="m-toast__icon">●</span><span>시청 기록 저장됨 · <b>12:34</b></span>
  </div>`;
};

const aipam = () => {
  const bars = [4, 1, 5, 7, 2, 8, 6];
  return `
  <div class="m-win m-win--col m-dark" style="left:4%;top:8%;width:72%;height:84%">
    <div class="m-darkTop"><b>33병동</b><span>병실 12</span><span>병상 74</span><span>환자 60</span><span class="m-pill">메인 모니터링 보드</span></div>
    <div class="m-body">
      <div class="m-feed">
        ${[
          ['낙상경보', 'amber', '3308호'],
          ['낙상사고', 'red', '3303호'],
        ]
          .map(
            ([t, c, r]) =>
              `<div class="m-cam m-cam--${c}"><div class="m-camHead"><span>${t}</span><span>${r}</span></div><div class="m-camView"><i class="m-box-${c}"></i></div></div>`,
          )
          .join('')}
      </div>
      <div class="m-main m-main--dark">
        <b class="m-ft">환자상태 실시간 현황</b>
        <div class="m-alerts">
          <div class="m-alert m-alert--red"><span>낙상사고</span><b>1</b></div>
          <div class="m-alert m-alert--amber"><span>낙상경보</span><b>2</b></div>
          <div class="m-alert m-alert--blue"><span>욕창경보</span><b>1</b></div>
        </div>
        <b class="m-ft">경보 발생 통계</b>
        <div class="m-chart">${bars.map((h) => `<i style="height:${h * 11}%"></i>`).join('')}</div>
      </div>
    </div>
  </div>

  <div class="m-float m-float--dark" style="right:4%;top:10%;width:26%">
    <span class="m-s">실시간 경보</span>
    <b class="m-ft m-redText">낙상사고 · 3303호</b>
    <div class="m-btns"><span class="m-btn m-btn--ghostDark">과거영상</span><span class="m-btn m-btn--red">경보해제</span></div>
  </div>`;
};

const sppa = () => {
  const sites: [string, string][] = [
    ['서울 OO아파트 신축', 'blue|진행'],
    ['인천 물류센터', 'green|완료'],
    ['부산 OO타워', 'blue|진행'],
    ['평택 산업단지', 'green|완료'],
  ];
  return `
  <div class="m-win m-win--col m-sppa" style="left:4%;top:8%;width:68%;height:84%">
    <div class="m-sppaTop"><b>SPPA</b><span>실시간관리</span><span class="is-on">현장관리</span><span>관리자</span></div>
    <div class="m-body">
      <div class="m-map"><i style="left:38%;top:30%"></i><i style="left:55%;top:52%"></i><i style="left:46%;top:72%"></i><i style="left:30%;top:58%"></i></div>
      <div class="m-side">
        <b class="m-ft">현장 리스트</b>
        ${sites
          .map(([n, chip]) => {
            const [c, t] = chip.split('|');
            return `<div class="m-checkRow m-siteRow"><span>${n}</span><i class="m-chip m-chip--${c}">${t}</i></div>`;
          })
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:9%;width:30%">
    <b class="m-ft">말뚝 리스트 · P-127</b>
    <div class="m-piles">${Array.from({ length: 12 }, (_, i) => `<i class="${i < 7 ? 'is-done' : ''}">P${120 + i}</i>`).join('')}</div>
  </div>

  <div class="m-float m-float--late" style="right:9%;bottom:8%;width:24%">
    <span class="m-s">최종 관입량</span>
    <div class="m-amount">12.4<span>mm</span></div>
    <span class="m-chip m-chip--green">계측 완료</span>
  </div>`;
};

const dice = () => {
  const games: [string, string, string, string][] = [
    ['Curse of the Crimson Keep', 'GM Aria', '$15', '3 / 5'],
    ['Starfall Frontier', 'GM Leo', '$12', '4 / 6'],
    ['The Sunken Library', 'GM Mina', '$18', '2 / 4'],
  ];
  return `
  <div class="m-win m-win--col m-dice" style="left:4%;top:8%;width:66%;height:84%">
    <div class="m-diceTop"><b>DICE TO MEET YOU</b><span>Games</span><span>Game Masters</span><span class="m-btn m-btn--red">Login</span></div>
    <div class="m-main m-main--dark">
      <b class="m-heroTitle">Find your next <i class="m-redText">table</i></b>
      <div class="m-games">
        ${games
          .map(
            ([t, gm, price, seats], i) =>
              `<div class="m-game"><div class="m-gameArt m-gameArt--${i}"></div><b>${t}</b><span class="m-s">${gm} · Seats ${seats}</span><span class="m-price">${price}</span></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>

  <div class="m-float" style="right:4%;top:10%;width:31%">
    <span class="m-s">Scheduled payment</span>
    <b class="m-ft">Jun 14 · 7:00 PM</b>
    <div class="m-checkRow"><span>Curse of the Crimson Keep</span><b>$15</b></div>
    <div class="m-filters"><span class="m-chip m-chip--dark">PayPal</span><span class="m-chip m-chip--amber">KakaoPay</span></div>
  </div>

  <div class="m-float m-float--late m-toast" style="right:8%;bottom:9%;width:30%">
    <span class="m-toast__icon">⏱</span><span>Auto-charge <b>scheduled</b></span>
  </div>`;
};

export const mockups: Record<string, () => string> = {
  reward,
  influencer,
  naverpay,
  academy,
  aipam,
  sppa,
  dicetomeetyou: dice,
  'craa-exam': examRecording,
  'craa-lecture': videoLecture,
  appeal,
  'goal-groups': goalGroups,
  'reviewee-selection': revieweeSelection,
  'hr-card-files': hrCardFiles,
};
