import {connectDB} from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';

export default async function List() {

  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray()

    return (
      <div className="list-bg">
        {
          result.map((item, index) => {
            return (
              <div className="list-item" key={index}>
                <Link href={`/detail/${result[index]._id}`}>
                  <h4>{result[index].title}</h4>
                </Link>
                <Link href={`/edit/${result[index]._id}`}>✏️</Link>
                <p>{result[index].content}</p>
              </div>
            )
          })
        }        
      </div>
    )
  } 