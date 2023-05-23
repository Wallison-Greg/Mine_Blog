import "./Register.css"

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("");

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword){
            setError("As senha devem ser iguais")
            return
        }

        const res = await createUser(user)

        console.log(res)
    }

    useEffect(() => {

        if(authError){
            setError(authError)
        }

    }, [authError])

  return (
    <div className="register">
        <h1>Cadastre-se para postar</h1>
        <p>Crie o seu usuario e compartilhe a sua historia</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                    type="text" 
                    placeholder="Nome do usuario" 
                    name="displayName" 
                    required 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    value={displayName}
                />
            </label>
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
            <label>
                <span>Confirmação de Senha:</span>
                <input 
                    type="password" 
                    placeholder="Confirme a sua senha" 
                    name="confirmPassword" 
                    required 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    value={confirmPassword}
                />
            </label>
            {!loading && <button className="btn">Cadastrar</button>}
            {loading && <button className="btn">Carregando...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register