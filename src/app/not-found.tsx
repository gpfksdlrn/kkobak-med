import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
