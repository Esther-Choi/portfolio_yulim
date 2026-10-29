export interface Metric {
  value: string;
  label: string;
  desc?: string;
}

interface BaseProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  stack: string[];
  link?: { label: string; href: string };
}

/** Shipped product with screenshots. 'wide' = desktop, 'tall' = mobile */
export interface ShowcaseProject extends BaseProject {
  shape: 'wide' | 'tall';
  /** hue shift for the card gradient when the card previews a mockup */
  hue?: number;
  cover: string;
  images: string[];
  description: string[];
  /** when present, the modal renders description as "Overview" plus this list */
  did?: string[];
  result?: string;
  /** show the screenshots as the Result section instead of a gallery below */
  resultGallery?: boolean;
  /** one standout feature, highlighted between What I did and Result */
  keyFeature?: { title: string; text: string };
  metrics?: Metric[];
  role?: string[];
}

/** In-house work without public screenshots, written as problem → work → (result) */
export interface CaseProject extends BaseProject {
  shape: 'case';
  /** hue shift for the card gradient, in degrees */
  hue: number;
  metrics: Metric[];
  problem: string;
  did: string[];
  result?: string;
  /** how the work went with the team — drawn from peer feedback */
  teamwork?: string[];
  /** optional sanitized screenshots (demo data only), shown in the modal */
  images?: string[];
}

export type Project = ShowcaseProject | CaseProject;

const img = (name: string) => `/img/${name}.jpg`;
const seq = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => img(`${prefix}${from + i}`));

