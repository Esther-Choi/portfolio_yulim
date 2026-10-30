import type { Metric } from './data';

export type Lang = 'ko' | 'en';

/**
 * English copy for elements marked `data-i18n="key"` in index.html.
 * Korean is the markup itself, so only English lives here.
 */
export const en: Record<string, string> = {
  'about.lead1':
    "I'm a full-stack TypeScript developer working across React and Node.js. I find the gaps and edge cases in a spec before they turn into bugs, and I ship features that hold up even when the requirements keep shifting.",
  'about.lead2':
    "I've covered the whole cycle from UI and data modeling to APIs, payments, CI/CD and production support, and I've spent the last few years working fully remote, first for a US company building products for US clients and now at Clap.<br />At Clap, an enterprise performance management SaaS, I built multi-step review workflows driven by roles, permissions and state transitions. I also use Claude Code and AI-driven browser QA every day to ship faster and test more thoroughly.",
  'about.quote': '“Instead of thinking longer,<br />I look for a better <em>way</em>.”',
  'about.quoteSub': 'Understand the problem properly, pick the right tools, and find the most efficient fix.',
  'about.stat': 'companies, across frontend, backend and full-stack roles',
  'hero.sub': "It's Yulim, a full-stack <em>TypeScript</em> developer",
  'hero.rail': 'Full-stack TypeScript developer',
  'edu.note': 'High school and university in the Philippines, taught in English',
  'edu.list': `
            <li><span>2019 ~ 2021</span><strong>Korea IT Academy</strong><em>Java, DBMS, Linux, networking, information security and web development</em></li>
            <li><span>2015 ~ 2016</span><strong>University of the Philippines</strong><em>Forestry (on leave)</em></li>
            <li><span>2011 ~ 2015</span><strong>South Hill School</strong><em>Philippines · Graduated</em></li>
`,

  'xp.clap': `
              <li><strong>Core workflows:</strong> Worked on 20+ features, including appeals, goal groups, self-selected reviews and HR card file management</li>
              <li><strong>Complex multi-step flows:</strong> Built review workflows where permissions, states and deadlines all depend on each other. For appeals, built the three-step request, review and approval workflow and opened 52 PRs in about four weeks</li>
              <li><strong>Releases and code quality:</strong> Took 14 features through the full feature flag cycle, from rollout to cleanup. Reorganized around 20 React Query keys into a domain-based hierarchy and cut down unnecessary API calls</li>
              <li><strong>Product breadth and enterprise clients:</strong> Built reviews, salary settings, goal management, peer reviews, Excel upload matching and more, and handled custom requirements for 4+ clients in finance, mobility and commerce</li>
              <li><strong>AI-assisted workflow:</strong> Sped up development with Claude Code and introduced automated browser QA with Aside</li>
`,
  'xp.pandarank': `
              <li>Maintained and improved existing services, and built and launched new ones: influencer campaigns, channel rankings, an academy and Naver Pay checkout</li>
              <li>Moved repositories from CodeCommit to GitHub</li>
              <li>Set up a CI/CD pipeline with GitHub Actions</li>
`,
  'xp.craa': `
              <li>Worked for a US company on products for US clients, with the product, data and documentation all in English</li>
              <li>Built the frontend and backend of four training portals (admin, client, user and training) for a global pharmaceutical company</li>
              <li>Implemented live screen recording for online exams and chunked uploads with retries for large video files</li>
              <li>Built the admin workflow for reviewing exam recordings by timestamp and grading answers</li>
              <li>Designed and built a video lecture system with video management, quizzes and subtitles</li>
`,
  'xp.geomex': `
              <li><strong>AI-PAM:</strong> Built the nurse station dashboard, live video monitoring and alerts, and ward management screens</li>
              <li><strong>SPPA:</strong> Built the cloud web frontend of a pile penetration measurement system used on construction sites for clients like Samsung C&amp;T and POSCO E&amp;C</li>
              <li>Researched 3D mapping with Cesium</li>
`,
  'xp.ilsong': `
              <li>Built backend features such as sign-up, login, boards and identity verification</li>
              <li>Worked with a publisher to fix HTML pages and connect them to the backend</li>
`,

  'note.queryKeys':
    "Pulled around 20 scattered React Query keys into one hierarchy, so it's clear exactly what each cache invalidation touches.",
  'note.requests':
    'Tracked down duplicate PUTs, unnecessary stats calls, recurring 404s and pointless DELETEs, fixed the causes and cleaned up the request flow.',
  'note.ui': 'Built on the existing shared components and moved older table screens onto a common template for a more consistent UI.',
  'note.ai':
    'Brought Claude Code and automated browser QA into real project work, and improved a Claude Code skill for the repetitive job of removing feature flags.',

  'team.quote1':
    '“Even with spec changes and additions coming in fast, things kept moving without any major issues. That really stood out.”',
  'team.quote1By': 'Teammate',
  'team.quote2': '“You explained the problem so clearly that it made our decisions a lot easier.”',
  'team.quote2By': 'Product manager',
  'team.note': 'Here is how I work, based on what came up again and again in feedback from my teammates.',
  'team.s1': 'I find the gaps first',
  'team.s1d':
    'I flagged things the plan missed, missing specs, API spec errors and side effects outside the test scope, before they became problems.',
  'team.s2': 'I finish, even when things change',
  'team.s2d':
    'I delivered complex features quickly despite frequent spec changes, and jumped on QA and live issues right after release.',
  'team.s3': 'I explain clearly and write it down',
  'team.s3d':
    'I documented questions and answers, problem APIs and test accounts. Laying out the problem and its technical context helped the team make decisions and kept the requirements and tech docs in sync.',
  'team.s4': 'I help shape the design, not just build it',
  'team.s4d':
    'When we designed what happens after a user loses permissions, I suggested separating viewing data from taking actions, which set the UX direction. I also caught overlaps with other features early and agreed on how to handle them.',
  'team.s5': 'I look after quality across the team',
  'team.s5d':
    'I kept the code consistent by sticking to existing conventions and shared components, and flagged the same bug in another feature or a broken i18n build as soon as I saw it. I also helped teammates get up to speed.',
};

