"use client";
import { useState } from "react";

export default function FileSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가
  const [error, setError] = useState(""); // ✅ 에러 메시지 상태 추가

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) { // ✅ 검색어가 비어있는 경우 방지
      setError("검색어를 입력하세요.");
      return;
    }

    setLoading(true);
    setError(""); // 에러 초기화

    try {
      console.log(`📌 API 요청 실행: /api/search/search?q=${searchQuery}`);

      const res = await fetch(`/api/search/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();

      console.log("📌 검색 API 응답 데이터:", data);

      if (res.ok) {
        setResults(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || "검색 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("📌 검색 오류 발생:", error);
      setError("서버 오류 발생.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h4>파일 검색</h4>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="이름 또는 키워드 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      {loading && <p>검색 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item._id}>
              <a href={`/file/${item._id}`}>{item.name} - {item.evidence_id}</a>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
