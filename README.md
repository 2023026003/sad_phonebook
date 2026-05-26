# 📞 전화번호 관리 시스템 (Sad Phonebook)

> 로그인 없이 누구나 사용할 수 있는 웹 기반 전화번호부 CRUD 애플리케이션

## 🛠 기술 스택

- **Frontend**: Next.js 15 (App Router) + Vanilla CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

---

## 🚀 로컬 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고, Supabase 프로젝트 정보를 입력합니다.

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase 테이블 생성

Supabase 대시보드 > SQL Editor에서 아래 SQL을 실행합니다.

```sql
CREATE TABLE contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📦 배포 (Vercel)

1. GitHub에 코드 push
2. [Vercel](https://vercel.com)에서 저장소 연결
3. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 클릭

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📋 목록 조회 | 등록된 전체 연락처를 최신순으로 표시 |
| ➕ 연락처 추가 | 이름 + 전화번호 입력 후 추가 |
| ✏️ 연락처 수정 | 모달 팝업으로 이름/전화번호 수정 |
| 🗑️ 연락처 삭제 | 삭제 확인 후 제거 |
| 📱 반응형 UI | 모바일 / 태블릿 / 데스크톱 지원 |
