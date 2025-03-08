import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const forumDB = (await connectDB()).db("forum");
    const query = req.query.q?.trim(); // ✅ 검색어 앞뒤 공백 제거

    if (!query) {
      return res.status(400).json({ message: "검색어를 입력하세요." });
    }

    console.log("📌 [LOG] 검색어:", query);

    // ✅ 대소문자 구분 없이 정확히 일치하는 데이터 검색
    const searchResults = await forumDB.collection("file_data")
      .find({ name: { $regex: `^${query}$`, $options: "i" } }) // 정확한 일치 + 대소문자 무시
      .limit(10)
      .toArray();

    console.log("📌 [LOG] 검색 결과:", searchResults.length, "개");

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("📌 검색 중 오류 발생:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
}
