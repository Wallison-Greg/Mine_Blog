import "./PostDetail.css"

import { Link } from "react-router-dom"

const PostDetail = ({post}) => {
  return (
    <div className="post_detail">
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className="createdby">{post.createdBy}</p>
        <div className="tags">
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/post/${post.id}`} className="btn btn-outline">Ler</Link>
    </div>
  )
}

export default PostDetail