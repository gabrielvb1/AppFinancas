import './Main.css';
import Logo from './assets/Polygon.svg'
import Usuario from './assets/icone-usuario.svg'
import Sair from './assets/icone-sair.svg'
import Filtrar from './assets/icone-filtro.svg'
import Editar from './assets/icone-edit.svg'
import Excluir from './assets/icon-excluir.svg'
import api from '../../services/api';
import { clear, getItem } from '../../utils/storage';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom'
import Modal from './ModalAdd';
import ModalDelete from './ModalDelete';
import ModalEditUser from './ModalEditUser';
import ModalUpdateTransaction from './UpdateTransaction';
import Filtro from './Filtro';
function Main() {
    const navigate = useNavigate()
    const token = getItem('token')
    const [tabela, setTabela] = useState([])
    const [extrato, setExtrato] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [transacaoId, setTransacaoId] = useState(0)
    const [modalFormData, setModalFormData] = useState({ valor: '', categoria: '', data: '', descricao: '', categoria_id: 0, tipo: '' })
    const [editUserModalData, setEditUserModalData] = useState({ nome: '', email: '', senha: '', confirmSenha: '' })
    const [categoriasSelect, setCategoriasSelect] = useState([])
    const [editUser, setEditUSer] = useState(false)
    const [categoriaId, setCategoriaId] = useState(0)
    const [nomeHome, setNomeHome] = useState('')
    const [modalEditTrans, setModalEditTrans] = useState(false)
    const [filtroActive, setFiltroActive] = useState(false)
    const [tabelaLimpa, setTabelaLimpa] = useState([])
    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        async function handleGetTransactions() {
            try {
                const responseTransacao = await api.get('/transacao', { headers: { Authorization: `Bearer ${token}` } })

                setTabela([...responseTransacao.data])
                setTabelaLimpa([...responseTransacao.data])
                const responseExtrato = await api.get('/transacao/extrato', { headers: { Authorization: `Bearer ${token}` } })
                setExtrato({ ...responseExtrato.data })
                return

            } catch (error) {
                if (tabela.length < 1) {
                    return setExtrato(0)
                }
                console.log(error.message);
            }
        }
        handleGetTransactions()
    }, [token, tabela.length])


    useEffect(() => {
        async function getCategorias() {
            try {
                const responseCategorias = await api.get('/categoria', { headers: { Authorization: `Bearer ${token}` } })
                const categorias = responseCategorias.data.map((categoria) => categoria.descricao)
                setCategoriasSelect([...categorias])
            } catch (error) {
                console.log(error.message)
            }
        }
        getCategorias()
    }, [token])

    function handleOpenDeleteModal(linha) {
        setCurrentItem(linha)
        setModalDelete(true)
        console.log(linha.id);
    }

    function handleGetCurrentTransaction(transaction, id, categoriaId) {
        setModalEditTrans(true)
        setModalFormData({ ...transaction })
        setTransacaoId(id)
        setCategoriaId(categoriaId)
    }

    useEffect(() => {
        async function handleGetCurrentUser() {
            try {
                const responseUsers = await api.get('/usuario', { headers: { Authorization: `Bearer ${token}` } })
                const { nome, email } = responseUsers.data
                setEditUserModalData({ ...editUserModalData, nome: nome, email: email })
                setNomeHome(nome)
            }

            catch (error) {
                console.log(error.message)
            }
        }
        handleGetCurrentUser()
    }, [editUserModalData, token])

    function handleLogOut() {
        navigate(-1);
        clear()
    }

    return (
        <div className='container-main'>
            <header>
                <div className='home'>
                    <img src={Logo} alt='logo'></img>
                    <h1>Dindin</h1>
                </div>

                <div className='nav'>
                    <img src={Usuario} alt='icone-usuario' onClick={() => setEditUSer(true)}></img>
                    <p>{nomeHome}</p>
                    <img src={Sair} alt='icone-sair' onClick={() => handleLogOut()}></img>
                </div>
            </header>

            <main>

                <div className='div-filtro' onClick={() => setFiltroActive(!filtroActive)}>
                    <img src={Filtrar} alt='icone-filtro'></img>
                    <p>Filtrar</p>
                </div>
                {filtroActive && <Filtro
                    tabela={tabela}
                    setTabela={setTabela}
                    categoriasSelect={categoriasSelect}
                    tabelaLimpa={tabelaLimpa}
                />}
                <div className='mid-container'>

                    <div className='tabela'>
                        <div className='linha-1'>
                            <p className='linha-small'>Data</p>
                            <p className='linha-media'>Dia da semana</p>
                            <p className='linha-grande'>Descrição</p>
                            <p className='linha-small'>Categoria</p>
                            <p className='linha-small'>Valor</p>
                            <div className='linha-small'></div>
                        </div>
                        <div className='table-body'>
                            {tabela.map((linha) => {

                                return (
                                    <div className='linha' key={linha.id}>
                                        <p className='linha-small data'>{format(new Date(linha.data), 'dd/MM/yyyy')}</p>
                                        <p className='linha-media'>{`${format(parseISO(linha.data), 'EEEE', { locale: ptBR }).charAt(0).toUpperCase()}${format(parseISO(linha.data), 'EEEE', { locale: ptBR }).substring(1)}`}</p>
                                        <p className='linha-grande'>{linha.descricao}</p>
                                        <p className='linha-small'>{linha.categoria_nome}</p>
                                        {linha.tipo === 'entrada' ? <p className='linha-small entrada'>R$ {(linha.valor / 100).toFixed(2).replace('.', ',')}</p> : <p className='linha-small saida'>R$ {(linha.valor / 100).toFixed(2).replace('.', ',')}</p>}
                                        <div className='linha-small'>
                                            <img src={Editar} alt='icone-editar' onClick={() => handleGetCurrentTransaction(linha, linha.id, linha.categoria_id, linha.categoria_nome)}></img>
                                            <img src={Excluir} alt= 'icone-excluir' onClick={() => handleOpenDeleteModal(linha)}></img>
                                            <ModalDelete
                                                modalDelete={modalDelete && linha.id === currentItem.id}
                                                handleOpenDeleteModal={handleOpenDeleteModal}
                                                api={api}
                                                token={token}
                                                currentItem={currentItem}
                                                setCurrentItem={setCurrentItem}
                                                tabela={tabela}
                                                setTabela={setTabela}
                                                modalFormData={modalFormData}
                                                setExtrato={setExtrato}
                                                extrato={extrato}
                                                setTabelaLimpa={setTabelaLimpa}
                                            />
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='div-resumo'>
                        <div className='card'>
                            <h3>Resumo</h3>
                            <div className='entradas'>
                                <p>Entradas</p>
                                {extrato === 0 ? <span>R$ 0</span> : <span>R$ {(extrato.entrada / 100).toFixed(2).replace('.', ',')}</span>}
                            </div>
                            <div className='saidas'>
                                <p>Saídas</p>
                                {extrato === 0 ? <span>R$ 0</span> : <span>R$ {(extrato.saida / 100).toFixed(2).replace('.', ',')}</span>}
                            </div>
                            <div className='saldo'>
                                <p>Saldo</p>
                                {extrato === 0 ? <span>R$ 0</span> : <span>R${((extrato.entrada - extrato.saida) / 100).toFixed(2).replace('.', ',')}</span>}
                            </div>
                        </div>
                        <div className='botao-add-registro'>
                            <button onClick={() => setModalOpen(true)}>Adicionar Registro</button>
                        </div>
                    </div>
                </div>

            </main>
            {modalOpen && <Modal
                setModalOpen={setModalOpen}
                modalFormData={modalFormData}
                setModalFormData={setModalFormData}
                api={api}
                token={token}
                categoriasSelect={categoriasSelect}
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
                categoriaId={categoriaId}
                setTabela={setTabela}
                tabela={tabela}
                setExtrato={setExtrato}
            />}

            {modalEditTrans && <ModalUpdateTransaction
                api={api}
                token={token}
                modalFormData={modalFormData}
                setModalFormData={setModalFormData}
                handleGetCurrentTransaction={handleGetCurrentTransaction}
                setModalEditTrans={setModalEditTrans}
                transacaoId={transacaoId}
                categoriaId={categoriaId}
                categoriasSelect={categoriasSelect}
                tabela={tabela}
                setTabela={setTabela}
                setExtrato={setExtrato}
            />}

            {editUser && < ModalEditUser
                editUserModalData={editUserModalData}
                setEditUserModalData={setEditUserModalData}
                token={token}
                api={api}
                setEditUSer={setEditUSer}
                editUser={editUser}
                setNomeHome={setNomeHome}
            />}

            {/* {modalDelete && <ModalDelete
                handleOpenDeleteModal={handleOpenDeleteModal}
                api={api}
                token={token}
                transacaoId={transacaoId}
                tabela={tabela}
                setTabela={setTabela}
                modalFormData={modalFormData}
                setExtrato={setExtrato}
                extrato={extrato}
            />} */}
        </div>
    )
}

export default Main