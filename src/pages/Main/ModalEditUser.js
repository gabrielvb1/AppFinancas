import './ModalEditUser.css'
import Fechar from './assets/close-modal-btn.svg'
import { getItem } from '../../utils/storage'
export default function ModalEditUser({ editUserModalData, setEditUserModalData, api, token, setEditUSer, setNomeHome }) {
    const nome = getItem('nome')
    function handleChangeInput(e) {
        setEditUserModalData({ ...editUserModalData, [e.target.name]: e.target.value })
    }

    async function HandleSubmit(e) {
        e.preventDefault()
        try {
            if (!editUserModalData.nome || !editUserModalData.email || !editUserModalData.senha || !editUserModalData.confirmSenha) {
                console.log('Preencha todos os campos!');
                return
            }

            await api.put('/usuario', { ...editUserModalData }, { headers: { Authorization: `Bearer ${token}` } })
            setNomeHome(editUserModalData.nome)
        } catch (error) {
            console.log(error)
        }

    }

   
    return (
        <div className="modal-edit">
            <div className='modal-edit-card'>
                <div className="top-edit">
                    <h1>Editar Perfil</h1>
                    <img src={Fechar} onClick={() => setEditUSer(false)}></img>
                </div>
                <form className='form-modal-edit' onSubmit={HandleSubmit}>
                    <label>Nome</label>
                    <input
                        value={editUserModalData.nome}
                        type='text'
                        name='nome'
                        onChange={handleChangeInput}
                    ></input>
                    <label>E-mail</label>
                    <input
                        value={editUserModalData.email}
                        type='email'
                        name='email'
                        onChange={handleChangeInput}
                    ></input>
                    <label>Senha</label>
                    <input
                        value={editUserModalData.senha}
                        name='senha'
                        type='password'
                        onChange={handleChangeInput}
                    ></input>
                    <label>Confirmação de senha</label>
                    <input
                        value={editUserModalData.confirmSenha}
                        name='confirmSenha'
                        type='password'
                        onChange={handleChangeInput}
                    ></input>
                    <div className='container-btn-modal-edit'>
                        <button>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
} 