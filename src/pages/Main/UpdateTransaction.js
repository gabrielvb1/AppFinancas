import './ModalAdd.css'
import Fechar from './assets/close-modal-btn.svg'
import { useState } from 'react'
import {format} from 'date-fns'
export default function ModalUpdateTransaction({ modalFormData, setModalFormData, api, token, setModalEditTrans, transacaoId, categoriasSelect, tabela, setTabela, setExtrato, formatedDate }) {
    const [tipo, setTipo] = useState('')
    
    function handleChangeInput(e) {
        const localCategoriaId = categoriasSelect.indexOf(modalFormData.categoria) + 1
        setModalFormData({ ...modalFormData, [e.target.name]: e.target.value, categoria_id: localCategoriaId, tipo: tipo})
      console.log(modalFormData);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!modalFormData.valor || !modalFormData.categoria || !modalFormData.data || !modalFormData.descricao) {
                console.log('Preencha todos os campos!');
                return
            }
            await api.put(`/transacao/${transacaoId}`, { ...modalFormData }, { headers: { Authorization: `Bearer ${token}` } })
            const localLinha = [...tabela]
            const linhaUpdated = localLinha.find((linha) => linha.id === transacaoId)
            linhaUpdated.descricao = modalFormData.descricao
            linhaUpdated.valor = modalFormData.valor
            linhaUpdated.categoria = modalFormData.categoria
            linhaUpdated.data = modalFormData.data
            linhaUpdated.tipo = modalFormData.tipo
            linhaUpdated.categoria_nome = modalFormData.categoria
            setTabela(localLinha)
            const responseExtrato = await api.get('/transacao/extrato', { headers: { Authorization: `Bearer ${token}` } })
            setExtrato({ ...responseExtrato.data })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    function handleCloseUpdateModal() {
        setModalEditTrans(false)
        setModalFormData({ ...modalFormData, valor: '', categoria: '', data: '', descricao: '', categoria_id: 0, tipo: '' })
    }
    return (
        <div className="modal">
            <div className='modal-card'>
                <div className="top">
                    <h1>Editar Registro</h1>
                    <img src={Fechar} onClick={() => handleCloseUpdateModal()}></img>
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
                        <option>Selecionar</option>
                        {categoriasSelect.map((categoria, index) => <option key={index} value={categoria}>{categoria}</option>
                        )}
                    </select>
                    <label>Data</label>
                    <input
                        name='data'
                        type='text'
                        value={format(new Date(modalFormData.data), 'dd/MM/yyyy')}
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