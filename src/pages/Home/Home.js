import "./Home.css"

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

//componets



const Home = () => {

  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="home">
        <h1>Veja nossos posts mais recentes</h1>
        <form onSubmit={handleSubmit} className="search_form">
          <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)} />
          <button className="btn btn-dark">Pesquisar</button>
        </form>
        <div>
          <h1>posts...</h1>
          {posts && posts.length === 0 && (
            <div className="noposts">
              <p>Não foram encontrado posts</p>
              <Link to="/posts/create" className="btn">Criar primeiro post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home;