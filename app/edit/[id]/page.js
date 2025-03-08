import {connectDB} from '@/util/database';
import {ObjectId} from 'mongodb';

export default async function Edit(props){

    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    await db.collection('post').updateOne({_id: new ObjectId(props.params.id)}, 
    {$set: {title: "수정된 제목", content: "수정된 내용"}})

    console.log(result)

    return (
        <div className = "p-20">
            <h4>수정페이지</h4>
            <form action="api/post/new" method="POST">
                <input name="title" defaultValue={result.title}/>
                <input name="content" defaultValue ={result.content}/>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}