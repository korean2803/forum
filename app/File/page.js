"use client";
import { useState } from "react";

export default function File_create() {
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    death_date: "",
    height_cm: "",
    eye_color: "",
    hair_color: "",
    blood_type: "",
    crime_record: "",
    evidence_id: "",
    additional_info: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      type: "post",
      ...formData
    };
  
    try {
      const response = await fetch("/api/post/game_data", {  // ✅ API 경로 수정됨!
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      console.log("서버 응답:", data);
  
      if (response.ok) {
        alert("개인 파일이 성공적으로 저장되었습니다!");
        setFormData({
          name: "",
          birth_date: "",
          death_date: "",
          height_cm: "",
          eye_color: "",
          hair_color: "",
          blood_type: "",
          crime_record: "",
          evidence_id: "",
          additional_info: ""
        });
      } else {
        alert(`저장 실패! ${data.message}`);
      }
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
    }
  };
  

  return (
    <div className="p-20">
      <h4>개인 파일 입력</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} required />
        <input type="date" name="birth_date" placeholder="출생 날짜" value={formData.birth_date} onChange={handleChange} />
        <input type="date" name="death_date" placeholder="사망 날짜" value={formData.death_date} onChange={handleChange} />
        <input type="number" name="height_cm" placeholder="키 (cm)" value={formData.height_cm} onChange={handleChange} />
        <input type="text" name="eye_color" placeholder="눈 색깔" value={formData.eye_color} onChange={handleChange} />
        <input type="text" name="hair_color" placeholder="머리 색깔" value={formData.hair_color} onChange={handleChange} />
        <input type="text" name="blood_type" placeholder="혈액형" value={formData.blood_type} onChange={handleChange} />
        <textarea name="crime_record" placeholder="범죄 기록" value={formData.crime_record} onChange={handleChange}></textarea>
        <input type="text" name="evidence_id" placeholder="증거 ID" value={formData.evidence_id} onChange={handleChange} />
        <textarea name="additional_info" placeholder="추가 정보" value={formData.additional_info} onChange={handleChange}></textarea>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
