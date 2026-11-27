# 📖 명언 생성기 (Wisdom Quote Generator)

버튼을 누르면 엄선된 명언을 무작위로 감상하고, 나만의 명언을 브라우저에 저장·관리하거나 클립보드 복사 및 SNS 공유를 할 수 있는 웹 애플리케이션입니다.  
별도의 외부 라이브러리나 빌드 도구 없이 **순수 HTML5, CSS3, 바닐라 자바스크립트(Vanilla JS)** 로 가볍고 탄탄하게 구현되었습니다.

---

## 🌟 주요 기능

### 1. 무작위 명언 추천 및 감상
- **풍부한 기본 명언 제공**: 문학, 철학, 명사들의 감동적인 기본 명언 20편 수록
- **중복 방지 랜덤 알고리즘**: 다음 명언 선택 시 현재 화면에 표시된 명언과 연속으로 중복되지 않도록 처리
- **키보드 접근성 지원**: 명언 카드에 키보드 포커스가 가능하며, `Enter` 또는 `Space` 키로 간편하게 다음 명언으로 전환
- **부드러운 전환 효과**: 명언이 바뀔 때 부드럽게 떠오르는 페이드 인/라이즈 애니메이션(`@keyframes rise`) 적용

### 2. 명언 복사 및 외부 공유
- **클립보드 복사**:
  - 최신 `navigator.clipboard` API를 사용하여 "문구 — 저자" 포맷으로 원클릭 복사
  - 구형 브라우저 또는 권한 제한 환경을 위한 가상 `textarea` + `execCommand('copy')` 폴백(Fallback) 완비
- **스마트 공유하기**:
  - 모바일 기기 및 지원 브라우저에서는 네이티브 `navigator.share` (Web Share API) 호출
  - 미지원 데스크톱 환경에서는 트위터(X) 공유 팝업 창 자동 연결

### 3. 나만의 명언 저장 및 관리 (Local Storage)
- **명언 추가**:
  - 문구(최대 200자)와 저자(최대 40자)를 입력하여 나만의 명언 등록
  - 등록 즉시 화면 메인 카드에 해당 명언이 노출되고, 전체 랜덤 명언 풀(Pool)에 포함
- **데이터 영구 보존**:
  - 브라우저의 `localStorage`(`wisdom-custom-quotes`)에 안전하게 저장되어 새로고침 후에도 유지
- **실시간 유효성 검사**:
  - 빈 값 입력 방지, 글자 수 제한 초과 검사 및 에러 시 해당 입력 필드로 자동 포커스 이동
- **목록 조회 및 삭제**:
  - 저장된 커스텀 명언 목록 및 개수 실시간 표시
  - 개별 삭제 기능 제공 (현재 화면에 노출 중인 명언 삭제 시 자동으로 다른 명언으로 갱신)

### 4. 세심한 사용자 경험(UX) 및 웹 접근성(A11y)
- **시맨틱 마크업**: `<header>`, `<main>`, `<article>`, `<figure>`, `<blockquote>`, `<figcaption>`, `<cite>`, `<section>`, `<footer>` 등 표준 웹 규격 준수
- **스크린 리더 지원**:
  - `aria-live="polite"` 및 `role="status"` / `role="alert"`를 활용해 명언 갱신 및 상태 피드백 음성 안내
  - `visually-hidden` 요소를 통한 시각 비표시 정보 전달
- **본문 건너뛰기 링크 (Skip Link)**: 키보드 탐색 사용자를 위한 최상단 스킵 링크 제공
- **완벽한 다크 모드**: OS 설정(`prefers-color-scheme: dark`)을 감지하여 고대비 및 눈이 편안한 다크 테마 자동 전환
- **모션 배려**: 애니메이션에 민감한 사용자를 위해 `prefers-reduced-motion: reduce` 미디어 쿼리 적용
- **반응형 디자인**: 모바일 화면부터 데스크톱까지 일관된 뷰를 제공하는 플렉스박스 및 CSS 그리드 레이아웃

---

## 📁 프로젝트 구조

```plaintext
.
├── index.html   # 웹 페이지의 시맨틱 구조, 폼, 명언 카드 레이아웃 정의
├── style.css    # CSS 변수 기반 디자인 시스템, 반응형 레이아웃, 다크 모드, 애니메이션
├── app.js       # 상태 관리, 로컬 스토리지 연동, 클립보드/공유 API 및 돔(DOM) 이벤트 로직
└── README.md    # 프로젝트 설명 문서
```

---

## 🛠 기술 스택

- **Markup**: HTML5 (Semantic Elements, WAI-ARIA)
- **Styling**: CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- **Scripting**: Modern JavaScript (ES6+, Web Storage API, Clipboard API, Web Share API)

---

## 🚀 실행 방법

별도의 패키지 설치나 빌드 과정이 필요하지 않습니다.

1. 본 저장소의 코드를 다운로드하거나 클론합니다.
2. `index.html` 파일을 더블 클릭하여 웹 브라우저(Chrome, Edge, Safari, Firefox 등)에서 바로 열어 사용합니다.
3. 로컬 서버 환경이 필요한 경우(예: VS Code의 **Live Server** 확장 또는 Python 명령) 아래와 같이 실행할 수 있습니다:
   ```bash
   # Python 3 내장 서버 실행 예시
   python -m http.server 8000
   ```
   브라우저에서 `http://localhost:8000` 접속
