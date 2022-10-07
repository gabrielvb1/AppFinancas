import './ModalAdd.css'
import Fechar from './assets/close-modal-btn.svg'
import { useState } from 'react'
export default function Modal({ setModalOpen, modalFormData, setModalFormData, api, token, categoriasSelect, setModalEdit, setTabela, tabela, setExtrato }) {
    const [tipo, setTipo] = useState('')

    function handleChangeInput(e) {
        const localCategoriaId = categoriasSelect.indexOf(modalFormData.categoria) + 1
        setModalFormData({ ...modalFormData, [e.target.name]: e.target.value, categoria_id: localCategoriaId, tipo: tipo })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const [dia, mes, ano] = modalFormData.data.split('/')
        const localCategoriaId = categoriasSelect.indexOf(modalFormData.categoria) + 1
        try {
            if (!modalFormData.valor || !modalFormData.categoria || !modalFormData.data || !modalFormData.descricao) {
                console.log('Preencha todos os campos!');
                return
            }

            const response = await api.post('/transacao', {
                tipo,
                descricao: modalFormData.descricao,
                valor: modalFormData.valor,
                data: new Date(`${ano}-${mes}-${dia}`),
                categoria_id: localCategoriaId
            }, { headers: { Authorization: `Bearer ${token}` } })
            setTabela([...tabela, response.data])
            const responseExtrato = await api.get('/transacao/extrato', { headers: { Authorization: `Bearer ${token}` } })
            setExtrato({ ...responseExtrato.data })

        } catch (error) {
            console.log(error.response.data)
        }
        setModalFormData({ ...modalFormData, valor: '', data: '', descricao: '' })
    }



    function changeModalName() {
        setModalOpen(false)
        setModalEdit(false)
    }


    return (
        <div className="modal">
            <div className='modal-card'>
                <div className="top">
                    <h1>Adicionar Registro</h1>
                    <img src={Fechar} alt='icone-fechar' onClick={() => changeModalName()}></img>
                </div>
                <div className="div-btns-entrada-saida">
                    {tipo === 'entrada' ? <button className='btn-modal-entrada' onClick={() => setTipo('entrada')}>Entrada</button> : <button className='btn-modal-entrada-unactive' onClick={() => setTipo('entrada')}>Entrada</button>}
                    {tipo === 'saida' ? <button className='btn-modal-saida' onClick={() => setTipo('saida')}>Saída</button> : <button className='btn-modal-saida-unactive' onClick={() => setTipo('saida')}>Saída</button>}
                </div>

                <form className='form-modal' onSubmit={handleSubmit}>
                    <label>Valor</label>
                    <input
                        type='text'
                        name='valor'
                        onChange={handleChangeInput}
                        value={modalFormData.valor}
                    ></input>
                    <label>Categoria</label>
                    <select onChange={(e) => handleChangeInput(e)} name='categoria'>
                        <option>Selecione</option>
                        {categoriasSelect.map((categoria, index) =>
                            <option key={index}>{categoria}</option>
                        )}
                    </select>
                    <label>Data</label>
                    <input
                        name='data'
                        type='text'
                        value={modalFormData.data}
                        onChange={handleChangeInput}
                    ></input>
                    <label>Descrição</label>
                    <input
                        name='descricao'
                        type='text'
                        value={modalFormData.descricao}
                        onChange={handleChangeInput}
                    ></input>
                    <div className='container-btn-modal'>
                        <button>Confirmar</button>

                    </div>
                </form>
            </div>
        </div>
    )
}