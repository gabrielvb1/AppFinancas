import './Login.css'
import Logo from './assets/Polygon.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setItem } from '../../utils/storage';
import api from '../../services/api';
function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', senha: '' })
  const [errorMsg, setErrorMsg] = useState('')
  const [invalid, setInvalid] = useState(false)
  function handleChangeInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (!formData.email || !formData.senha) {
        setInvalid(true)
        setErrorMsg('Preencha todos os campos!');
        return
      }

      const response = await api.post('/login', { ...formData })
      const { token, usuario } = response.data
      setItem('token', token)
      setItem('nome', usuario.nome)
      setItem('email', usuario.email)
      setItem('senha', formData.senha)
      navigate('/main');
    } catch (error) {
      setInvalid(true)
      setErrorMsg(error.response.data.mensagem)
    }
  }

  function handleNavigateToSignUp() {
    navigate('/cadastro')
  }

  return (

    <div className="container-login">

      <header className='container__header'>
        <img src={Logo} alt='Logo'></img>
        <h1>Dindin</h1>
      </header>


      <main>
        <div className='left'>
          <h1>Controle suas <b className='left__financas'>finanças</b>,
            sem planilha chata.</h1>

          <p> Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>

          <button onClick={() => handleNavigateToSignUp()}>Cadastre-se</button>
        </div>

        <div className='login-card'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              name='email'
              onChange={handleChangeInput}
              value={formData.email}
            ></input>
            <label >Password</label>
            <input
              type='password'
              name='senha'
              onChange={handleChangeInput}
              value={formData.senha}
            ></input>
            {invalid === true ? <span className='span-error-login'>{errorMsg}</span> : ''}
            <button>Entrar</button>
          </form>
        </div>
      </main>

    </div>
  );
}

export default Login;
