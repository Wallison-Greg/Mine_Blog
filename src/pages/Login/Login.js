import "./Login.css"

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("");

        const user = {
            email,
            password
        }

        const res = await login(user)

        console.log(res)
    }

    useEffect(() => {

        if(authError){
            setError(authError)
        }

    }, [authError])

  return (
    <div className="login">
      <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    placeholder="E-mail do usuario" 
                    name="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                    type="password" 
                    placeholder="Insira a sua senha" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                />
            </label>
            {!loading && <button className="btn">Entrar</button>}
            {loading && <button className="btn">Carregando...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login