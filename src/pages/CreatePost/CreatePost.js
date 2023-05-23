import "./CreatePost.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthValue} from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("")

    //validate image URL

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma Url")
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if(!image || !title || !body || !tags){
      setFormError("Por favor, preencha todos os campos")
    }

    if(formError) return; //se ouver erros ele ira para o post

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect to home page
    navigate("/")
  }

  return (
    <div className="create_post">
      <h2>Criar Post</h2>
      <p>Escreva sobre oque você quiser e compratilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input 
            type="text" 
            name="title" 
            placeholder="Pense num titulo" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name="image" 
            placeholder="Insira a imagem do post" 
            onChange={(e) => setImage(e.target.value)} 
            value={image}
          />
        </label>
        <label>
          <span>Conteudo:</span>
          <textarea 
            name="body"
            placeholder="Insira o conteudo do post"
            onChange={(e) => setBody(e.target.value)} 
            value={body}>
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name="tags" 
            placeholder="Insira as tags separadas por virgula" 
            onChange={(e) => setTags(e.target.value)} 
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar</button>}
        {response.loading && <button className="btn">Carregando...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        
      </form>
    </div>
  )
}

export default CreatePost
