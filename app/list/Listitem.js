'use client'
import Link from 'next/link';

export default function Listitem(props) {
    return (
        <div>
            {
            props.result.map((item, index) => {
                return (
                <div className="list-item" key={index}>
                    <Link href={`/detail/${props.result[index]._id}`}>
                    <h4>{props.result[index].title}</h4>
                    </Link>
                    <Link href={`/edit/${props.result[index]._id}`}>✏️</Link>
                    
                    <span onClick={()=>{
                        fetch('api/test',{
                            method:'DELETE',

                        })
                        
                        
                        .then(()=>{
                        console.log('123123')
                        })
                    

                    }
                    }>🗑️</span>
                    <p>{props.result[index].content}</p>
                </div>
                )
            })
            }      
        </div>
    )
}