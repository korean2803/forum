"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileSearch() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    console.log("Search button clicked!"); // ✅ 버튼 클릭 확인
  
    const query = document.getElementById("search_input").value.trim();
    if (!query) {
      console.log("Empty search query"); // ✅ 빈 검색어 체크
      alert("Please enter a search term.");
      return;
    }
  
    setLoading(true); // 로딩 시작
    try {
      console.log(`Sending request to: /api/search/search?query=${encodeURIComponent(query)}`); // ✅ 요청 URL 확인
  
      const response = await fetch(`/api/search/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      console.log("Server Response:", data); // ✅ 서버 응답 확인
  
      if (response.ok) {
        console.log(`Navigating to /personal-file/${data.id}`); // ✅ 이동 경로 확인
        router.push(`/personal-file/${data.id}`);
      } else {
        alert(`Error: ${data.error}`); // ✅ 서버에서 오류 응답이 왔을 때 메시지 표시
      }
    } catch (error) {
      console.error("Error fetching search results:", error); // ✅ 실제 오류 출력
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  

  return (
    <div className="search_container">
      <input className="search_box" type="text" placeholder="Search file" id="search_input" />
      <button className="search_button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
