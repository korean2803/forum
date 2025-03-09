import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;

  try {
    console.log("🔍 Searching for:", query); // ✅ 검색어 로그 확인



    // ✅ MongoDB 연결 (괄호 `()` 추가)
    const db = (await connectDB).db("forum"); // ✅ 올바른 데이터베이스 선택
    const collection = db.collection("file_data"); // ✅ 컬렉션 선택

    console.log("🟢 Querying database...");
    
    // ✅ `name` 필드에서 정확히 일치하는 문서를 찾음
    const result = await collection.findOne({ name: query });

    console.log("🟢 Query Result:", result); // ✅ MongoDB 응답 확인

    if (result) {
      console.log("✅ Found record:", result);
      res.status(200).json({ id: result._id.toString() }); // ✅ ObjectId를 문자열로 변환하여 반환
    } else {
      console.log("⚠️ No matching record found.");
      res.status(404).json({ error: "No matching record found." });
    }
  } catch (error) {
    console.error("❌ Database error:", error); // ✅ 실제 오류 출력
    res.status(500).json({ error: "Internal Server Error" });
  }
}
