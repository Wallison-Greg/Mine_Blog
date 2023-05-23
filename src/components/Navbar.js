import "./Navbar.css"

import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {

    const {user} = useAuthValue();
    const {logout} = useAuthentication();

  return (
    <nav className="navbar">
        <NavLink to='/' className="brand">
            Mini <span>Blog</span>
        </NavLink>
        <ul className="links_list">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to="/login">Entrar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Cadastrar</NavLink>
                    </li>
                </>
            )}
            {user && (
                <>
                    <li>
                        <NavLink to="/posts/create">Novo Post</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar