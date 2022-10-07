import { LoadTransactions } from '../../utils/LoadTransactions'
import './ModalDelete.css'

export default function ModalDelete({ modalDelete, api, handleOpenDeleteModal, transacaoId, setTabela, tabela, token, setExtrato, currentItem, setTabelaLimpa }) {
    async function handleDelete() {
        try {
            await api.delete(`/transacao/${currentItem.id}`, { headers: { Authorization: `Bearer ${token}` } })
            const localLinha = [...tabela]
            const indexLinha = localLinha.findIndex((linha) => linha.id === currentItem.id)
            localLinha.splice(indexLinha, 1)
            setTabela(localLinha)
            setTabelaLimpa(localLinha)
            const responseExtrato = await api.get('/transacao/extrato', { headers: { Authorization: `Bearer ${token}` } })
            await LoadTransactions()
            setExtrato({ ...responseExtrato.data })
        } catch (error) {
            setExtrato(0)
        }
        handleOpenDeleteModal(false)
    }

  

    return (
        <>
            {modalDelete &&
                <div className='modal-delete'>
                    <p>Apagar item?</p>
                    <div className='sim-nao'>
                        <button onClick={() => handleDelete()} className='sim'>Sim</button>
                        <button onClick={() => handleOpenDeleteModal(false)} className='nao'>Não</button>
                    </div>
                </div>
            }
        </>
    )
}