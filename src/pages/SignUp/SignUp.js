import './SignUp.css';
import Logo from './assets/Polygon.svg';
import api from '../../services/api';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setItem } from '../../utils/storage';
function SignUp() {
    const [errorMsg, setErrorMsg] = useState('')
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '', confirmPswd: '' })
    function handleChangeInput(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!formData.nome || !formData.email || !formData.senha || !formData.confirmPswd) {
                setInvalid(true);
                setErrorMsg('Todos os campos devem ser preenchidos!')
                return
            }
            if (formData.senha !== formData.confirmPswd) {
                setInvalid(true)
                setErrorMsg('A senha precisa ser igual!')
                return
            }
            const response = await api.post('/usuario', { ...formData })
            const { id } = response.data
            setItem('userId', id)
            navigate('/');
        } catch (error) {
            const localError = error.response.data.mensagem
            setErrorMsg(localError)
        }
    }

    return (
        <div className="container-signup">
            <header>
                <img src={Logo}></img>
                <h1>Dindin</h1>
            </header>
            <main>
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input
                        type='text'
                        name='nome'
                        onChange={handleChangeInput}
                        value={formData.name}
                    ></input>
                    <label >E-mail</label>
                    <input
                        type='email'
                        name='email'
                        onChange={handleChangeInput}
                        value={formData.email}
                    ></input>
                    <label>Senha</label>
                    <input
                        type='password'
                        name='senha'
                        onChange={handleChangeInput}
                        value={formData.senha}
                    ></input>
                    <label >Confirmação de senha</label>
                    <input
                        type='password'
                        name='confirmPswd'
                        onChange={handleChangeInput}
                        value={formData.confirmPswd}
                    ></input>
                    {invalid === true ? <span className='span-error'>{errorMsg}</span> : ''}
                    <button>Cadastrar</button>
                    <div className='span-cadastro'>
                        <span>Já tem cadastro?</span> <span onClick={() => navigate('/')} className='clique-aqui'>Clique aqui!</span>
                    </div>

                </form>
            </main>

        </div>
    );
}

export default SignUp;
