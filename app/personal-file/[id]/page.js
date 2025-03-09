import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function PersonalFile({ params }) {
  const { id } = params; // URL에서 ID 가져오기
  let personData = null;

  try {
    const db = (await connectDB).db("forum"); // ✅ 올바른 데이터베이스 선택
    const collection = db.collection("file_data"); // ✅ 컬렉션 선택

    // ✅ MongoDB에서 해당 `_id`를 가진 데이터 가져오기
    personData = await collection.findOne({ _id: new ObjectId(id) });

    if (!personData) {
      return <h1>❌ 해당 인물의 파일을 찾을 수 없습니다.</h1>;
    }
  } catch (error) {
    console.error("❌ Database fetch error:", error);
    return <h1>⚠️ 데이터 불러오는 중 오류 발생!</h1>;
  }

  return (
    <div>
      <h1>📂 Personal File: {personData.name}</h1>
      <p>👤 이름: {personData.name}</p>
      <p>🩸 성별: {personData.sex}</p>
      {/* 필요한 추가 데이터가 있으면 더 표시 가능 */}
    </div>
  );
}