/** Small UI strings used from TypeScript */
export const ui = {
  ko: {
    title: 'Yulim Choi | Full-Stack Developer',
    description: '풀스택 웹 개발자 최유림의 포트폴리오. React, TypeScript, Next.js, NestJS, Node, MongoDB, AWS.',
    home: '홈으로',
    nav: '주요 메뉴',
    stack: '기술 스택',
    avatar: '최유림 프로필 사진',
    close: '닫기',
    view: (t: string) => `${t} 자세히 보기`,
    shot: (t: string, i: number) => `${t} 화면 ${i}`,
    role: '담당 파트',
  },
  en: {
    title: 'Yulim Choi | Full-Stack Developer',
    description: 'Portfolio of Yulim Choi, a full-stack web developer. React, TypeScript, Next.js, NestJS, Node, MongoDB, AWS.',
    home: 'Home',
    nav: 'Main menu',
    stack: 'Tech stack',
    avatar: 'Portrait of Yulim Choi',
    close: 'Close',
    view: (t: string) => `View ${t}`,
    shot: (t: string, i: number) => `${t} screenshot ${i}`,
    role: 'My part',
  },
};

/** English overrides for the text fields of each project in data.ts */
export interface ProjectText {
  subtitle?: string;
  problem?: string;
  did?: string[];
  teamwork?: string[];
  result?: string;
  description?: string[];
  keyFeature?: { title: string; text: string };
  metrics?: Metric[];
}

