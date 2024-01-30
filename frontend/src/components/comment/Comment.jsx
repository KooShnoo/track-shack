import { useState } from "react"


const Comment = () => {
    const [body, setBody] = useState('')

    return (
        <div className="commentContainer">
            <textarea name="" id="" cols="20" rows="6" onChange={e => setBody(e.target.value)}></textarea>
        </div>
    )
}

export default Comment