export default function Signup(){
    return (
        <div className = "p-20">
            <h4>회원가입</h4>
            <form action="api/post/new" method="POST">
                <input type="text" name="title" placeholder="ID"/>
                <input name="content" placeholder="Password"/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}