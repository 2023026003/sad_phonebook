import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata = {
  title: '전화번호 관리 시스템',
  description: '이름과 전화번호를 간편하게 등록, 수정, 삭제할 수 있는 전화번호부 서비스입니다.',
  keywords: '전화번호부, 연락처 관리, phonebook',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
