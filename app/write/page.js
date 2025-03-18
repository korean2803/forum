"use client";

import { useRouter } from 'next/navigation';

export default function Write() {
    const router = useRouter();

    return (
        <div className="p-20">
            <h4>글쓰기</h4>
            <form action="/api/post/write" method="POST" onSubmit={() => router.push('/home')}>
                <input type="text" name="title" placeholder="제목" required />
                <input name="content" placeholder="내용" required />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}