export const projectsEn: Record<string, ProjectText> = {
  appeal: {
    subtitle: 'Review appeals: a multi-step request, review and approval workflow',
    metrics: [
      { value: '3 steps', label: 'Request · Review · Approval' },
      { value: 'Role-based', label: 'Permissions and screens split by role' },
    ],
    problem:
      'Appealing a review result is a multi-step process where the requester, the reviewer and the approver each take their turn. Permissions per role, plus states and deadlines per step, all had to be handled together, which made both the screens and the state logic complicated.',
    did: [
      'Owned the whole flow from request to review to approval, with separate screens for each role',
      'Built new Review and Approval tabs: tables, filters, deadline banners, D-Day badges, per-step deadlines and reminder notifications',
      'Integrated the grade change approval API, added role-based permission guards and built the state transitions, including closing a step automatically once its deadline passes',
      'Started on temporary types before the server DTOs were final and swapped them out later, so the frontend could move in parallel with the backend',
    ],
    teamwork: [
      'Kept up with a steady stream of spec changes and additions and still shipped on schedule',
      'Handled QA and production issues after release',
    ],
  },
  'goal-groups': {
    subtitle: 'Goal groups for reviews: a new feature that reaches into existing ones',
    metrics: [
      { value: 'New Settings', label: 'Overview and settings pages, group management' },
      { value: 'Cross-feature Integration', label: 'Group rules applied across existing features' },
    ],
    problem:
      'Goal groups let admins set and manage goals for a specific group of people. Beyond the new screens, existing features like reviewer settings, performance linking, the goal drawer and weighting all had to behave differently depending on whether someone belonged to a goal group.',
    did: [
      'Built the new overview and settings pages: creating and editing groups, the member picker and three kinds of error banners',
      'Applied goal group rules to existing features, including reviewer settings, performance linking, the goal drawer and weighting',
      'Made the server response the single source of truth for goal group membership and drove every related disabled state and validation from it',
    ],
    teamwork: [
      'Caught server spec errors and missing specs, and pointed out side effects that were easy to miss in testing',
      'Kept up with spec changes and additions and shipped on schedule',
    ],
  },
  'reviewee-selection': {
    subtitle: 'Self-selected reviews: writers pick who they review',
    metrics: [
      { value: 'Conditional Logic', label: 'Submit and start rules based on headcount' },
      { value: 'QA & Release', label: 'From testing to full launch' },
    ],
    problem:
      'In the old flow, reviewees were assigned up front. The new feature let writers add the people they wanted to review themselves, and whether they could submit or start depended on how many people they added.',
    did: [
      'Built the writing flow where users add their own reviewees',
      'Implemented LNB sorting, submission status chips (like "below minimum") and the logic that decides when a review can start',
      'Owned the whole cycle from turning on the feature flag through QA and full release to removing the flag',
    ],
    teamwork: [
      'Spotted conflicts with another feature in progress (a combined view of downward reviews) early and worked out a plan with the PM and backend',
      'Checked for missing specs before backend work began, which cut down on rework later',
    ],
  },
  'hr-card-files': {
    subtitle: 'HR card PDFs, file uploads and file management',
    metrics: [
      { value: 'File Management', label: 'From upload to file list' },
      { value: 'Enterprise Customization', label: 'Custom sections for each client' },
    ],
    problem:
      'Users needed to attach and manage PDFs and other files on HR cards. Access had to depend on permissions, file size and count limits had to be enforced, and every client could set up its own custom sections.',
    did: [
      'Built the file section on the dashboard, the upload modal and the file management page',
      'Added tables, filters and tabs to the file management page for browsing and managing files',
      'Implemented role-based file access and file size and count limits',
      "Supported per-client custom section configuration in file management",
    ],
  },
  'craa-exam': {
    subtitle: 'Training exams: live screen recording and timestamped grading',
    metrics: [
      { value: '4 Portals', label: 'Full-stack Development', desc: 'Frontend and backend for four portals' },
      { value: 'Screen Recording', label: 'Exam Recording', desc: 'The entire exam recorded live' },
      { value: 'Chunked Upload', label: 'Large File Processing', desc: 'Large videos split into chunks, with retries' },
      { value: 'Review Workflow', label: 'Exam Review', desc: 'Recordings reviewed by timestamp' },
    ],
    problem:
      'A training portal for a global pharmaceutical company. The core feature was the exam: after watching training videos, trainees answered PDF-based questions, took notes and submitted their answers.\n\nThe whole exam had to be recorded on video, but the files were far too large to send in one go. Admins also needed to scrub through each recording by time while checking the submitted answers.',
    did: [
      'Built the frontend and backend of all four portals: admin, client, user and training',
      'Implemented PDF-based questions, note taking and answer submission',
      'Built live recording of the exam screen',
      'Built an upload flow that splits large recordings into chunks, retries any chunk that fails and reassembles them on the server',
      'Built an admin screen for checking answers while jumping through the exam video by timestamp',
      'Built dashboards, data management, tables and charts for each portal',
    ],
  },
  'craa-lecture': {
    subtitle: 'Video lectures: video management, quizzes and subtitles',
    metrics: [
      { value: 'Full-stack', label: 'From system design to frontend and backend' },
      { value: 'Video Management', label: 'Lecture video upload and management' },
      { value: 'Learning Quiz', label: 'Quizzes to check understanding' },
      { value: 'Subtitles', label: 'Subtitles for lecture videos' },
    ],
    problem:
      'The training portal needed its own video lecture system. On top of managing and playing videos, it had to offer quizzes to check what people learned, plus subtitles, all in one place.',
    did: [
      'Designed the video lecture system and built both the frontend and the backend',
      'Built lecture video upload and management',
      'Built quizzes to check what learners picked up',
      'Added subtitles to lecture videos',
    ],
  },
  reward: {
    subtitle: 'Pandarank influencer campaigns',
    description: [
      'An influencer campaign service I built at Pandarank. I handled all of it on my own, from ERD design and markup to development and launch.',
    ],
    did: [
      'Owned development end to end, from ERD design and markup to launch',
      'Built features and access control for three user roles',
      'Built point-based features such as creating campaigns and paying out points',
      'Ran every point credit and debit inside database transactions to keep the ledger consistent',
      'Built point top-ups with Payple bank account registration and payments',
    ],
    result: 'Built the whole service solo, from ERD design to payment integration, and launched it.',
  },
  influencer: {
    subtitle: 'Pandarank channel rankings: an influencer ranking service',
    description: ['A channel influence project at Pandarank. I took it from markup through development to launch.'],
    did: [
      'Built influencer profiles and rankings across three platforms: blogs, Instagram and YouTube',
      'Integrated the API that serves crawled data and built the frontend',
    ],
  },
  naverpay: {
    subtitle: 'Pandarank checkout revamp: adding Naver Pay',
    description: [
      'A payment system revamp at Pandarank. I reworked the existing checkout UI and flow and added Naver Pay as a new payment method.',
    ],
    did: [
      'Reworked the existing checkout UI and payment flow',
      'Built the Naver Pay integration',
      'Implemented payments from the API documentation',
      "Worked directly with Naver's QA team all the way through QA and launch",
    ],
    result: 'Owned the payment work end to end, from improving the existing checkout to launching the new Naver Pay integration.',
  },
  academy: {
    subtitle: 'Pandarank Academy: an online course service',
    description: [
      'An academy project at Pandarank. I covered the whole thing, from ERD design and markup to development and launch.',
    ],
    did: [
      'Designed the ERD and built every page of the course service',
      'Built lecture playback using videos hosted on Vimeo',
      'Saved watch time and viewing history for each user',
    ],
  },
  aipam: {
    subtitle: 'AI-powered patient safety monitoring for hospital wards',
    description: [
      'AI-PAM (AI based Patient cAre Monitoring system) analyzes fisheye camera footage from shared hospital rooms to detect falls, pressure ulcer risks and other incidents, then alerts the nurse station dashboard and mobile devices so staff can respond right away.',
      'I built the entire web frontend.',
    ],
    did: [
      'Built the nurse station monitoring dashboard, from markup to frontend',
      'Built the live video monitoring screens for each room',
      'Built real-time alerts for falls, fall risks and pressure ulcer risks, plus the flow for dismissing them',
      'Built alert statistics charts and recent alert history by patient',
      'Built management screens for wards and rooms, patients, nurses and accounts',
    ],
    metrics: [
      { value: 'Real-time', label: 'Monitoring', desc: 'Room video and alerts on one screen' },
      { value: '3', label: 'Alert types', desc: 'Falls, fall risks and pressure ulcer risks' },
    ],
  },
  sppa: {
    subtitle: 'Smart Pile Penetration Analyzer for construction sites',
    description: [
      'SPPA measures how far a pile goes in during pile driving. A smartphone app films a target attached to the pile, and an image analysis algorithm works out the penetration. Sites and piles are set up ahead of time on a cloud server, and results show up on the phone and the web as soon as a measurement is done.',
      'I built the frontend of the cloud web service.',
    ],
    did: [
      'Built the cloud web frontend where sites and piles are set up in advance',
      'Built map-based site and pile lists',
      'Built screens for viewing penetration data measured in the app',
    ],
    metrics: [
      { value: 'Cloud', label: 'Site setup', desc: 'Sites and piles configured in advance' },
      { value: 'Map', label: 'Site overview', desc: 'Map-based site and pile lists' },
      { value: 'App ↔ Web', label: 'Data sync', desc: 'App measurements visible on the web' },
      { value: '4+', label: 'Enterprise clients', desc: 'Samsung C&amp;T, POSCO E&amp;C and more' },
    ],
  },
  dicetomeetyou: {
    subtitle: 'A global platform for TTRPG players',
    description: [
      "A platform that connects TTRPG players and game masters around the world. It's my own venture, and I did everything from planning the service to building the frontend and backend.",
      'Game masters post the games they want to run, and players browse and sign up. I built the whole path from joining a game to paying for it, with KakaoPay for players in Korea and PayPal for everyone else.',
    ],
    did: [
      'Planned the service and designed the PostgreSQL data model',
      'Built the entire frontend and backend',
      'Built the core features: posting, browsing and joining games',
      'Integrated KakaoPay for Korean users and PayPal for international users',
      'Built a cron-based scheduler that charges the saved payment method on the game schedule, with retries for failed payments',
    ],
    keyFeature: {
      title: 'Scheduled Automatic Payments',
      text: "A cron job charges each player's saved payment method automatically, timed to the game session, and retries the charge if it fails.",
    },
    metrics: [
      { value: '100%', label: 'End-to-end Development', desc: 'Everything from planning to frontend and backend' },
      { value: '2', label: 'Payment Integrations', desc: 'PayPal · KakaoPay' },
      { value: 'Automated', label: 'Scheduled Payments', desc: 'Charges timed to the game schedule' },
      { value: 'Global', label: 'TTRPG Platform', desc: 'Connecting GMs and players worldwide' },
    ],
  },
};
