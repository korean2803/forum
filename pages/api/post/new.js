import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  try {
    const accountDB = (await connectDB).db("account"); // 회원가입 저장
    const file_dataDB = (await connectDB).db("forum"); // 글 작성 저장 (file_data 컬렉션 사용)
    const { type, ...data } = 요청.body;

    // ✅ 회원가입 처리 (account DB 사용)
    if (type === "register") {
      const { username, password } = data;

      if (!username || !password) {
        return 응답.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
      }

      const existingUser = await accountDB.collection("users").findOne({ username });
      if (existingUser) {
        return 응답.status(400).json({ message: "이미 존재하는 아이디입니다." });
      }

      await accountDB.collection("users").insertOne({
        username,
        password,
        createdAt: new Date(),
      });

      return 응답.status(200).json({ message: "회원가입 성공" });
    }

    // ✅ 글 작성 처리 (file_data 컬렉션 사용)
    else if (type === "post") {
      const requiredFields = [
        "name", "birth_date", "death_date", "height_cm", "eye_color",
        "hair_color", "blood_type", "crime_record", "evidence_id", "additional_info"
      ];

      for (let field of requiredFields) {
        if (!data[field]) {
          return 응답.status(400).json({ message: `${field} 값이 필요합니다.` });
        }
      }

      // 🔹 컬렉션 이름을 "file_data"로 수정
      await file_dataDB.collection("file_data").insertOne({
        ...data,
        createdAt: new Date(),
      });

      return 응답.status(200).json({ message: "글 작성 성공" });
    }

    return 응답.status(400).json({ message: "잘못된 요청 유형입니다." });

  } catch (error) {
    console.error("API 처리 중 오류 발생:", error);
    return 응답.status(500).json({ message: "서버 오류 발생" });
  }
}
