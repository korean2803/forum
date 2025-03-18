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
                        fetch('/api/post/delete',{method:'DELETE',
                            body:JSON.stringify({
                                id:props.result[index]._id,
                            }),                            
                        })                     
                        
                        .then((r)=>{
                              if(r.status == 200) {
                                return r.json()
                              } else {
                                alert('삭제에 실패했습니다. 다시 시도해주세요.');
                                console.error('서버 오류:', error.message);
                              }
                            })
                            .then((result)=>{ 
                                alert('게시글이 성공적으로 삭제되었습니다.');
                                console.log('삭제된 게시글 ID:', props.result[index]._id);
                            }).catch((error)=>{
                                alert('삭제에 실패했습니다. 다시 시도해주세요.');
                                console.error('서버 오류:', error.message);
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