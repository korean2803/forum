export default function Write(){
    return (
        <div className = "p-20">
            <h4>글쓰기</h4>
            <form action="api/post/new" method="POST">
                <input type="text" name="title" placeholder="제목"/>
                <input name="content" placeholder="내용"/>
                <button type="submit">등록</button>
            </form>
        </div>
    )
}