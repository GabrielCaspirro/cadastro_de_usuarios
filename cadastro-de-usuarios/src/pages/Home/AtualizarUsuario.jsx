import './style.css'
import api from '../../services/api'
import { useRef, useEffect } from 'react'

function AtualizarUsuario({ usuarioSelecionado, onClose, onUpdate }) {

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  useEffect(() => {
    if (usuarioSelecionado) {
      inputNome.current.value = usuarioSelecionado.nome
      inputEmail.current.value = usuarioSelecionado.email
      inputIdade.current.value = usuarioSelecionado.idade
    }
  }, [usuarioSelecionado])

  async function atualizarUsuario() {
    await api.put(`/atualizar/${usuarioSelecionado.id}`, {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      idade: inputIdade.current.value
    })
    onUpdate()   
    onClose()    
  }

  return (
    <div className="overlay">
      <div className="update-card">
        <h2>Atualizar Usuário</h2>
        <div className="input-group">
          <input className="input" type="text"   placeholder="Nome"  ref={inputNome} />
          <input className="input" type="email" placeholder="E-mail" ref={inputEmail} />
          <input className="input" type="number" placeholder="Idade" ref={inputIdade} />
        </div>
        <div className="spacer" />
        <div className="btn-group">
          <button type="button" className="aero-btn" onClick={atualizarUsuario}>Salvar</button>
          <button type="button" className="aero-btn-red" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default AtualizarUsuario