export const projects: Project[] = [
  {
    id: 'appeal',
    title: 'Appeal Workflow',
    subtitle: '평가 이의 신청: 신청 · 처리 · 승인 다단계 워크플로우',
    category: 'Work · Clap',
    date: '2025.10 ~ 2026.10',
    shape: 'case',
    hue: 0,
    metrics: [
      { value: '3단계', label: '신청 · 처리 · 승인' },
      { value: 'Role-based', label: '역할별 권한 및 화면 분리' },
    ],
    problem:
      '평가 결과 이의 신청은 신청자, 처리자, 승인자가 순서대로 참여하는 다단계 프로세스입니다. 역할별 권한과 단계별 상태 및 마감일을 함께 관리해야 해 화면 구성과 상태 처리 모두 복잡했습니다.',
    did: [
      '신청부터 처리, 승인까지 전체 흐름을 담당하고 역할별 화면 설계',
      '처리 탭과 승인 탭 신규 개발: 테이블, 필터, 마감 배너, D-Day 배지, 단계별 마감일 및 독려 알림',
      '등급 변경 승인 API 연동, 권한 가드 구현, 마감일 경과 시 자동 처리 완료 로직 개발',
      '서버 DTO 확정 전 임시 타입으로 개발을 진행하고, 확정 후 교체해 백엔드 일정과 병행해 작업',
    ],
    teamwork: [
      '개발 중 이어진 스펙 변경과 추가 요청에 대응하며 일정 내 릴리즈 완료',
      '릴리즈 이후 QA 및 운영 환경에서 발생한 이슈 대응',
    ],
    stack: ['React', 'TypeScript', 'React Query', 'i18n', 'Feature Flags'],
  },
  {
    id: 'goal-groups',
    title: 'Goal Groups',
    subtitle: '평가용 목표 그룹: 기존 기능 전반에 걸친 신규 기능',
    category: 'Work · Clap',
    date: '2026.07 ~ 2026.09',
    shape: 'case',
    hue: 140,
    metrics: [
      { value: 'New Settings', label: '현황·설정 페이지 및 그룹 관리' },
      { value: 'Cross-feature Integration', label: '기존 기능 전반에 그룹 조건 적용' },
    ],
    problem:
      '목표 그룹은 특정 그룹을 대상으로 목표를 설정하고 관리하는 기능입니다. 신규 화면뿐 아니라 리뷰 작성자 설정, 성과 연계, 목표 드로어, 가중치 등 기존 기능도 목표 그룹 대상 여부에 따라 다르게 동작해야 했습니다.',
    did: [
      '현황 및 설정 페이지 신규 개발: 대상 그룹 생성·수정, 대상자 모달, 3종 에러 배너',
      '리뷰 작성자 설정, 성과 연계, 목표 드로어, 가중치 등 기존 기능에 목표 그룹 조건 적용',
      '목표 그룹 대상 여부 판정을 서버 응답 기준으로 통일하고, 관련 비활성화 및 검증 조건에 적용',
    ],
    teamwork: [
      '서버 스펙 오류와 명세 누락을 확인하고, 테스트 범위에서 놓치기 쉬운 영향 지점을 찾아 공유했습니다.',
      '스펙 변경과 추가 요청에 대응하며 일정 내 릴리즈했습니다.',
    ],
    stack: ['React', 'TypeScript', 'React Query', 'Feature Flags'],
  },
  {
    id: 'reviewee-selection',
    title: 'Reviewee Selection',
    subtitle: '대상자 지정 평가: 작성자가 리뷰 대상을 직접 고르는 흐름',
    category: 'Work · Clap',
    date: '2026.08 ~ 2026.09',
    shape: 'case',
    hue: 250,
    metrics: [
      { value: 'Conditional Logic', label: '인원수에 따른 제출·시작 조건' },
      { value: 'QA & Release', label: '검증부터 정식 반영까지' },
    ],
    problem:
      '기존 리뷰는 리뷰 대상자가 미리 지정되어 있었지만, 신규 기능에서는 작성자가 리뷰 대상을 직접 추가할 수 있어야 했습니다. 추가된 인원수에 따라 제출 가능 여부와 리뷰 시작 조건도 달라져야 했습니다.',
    did: [
      '리뷰 대상자를 직접 추가하는 작성 흐름 개발',
      'LNB 정렬, 제출 현황 칩(최소 인원 미달 등), 리뷰 시작 조건 판정 로직 구현',
      '피처 플래그 활성화부터 QA 대응, 정식 반영 및 플래그 제거까지 전체 과정 담당',
    ],
    teamwork: [
      '다른 피처인 하위 리뷰 통합 표시와 충돌하는 지점을 사전에 찾아 기획 및 서버 개발자와 대응 방향 조율',
      '서버 개발 착수 전 명세 누락을 확인해 개발 중 재작업을 줄일 수 있도록 지원',
    ],
    stack: ['React', 'TypeScript', 'React Query', 'Feature Flags'],
  },
  {
    id: 'hr-card-files',
    title: 'HR Card Files',
    subtitle: '인사카드 PDF · 파일 업로드와 파일 관리',
    category: 'Work · Clap',
    date: '2025.11 ~ 2026.02',
    shape: 'case',
    hue: 300,
    metrics: [
      { value: 'File Management', label: '업로드부터 목록 관리까지' },
      { value: 'Enterprise Customization', label: '고객사별 커스텀 섹션 지원' },
    ],
    problem:
      '인사카드에 PDF를 비롯한 다양한 파일을 첨부하고 관리하는 기능이 필요했습니다. 사용자 권한에 따라 접근 가능한 파일 범위를 구분하고, 파일 용량과 개수 제한을 적용해야 했습니다. 또한 고객사마다 다른 커스텀 섹션 구성을 지원해야 했습니다.',
    did: [
      '대시보드 내 파일 섹션, 파일 업로드 모달, 파일 관리 페이지 개발',
      '파일 관리 페이지에 테이블, 필터, 탭을 구현해 파일 탐색 및 관리 기능 구성',
      '사용자 권한에 따른 파일 접근 제어와 파일 용량·개수 제한 로직 구현',
      '고객사별 커스텀 섹션 구성을 반영해 파일 관리 기능 구현',
    ],
    stack: ['React', 'TypeScript', 'React Query'],
  },
  {
    id: 'reward',
    title: 'Pandarank Reward',
    subtitle: '판다랭크 체험단: 캠페인 서비스',
    category: 'Work · Pandarank',
    date: '2024.02 ~ 2024.03',
    shape: 'wide',
    hue: 120,
    cover: img('reward1'),
    images: seq('reward', 1, 4),
    description: [
      '판다랭크 재직 당시 진행한 체험단 서비스 프로젝트입니다. ERD 설계와 퍼블리싱부터 기능 개발 및 출시까지 전 과정을 단독으로 담당했습니다.',
    ],
    did: [
      'ERD 설계부터 화면 퍼블리싱, 서비스 출시까지 전체 개발 담당',
      '세 가지 사용자 권한에 따른 기능 및 접근 제어 구현',
      '캠페인 생성과 포인트 지급 등 포인트 기반 기능 개발',
      '포인트 적립·차감 등 관련 로직을 트랜잭션으로 처리해 데이터 정합성 확보',
      '페이플 계좌 등록 및 결제 연동을 통한 포인트 충전 기능 구현',
    ],
    result: 'ERD 설계부터 결제 연동까지 전 과정을 단독으로 개발해 체험단 서비스를 출시했습니다.',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node', 'MongoDB'],
    link: { label: 'pandarank.net', href: 'https://pandarank.net/reward/campaign' },
  },
  {
    id: 'influencer',
    title: 'Channel Influence',
    subtitle: '판다랭크 채널 영향력: 인플루언서 랭킹 서비스',
    category: 'Work · Pandarank',
    date: '2023.11',
    shape: 'wide',
    hue: 150,
    cover: img('influencer1'),
    images: [img('influencer1')],
    description: [
      '판다랭크 재직 당시 진행한 채널 영향력 프로젝트입니다. 퍼블리싱부터 기능 개발 및 출시까지 담당했습니다.',
    ],
    did: [
      '블로그, 인스타그램, 유튜브 3개 플랫폼의 인플루언서 정보 및 순위 조회 기능 개발',
      '크롤링 데이터를 제공하는 API 연동 및 프런트엔드 구현',
    ],
    resultGallery: true,
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node', 'MongoDB'],
    link: { label: 'pandarank.net', href: 'https://pandarank.net/content/influencer' },
  },
  {
    id: 'naverpay',
    title: 'Naver Pay Checkout',
    subtitle: '판다랭크 결제 시스템 개선: 네이버페이 추가',
    category: 'Work · Pandarank',
    date: '2023.09',
    shape: 'wide',
    hue: 100,
    cover: img('naverpay1'),
    images: [img('naverpay1')],
    description: [
      '판다랭크 재직 당시 진행한 결제 시스템 개선 프로젝트입니다. 기존 결제 시스템의 UI와 프로세스를 개선하고, 신규 결제 수단인 네이버페이를 도입했습니다.',
    ],
    did: [
      '기존 결제 시스템의 UI 및 결제 프로세스 개선',
      '네이버페이 결제 연동 개발',
      'API 문서를 기반으로 결제 기능 구현',
      '네이버 QA팀과 직접 소통하며 QA 대응 및 출시까지 전체 개발 진행',
    ],
    result: '기존 결제 시스템 개선부터 네이버페이 신규 연동까지 결제 시스템 개발 전 과정을 담당했습니다.',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node', 'MongoDB'],
    link: { label: 'pandarank.net', href: 'https://pandarank.net/user/membership' },
  },
  {
    id: 'academy',
    title: 'Pandarank Academy',
    subtitle: '판다랭크 아카데미: 강의 서비스',
    category: 'Work · Pandarank',
    date: '2023.09',
    shape: 'wide',
    hue: 170,
    cover: img('academy1'),
    images: seq('academy', 1, 2),
    description: [
      '판다랭크 재직 당시 진행한 아카데미 프로젝트입니다. ERD 설계부터 화면 퍼블리싱, 기능 개발 및 출시까지 전 과정을 담당했습니다.',
    ],
    did: [
      'ERD 설계 및 강의 서비스 전체 화면 퍼블리싱',
      'Vimeo에 업로드된 영상을 활용한 강의 시청 기능 개발',
      '사용자별 영상 시청 시간 및 시청 기록 저장 기능 구현',
    ],
    resultGallery: true,
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Node', 'MongoDB'],
    link: { label: 'pandarank.net', href: 'https://pandarank.net/academy' },
  },
  {
    id: 'craa-exam',
    title: 'Exam Recording System',
    subtitle: '교육 이수 시험: 실시간 화면 녹화와 시간대별 채점',
    category: 'Work · CRAA',
    date: '2022.08 ~ 2023.06',
    shape: 'case',
    hue: 190,
    metrics: [
      { value: '4 Portals', label: 'Full-stack Development', desc: '4개 포털 프런트엔드·백엔드 전체 개발' },
      { value: 'Screen Recording', label: 'Exam Recording', desc: '시험 과정 실시간 녹화' },
      { value: 'Chunked Upload', label: 'Large File Processing', desc: '대용량 영상 분할 전송 및 서버 처리' },
      { value: 'Review Workflow', label: 'Exam Review', desc: '시간대별 영상 확인 및 답안 검토' },
    ],
    problem:
      '글로벌 제약사의 교육 포털로, 교육 대상자가 영상 교육을 이수한 뒤 PDF 문제 풀이와 메모 작성을 거쳐 답안을 제출하는 시험 기능이 핵심이었습니다.\n\n시험 과정 전체를 영상으로 기록해야 했지만, 녹화 파일의 용량이 커 한 번에 전송하기 어려웠습니다. 또한 관리자가 녹화 영상을 시간대별로 확인하며 제출된 답안을 검토할 수 있는 기능이 필요했습니다.',
    did: [
      '관리자·고객·사용자·교육 등 4개 포털의 프런트엔드 및 백엔드 전체 개발',
      'PDF 기반 문제 풀이, 메모 작성 및 답안 제출 기능 구현',
      '시험 화면 실시간 녹화 기능 개발',
      '대용량 녹화 영상을 분할해 전송하고, 서버에서 수신 및 처리하는 업로드 흐름 구현',
      '관리자가 시험 영상을 시간대별로 확인하며 답안을 검토할 수 있는 어드민 화면 개발',
      '각 포털의 대시보드, 데이터 관리 기능, 테이블 및 차트 개발',
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'NestJS', 'MongoDB', 'AWS'],
  },
  {
    id: 'craa-lecture',
    title: 'Video Lecture System',
    subtitle: '동영상 강의 시스템: 영상 관리 · 퀴즈 · 자막',
    category: 'Work · CRAA',
    date: '2022.08 ~ 2023.06',
    shape: 'case',
    hue: 30,
    metrics: [
      { value: 'Full-stack', label: '시스템 설계부터 프런트엔드·백엔드 개발까지' },
      { value: 'Video Management', label: '강의 영상 업로드 및 관리' },
      { value: 'Learning Quiz', label: '학습 확인용 퀴즈' },
      { value: 'Subtitles', label: '강의 영상 자막 기능' },
    ],
    problem:
      '교육 포털에서 사용할 동영상 강의 시스템이 필요했습니다. 강의 영상 관리와 시청뿐 아니라, 학습 내용을 확인할 수 있는 퀴즈와 자막 기능까지 하나의 시스템에서 제공해야 했습니다.',
    did: [
      '동영상 강의 시스템 설계 및 프런트엔드·백엔드 전체 개발',
      '강의 영상 업로드 및 관리 기능 구현',
      '학습 내용을 확인하기 위한 퀴즈 기능 개발',
      '강의 영상 자막 기능 구현',
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'NestJS', 'MongoDB', 'AWS'],
  },
  {
    id: 'aipam',
    title: 'AI-PAM',
    subtitle: 'AI 기반 병실 환자 안전 모니터링 시스템',
    category: 'Work · Geomexsoft',
    date: '2021 ~ 2022',
    shape: 'wide',
    hue: 320,
    cover: img('aipam1'),
    images: [img('aipam1'), img('aipam2')],
    description: [
      'AI-PAM(AI based Patient cAre Monitoring system)은 다인실 병실의 어안 카메라 영상을 AI로 분석해 낙상, 욕창 등 안전사고를 감지하고, 간호사 스테이션 대시보드와 모바일 기기로 알림을 보내 즉시 대응할 수 있도록 돕는 시스템입니다.',
      '웹 프런트엔드 전체를 담당했습니다.',
    ],
    did: [
      '간호사 스테이션 모니터링 대시보드 퍼블리싱 및 프런트엔드 개발',
      '병실 실시간 영상 모니터링 화면 구현',
      '낙상사고 · 낙상경보 · 욕창경보 실시간 알림과 경보 해제 흐름 구현',
      '경보 발생 통계 차트와 환자별 최근 이력 화면 개발',
      '병동 · 병실, 환자, 간호사, 계정 관리 화면 개발',
    ],
    metrics: [
      { value: 'Real-time', label: 'Monitoring', desc: '병실 영상과 경보를 한 화면에서 확인' },
      { value: '3', label: 'Alert types', desc: '낙상사고 · 낙상경보 · 욕창경보' },
    ],
    stack: ['Svelte', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'sppa',
    title: 'SPPA',
    subtitle: '항타 관입량 계측 시스템 (Smart Pile Penetration Analyzer)',
    category: 'Work · Geomexsoft',
    date: '2021 ~ 2022',
    shape: 'wide',
    hue: 0,
    cover: img('sppa1'),
    images: [img('sppa1')],
    description: [
      'SPPA는 말뚝 항타 시 스마트폰 앱으로 말뚝에 부착된 표적을 촬영하고, 영상 해석 기반 알고리즘으로 관입량을 계측하는 시스템입니다. 클라우드 서버에서 현장과 말뚝 정보를 미리 구성하고, 계측이 끝난 데이터는 스마트폰과 웹에서 바로 확인할 수 있습니다.',
      '클라우드 웹 서비스의 프런트엔드를 담당했습니다.',
    ],
    did: [
      '현장 · 말뚝 정보를 사전에 구성하는 클라우드 웹 서비스 프런트엔드 개발',
      '지도 기반 현장 리스트와 말뚝 리스트 화면 구현',
      '스마트폰 앱에서 계측한 관입량 데이터를 웹에서 확인하는 화면 구현',
    ],
    metrics: [
      { value: 'Cloud', label: 'Site setup', desc: '현장 · 말뚝 정보 사전 구성' },
      { value: 'Map', label: 'Site overview', desc: '지도 기반 현장 · 말뚝 리스트' },
      { value: 'App ↔ Web', label: 'Data sync', desc: '앱 계측 결과를 웹에서 확인' },
      { value: '4+', label: 'Enterprise clients', desc: '삼성물산 · 포스코건설 등' },
    ],
    stack: ['Svelte', 'JavaScript', 'HTML', 'CSS'],
    resultGallery: true,
  },
  {
    id: 'dicetomeetyou',
    title: 'Dice To Meet You',
    subtitle: 'TTRPG 플레이어를 위한 글로벌 플랫폼',
    category: 'Personal venture',
    date: '2023.06 ~',
    shape: 'wide',
    hue: 290,
    cover: img('dicetomeetyou2'),
    images: seq('dicetomeetyou', 1, 10),
    description: [
      '전 세계 TTRPG 플레이어와 게임 마스터를 연결하는 플랫폼으로, 서비스 기획부터 프론트엔드와 백엔드 개발까지 전 과정을 직접 담당한 개인 사업 프로젝트입니다.',
      '게임 마스터는 자신이 진행할 게임을 등록하고, 플레이어는 원하는 게임을 탐색하고 신청할 수 있습니다. 게임 신청부터 결제까지 이어지는 서비스를 구축했으며, 국내외 사용자를 고려해 카카오페이와 PayPal 결제를 연동했습니다.',
    ],
    did: [
      '서비스 기획 및 데이터베이스 ERD 설계',
      '프론트엔드 및 백엔드 전체 개발',
      '게임 등록, 탐색, 신청 등 핵심 기능 구현',
      '국내 사용자를 위한 카카오페이 및 해외 사용자를 위한 PayPal 결제 연동',
      '게임 일정에 맞춰 등록된 결제 수단으로 비용을 자동 청구하는 스케줄러 개발',
    ],
    keyFeature: {
      title: 'Scheduled Automatic Payments',
      text: '게임 일정에 맞춰 사용자가 등록한 결제 수단으로 자동 결제가 진행되도록 스케줄러 기반 결제 시스템을 구현했습니다.',
    },
    metrics: [
      { value: '100%', label: 'End-to-end Development', desc: '기획부터 프론트엔드·백엔드까지 전체 개발' },
      { value: '2', label: 'Payment Integrations', desc: 'PayPal · KakaoPay' },
      { value: 'Automated', label: 'Scheduled Payments', desc: '게임 일정 기반 자동 결제' },
      { value: 'Global', label: 'TTRPG Platform', desc: '전 세계 GM과 플레이어 연결' },
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Material UI', 'PostgreSQL', 'KakaoPay', 'PayPal'],
    link: { label: 'dicetomeetyou.com', href: 'https://dicetomeetyou.com' },
  },
];
