import './style.css'
import lixeira from '../../assets/lixeira.png'
import editar from '../../assets/editar.png'
import api from '../../services/api'
import AtualizarUsuario from './AtualizarUsuario';
import { useEffect, useState , useRef } from 'react';

function Home() {

  const inputNome = useRef();
  const inputEmail = useRef();
  const inputIdade = useRef();

  const[usuarios, setUsuarios] = useState([]);

  const [usuarioEditando, setUsuarioEditando] = useState(null)

  async function getUsuarios(){
    const usuariosDaApi = await api.get('/usuarios');
    setUsuarios(usuariosDaApi.data);
    console.log(usuarios);
  }

  async function createUsuario(){
    await api.post('/cadastro', {
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value
      }
    )
    getUsuarios();
  }

  async function deleteUsuario(id){
    await api.delete(`deletar/${id}`);
    getUsuarios();
  }

  useEffect(()=> {
    getUsuarios()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="aero-bg" />
      <div className="container">
        <div className="header">
          <div className="logo-bubble" />
          <h1>Cadastro de Usuários</h1>
        </div>

        <div className="grid">
          <form className="card form-card">
            <h2>Preencha os dados</h2>
            <div className="input-group">
              <input className="input" name="nome"  type="text"   placeholder="Nome" ref={inputNome}/>
              <input className="input" name="email" type="email"  placeholder="E-mail" ref={inputEmail}/>
              <input className="input" name="idade" type="number" placeholder="Idade" ref={inputIdade}/>
            </div>
            <div className="spacer" />
            <button type="button" className="aero-btn" onClick={createUsuario}>Cadastrar</button>
          </form>

          <section className="card list-card">
            <p className="section-title">Usuários cadastrados</p>
            <div className="users">
              {usuarios.map((usuario) => (
                <div className="user" key={usuario.id}>
                  <div>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Idade:</strong> {usuario.idade}</p>
                  </div>
                  <div>
                    <button className="icon-btn" title="Remover" onClick={ () => deleteUsuario(usuario.id)}>
                      <img src={lixeira} alt="Remover" />
                    </button>
                    <button className="icon-btn-blue" title="Atualizar" onClick={() => setUsuarioEditando(usuario)}>
                      <img src={editar} alt="Atualizar" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {usuarioEditando && (
        <AtualizarUsuario
          usuarioSelecionado={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onUpdate={getUsuarios}
        />
      )}
    </>
  )
}

export default Home
