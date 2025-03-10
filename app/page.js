import {MongoClient} from 'mongodb';
import {connectDB} from '../util/database';

export default async function Home() {

  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray()
  console.log(result)

  return (
    <div className = "p-20"> 
      <h1 className = "home">경찰청 Database</h1>
    </div>
  )
}
