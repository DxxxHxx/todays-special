# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

<!-- # 오늘 뭐 먹지? 🍜

**AI 프롬프트 기반 메뉴 추천 + 위치 기반 맛집 검색 서비스**
React + Supabase + OpenAI + Kakao Local API 기반으로 구현된 실사용 가능한 프로젝트입니다.

<br />

## 📌 소개

> 기분, 날씨, 상황에 맞는 메뉴를 AI에게 추천받고
> 지금 내 위치 근처에서 그 메뉴를 맛볼 수 있는 맛집까지 함께 찾아주는 ✨일상 밀착형 추천 서비스입니다.

- 🤖 프롬프트 기반 메뉴 추천 (OpenAI)
- 📍 내 위치 기반 주변 맛집 검색 (Kakao API)
- 🧾 추천 기록 저장 및 즐겨찾기
- 📊 Supabase 기반 실시간 사용자별 데이터 관리

<br />

## 🚀 사용 기술 스택

| 영역           | 기술                                  |
| -------------- | ------------------------------------- |
| Frontend       | React, TypeScript, Vite, Tailwind CSS |
| Backend        | Supabase (DB, Auth, RLS, Storage)     |
| AI             | OpenAI GPT API                        |
| 위치 기반 검색 | Kakao Local API                       |
| 배포           | Vercel                                |

<br />

## 🎯 주요 기능

### 1. 메뉴 추천

- 사용자가 프롬프트를 직접 입력하거나 버튼으로 상황 선택
- OpenAI GPT API를 통해 메뉴 + 설명 추천

### 2. 맛집 검색

- 브라우저에서 위치 권한 허용
- 추천된 메뉴 키워드로 Kakao API를 통해 근처 가게 검색

### 3. 추천 기록/즐겨찾기

- 추천 히스토리 자동 저장
- 가게를 즐겨찾기로 저장 가능
- 마이페이지에서 전체 추천 내역 & 즐겨찾기 확인

<br />

## 📸 주요 화면

| 홈 화면       | 추천 결과     | 맛집 리스트   |
| ------------- | ------------- | ------------- |
| _(캡처 예정)_ | _(캡처 예정)_ | _(캡처 예정)_ |

<br />

## 🧪 트러블슈팅 & 개선 사항

- Supabase RLS를 활용한 사용자별 데이터 접근 제어
- Geolocation + Kakao API 연동 시 CORS 및 위치 정확도 이슈 해결
- OpenAI 응답 불확실성 대응 → 프롬프트 템플릿 구조화

📝 자세한 회고/트러블슈팅은 👉 [Notion 링크로 이동](https://www.notion.so/your-notion)

<br />

## 📂 프로젝트 구조 (예시)

```bash
📦 src
├── components       # 공통 컴포넌트
├── pages            # 라우팅되는 페이지 단위
├── api              # OpenAI, Kakao API 호출 함수
├── hooks            # 커스텀 훅 모음
├── supabase         # supabase client & schema 관리
└── types            # 타입 정의

🛠️ 개발 예정 기능 (or 확장 예정)
날씨/기분 자동 감지 기반 추천 프롬프트

친구에게 추천 결과 공유

유저 간 인기 메뉴 랭킹
```

## 🛠 기술 스택 선정 이유

### 📦 React (with Vite + TypeScript)

- **빠른 SPA 구성**: 페이지 간 새로고침 없이 부드러운 전환 UX 구현
- **컴포넌트 단위 개발**: UI 재사용성과 유지보수성 향상
- **Vite**: CRA보다 빠르고 모던한 빌드 환경 제공
- **TypeScript**: 타입 기반 개발로 런타임 오류 감소, 코드 신뢰성 확보

### 📦 Supabase

- **Firebase 대체 오픈소스 BaaS**: 인증, DB, 스토리지 등 통합 제공
- **PostgreSQL 기반**: SQL 직접 사용 가능, 자유도 높은 데이터 설계
- **Row-Level Security(RLS)**: 유저별 데이터 접근 제한으로 보안 강화
- **빠른 MVP 개발 가능**: 별도 서버 없이 즉시 백엔드 구축

### 📦 OpenAI GPT API

- **자연어 기반 메뉴 추천**: 사용자 감정/상황에 맞는 창의적 메뉴 제안
- **프롬프트 커스터마이징 가능**: 다양한 입력 조건에 따라 유연한 추천 응답
- **대화형 UX 구성**: AI와 실제로 소통하는 듯한 경험 제공

### 📦 Kakao Local API

- **위치 기반 맛집 검색**: 키워드 + 위치 조합으로 주변 장소 검색
- **정확한 가게 정보 제공**: 주소, 거리, 전화번호 등 실용 정보 포함
- **지도 서비스 연계 용이**: Kakao Map, Static Map과 자연스럽게 연동 가능

### 📦 Vercel

- **React 프로젝트 배포 최적화**: GitHub 연동만으로 자동 빌드/배포
- **환경 변수 관리 지원**: OpenAI, Supabase 등 API 키 보안 적용 가능
- **CDN 기반 빠른 응답**: 모바일에서도 빠른 초기 로딩 보장 -->
