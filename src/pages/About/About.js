import { Link } from "react-router-dom"
import "./About.css"

const About = () => {
  return (
    <div className="about">
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>Esso projeto consiste em um blog feito em React.js no Front-end e Firebase no Back-end</p>
        <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  )
}

export default About