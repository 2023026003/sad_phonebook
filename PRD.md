# PRD (Product Requirements Document)
# 전화번호 관리 시스템 (Sad Phonebook)

**버전**: 1.0.0
**작성일**: 2026-05-26
**상태**: Draft

---

## 1. 제품 개요 (Product Overview)

### 1.1 목적

누구나 별도의 로그인 없이 웹 브라우저에서 연락처(이름 + 전화번호)를 관리할 수 있는 경량 CRUD 웹 애플리케이션을 제공한다.

### 1.2 배경 및 문제 정의

- 간단한 연락처 정보를 빠르게 저장·조회·수정·삭제하고 싶으나, 무거운 설치형 프로그램이나 별도 회원가입이 필요한 서비스를 원하지 않는 사용자를 위한 도구다.
- 최소한의 기능만 제공하여 빠른 개발과 배포를 목표로 한다.

### 1.3 목표 사용자 (Target Users)

- 개인 또는 소규모 팀에서 공유 전화번호부가 필요한 사람
- 복잡한 CRM 없이 간단한 연락처 관리가 필요한 사람

---

## 2. 범위 (Scope)

### 2.1 In Scope (구현 대상)

| # | 기능 |
|---|------|
| 1 | 연락처 목록 조회 |
| 2 | 연락처 등록 (이름, 전화번호) |
| 3 | 연락처 수정 |
| 4 | 연락처 삭제 (삭제 확인 포함) |
| 5 | 반응형 UI (모바일 / 데스크톱) |

### 2.2 Out of Scope (구현 제외)

- 사용자 인증 / 로그인
- 연락처 그룹 / 카테고리 분류
- CSV 가져오기 / 내보내기
- 푸시 알림 / 이메일 알림
- 검색 기능 (선택적 고려)

---

## 3. 사용자 스토리 (User Stories)

| ID | 사용자 스토리 | 우선순위 |
|----|--------------|---------|
| US-01 | 사용자는 전체 연락처 목록을 확인할 수 있다. | 필수 |
| US-02 | 사용자는 이름과 전화번호를 입력해 새 연락처를 추가할 수 있다. | 필수 |
| US-03 | 사용자는 기존 연락처의 이름과 전화번호를 수정할 수 있다. | 필수 |
| US-04 | 사용자는 연락처를 삭제할 수 있으며, 삭제 전 확인 메시지를 받는다. | 필수 |
| US-05 | 사용자는 모바일 기기에서도 불편함 없이 서비스를 이용할 수 있다. | 필수 |

---

## 4. 기능 요구사항 (Functional Requirements)

### 4.1 연락처 목록 조회 (Read)

- **FR-01**: 페이지 진입 시 Supabase에서 전체 연락처 목록을 불러와 표시한다.
- **FR-02**: 목록에는 이름, 전화번호, 수정 버튼, 삭제 버튼이 표시된다.
- **FR-03**: 연락처가 없을 경우 "등록된 연락처가 없습니다." 안내 문구를 표시한다.

### 4.2 연락처 등록 (Create)

- **FR-04**: 화면에 이름(name)과 전화번호(phone) 입력 필드 및 "추가" 버튼을 제공한다.
- **FR-05**: 이름과 전화번호 모두 입력한 경우에만 등록이 가능하다. (클라이언트 측 유효성 검사)
- **FR-06**: 전화번호 형식은 숫자와 하이픈(`-`)만 허용한다. (예: `010-1234-5678`)
- **FR-07**: 등록 성공 시 입력 필드를 초기화하고 목록을 즉시 갱신한다.

### 4.3 연락처 수정 (Update)

- **FR-08**: 각 연락처 항목에 "수정" 버튼을 제공한다.
- **FR-09**: 수정 버튼 클릭 시 해당 연락처의 이름과 전화번호를 수정할 수 있는 폼(인라인 또는 모달)을 표시한다.
- **FR-10**: 수정 완료 후 목록을 즉시 갱신한다.
- **FR-11**: 수정 취소 시 변경사항 없이 원래 상태로 돌아간다.

### 4.4 연락처 삭제 (Delete)

- **FR-12**: 각 연락처 항목에 "삭제" 버튼을 제공한다.
- **FR-13**: 삭제 버튼 클릭 시 "정말 삭제하시겠습니까?" 확인 다이얼로그를 표시한다.
- **FR-14**: 확인 시 해당 연락처를 Supabase에서 삭제하고 목록을 즉시 갱신한다.

---

## 5. 비기능 요구사항 (Non-Functional Requirements)

| 항목 | 요구사항 |
|------|---------|
| **인증** | 로그인 불필요, 누구나 접근 가능 |
| **성능** | 페이지 초기 로딩 3초 이내 |
| **반응형** | 모바일(360px 이상) 및 데스크톱(1280px 기준) 지원 |
| **보안** | Supabase anon key는 환경 변수로 관리, 클라이언트에 하드코딩 금지 |
| **가용성** | Vercel 무료 플랜 기준 99% 이상 |

---

## 6. 기술 아키텍처 (Technical Architecture)

```
[사용자 브라우저]
      │
      │ HTTPS
      ▼
[Vercel (프론트엔드 호스팅)]
  Next.js / Static HTML+JS
      │
      │ Supabase JS Client (REST API)
      ▼
[Supabase (BaaS)]
  PostgreSQL DB
  - contacts 테이블
```

### 6.1 프론트엔드

- **프레임워크**: Next.js (또는 Vanilla HTML/CSS/JS)
- **스타일링**: Vanilla CSS (반응형)
- **데이터 패칭**: Supabase JavaScript Client (`@supabase/supabase-js`)

### 6.2 데이터베이스 스키마

**테이블명**: `contacts`

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|---------|------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` | 고유 식별자 |
| `name` | `text` | NOT NULL | 연락처 이름 |
| `phone` | `text` | NOT NULL | 전화번호 |
| `created_at` | `timestamptz` | DEFAULT `now()` | 생성일시 |
| `updated_at` | `timestamptz` | DEFAULT `now()` | 수정일시 |

**Supabase SQL 예시**:
```sql
CREATE TABLE contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 비활성화 (인증 없음)
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

### 6.3 환경 변수

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 공개(anon) API 키 |

---

## 7. UI/UX 요구사항

### 7.1 화면 구성

```
┌─────────────────────────────────┐
│         📞 전화번호 관리           │  ← 헤더
├─────────────────────────────────┤
│  이름 [___________]              │
│  전화번호 [___________]  [추가]   │  ← 입력 폼
├─────────────────────────────────┤
│  홍길동   010-1234-5678  [수정][삭제] │
│  김철수   010-9876-5432  [수정][삭제] │  ← 연락처 목록
│  ...                             │
└─────────────────────────────────┘
```

### 7.2 UX 원칙

- 작업 완료 후 사용자에게 성공/실패 피드백(토스트 메시지 등)을 제공한다.
- 삭제는 실수 방지를 위해 반드시 확인 절차를 거친다.
- 모든 액션은 즉각적으로 UI에 반영되어야 한다.

---

## 8. API 명세 (Supabase Client 기준)

| 작업 | Supabase 메서드 | 설명 |
|------|----------------|------|
| 목록 조회 | `supabase.from('contacts').select('*')` | 전체 연락처 조회 |
| 등록 | `supabase.from('contacts').insert({name, phone})` | 새 연락처 추가 |
| 수정 | `supabase.from('contacts').update({name, phone}).eq('id', id)` | 특정 연락처 수정 |
| 삭제 | `supabase.from('contacts').delete().eq('id', id)` | 특정 연락처 삭제 |

---

## 9. 배포 계획 (Deployment Plan)

1. **Supabase 설정**
   - Supabase 프로젝트 생성
   - `contacts` 테이블 생성 및 RLS 비활성화
   - API URL 및 anon key 확인

2. **Vercel 배포**
   - GitHub 저장소 연결
   - 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 설정
   - 자동 배포(main 브랜치 push 시 트리거)

3. **검증**
   - 로컬 개발 서버에서 CRUD 동작 확인
   - Vercel 프리뷰 환경에서 동작 확인
   - 모바일 브라우저 반응형 검증

---

## 10. 마일스톤 (Milestones)

| 단계 | 내용 | 목표 |
|------|------|------|
| M1 | Supabase DB 설정 및 연결 | 환경 구성 완료 |
| M2 | 연락처 목록 조회 구현 | Read 기능 완료 |
| M3 | 연락처 등록 구현 | Create 기능 완료 |
| M4 | 연락처 수정 / 삭제 구현 | Update / Delete 기능 완료 |
| M5 | UI 다듬기 및 반응형 적용 | UI/UX 완성 |
| M6 | Vercel 배포 및 최종 검증 | 배포 완료 |
