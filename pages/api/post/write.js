import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청,응답){
    if (요청.method == 'POST'){
        const db=(await connectDB).db('forum')
        let result = await db.collection('post').insertOne(요청.body)
        응답.status(200).json({message: '저장완료'})
    }

}