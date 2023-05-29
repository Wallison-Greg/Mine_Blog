import "./EditPost.css"

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useAuthValue} from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocumet } from "../../hooks/useFetchDocument";

const EditPost = () => {

  const {id} = useParams()
  const {document: post} = useFetchDocumet("posts", id)

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() =>{

    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags)
    }

  }, [post])

  const navigate = useNavigate();

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect to home page
    navigate("/dashboard")
  }

  return (
    <div className="edit_post">
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
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
            <p className="preview_title">Preview da imagem</p>
            <img className="preview_image" src={post.image} alt={post.title}/>
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn">Carregando...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
            
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost
