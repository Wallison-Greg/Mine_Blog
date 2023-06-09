import "./Dashboard.css"

import { Link } from "react-router-dom"

//hooks
import {useAuthValue} from "../../context/AuthContext";
import {useFetchDocumets}  from "../../hooks/useFetchDocumets";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {

  const {user} = useAuthValue();
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocumets("posts", null, uid)

  const {deleteDocument} = useDeleteDocument("posts")

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className= "dashboard">
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className="noposts">
          <p>Não foram encontrado posts</p>
          <Link className="btn" to="/posts/create">Criar primeiro post</Link>
        </div>
      ) : (
        <>
          <div className="post_header">
            <span>Titulo</span>
            <span>Açôes</span>
          </div>
          {posts && posts.map((post) => (
            <div key={post.id} className="post_row">
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Deletar</button>
              </div>
            </div>
          ))}
        </>
      )}
      
    </div>
  )
}

export default Dashboard
