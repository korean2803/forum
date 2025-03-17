import {connectDB} from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';
import Listitem from './Listitem';


export default async function List() {

  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray()

    return (
      <div className="list-bg">
         <Listitem result={result} />
      </div>
    )
  } 