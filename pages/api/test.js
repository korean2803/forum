import {connectDB} from '@/util/database';

export default async function handler(req, res) {

    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray()

    if (req.method === 'POST') {
        let a = req.body.title;
        res.status(200).json(a)
    }
    if (req.method === 'GET') {
        if (req.query.action === 'currentTime') 
            {
            res.status(200).json(new Date());
           }       
    }
    //DELETE 요청 추가
    else if (req.method ==='DELETE') {

    }
}