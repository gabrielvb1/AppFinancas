import './Filtro.css'
import Adicionar from './assets/add.svg'
import { useState } from 'react'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
export default function Filtro({ categoriasSelect, tabela, setTabela }) {
    const token = getItem('token')
    const [localCategoria, setLocalCategoria] = useState('')
    function getLocalCategoria(localCategoria) {
        setLocalCategoria(localCategoria)
    }

    function handleFiltroPorCategoria() {
        if (!localCategoria) {
            return
        }
        const localLinha = [...tabela]

        const categoriaUpdated = localLinha.filter((linha) => {
            return linha.categoria_nome === localCategoria
        })
        if (categoriaUpdated.length < 1) {
            return
        }
        return setTabela(categoriaUpdated)
    }

    async function limparFiltro() {
        const { data } = await api.get('/transacao', { headers: { Authorization: `Bearer ${token}` } })
        setTabela([...data])
    }

    return (
        <div className='container-filtro'>
            <span>Categoria</span>
            <div className='primeira-linha'>
                {categoriasSelect.map((categoria, index) =>

                    <div key={index} className='cada-categoria' onClick={() => getLocalCategoria(categoria)}>
                        <p>{categoria}</p>
                        <img src={Adicionar} alt='add-button'></img>
                    </div>
                )}
            </div>
            <div className='div-btns-filtro'>
                <button onClick={() => limparFiltro()}>Limpar Filtros</button>
                <button onClick={() => handleFiltroPorCategoria()} className='aplicar-filtro'>Aplicar Filtros</button>
            </div>
        </div>
    )

}