import './style.css'
import lixeira from '../../assets/lixeira.png'

function Home() {
  const usuarios = [
    { id: "u1", nome: "Gabriel",   email: "gabriel@email.com",  idade: 17 },
    { id: "u2", nome: "Gabriel 2", email: "gabriel2@email.com", idade: 17 },
    { id: "u3", nome: "Gabriel 3", email: "gabriel3@email.com", idade: 17 }
  ]

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
              <input className="input" name="nome"  type="text"   placeholder="Nome" />
              <input className="input" name="email" type="email"  placeholder="E-mail" />
              <input className="input" name="idade" type="number" placeholder="Idade" />
            </div>
            <div className="spacer" />
            <button type="button" className="aero-btn">Cadastrar</button>
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
                  <button className="icon-btn" title="Remover">
                    <img src={lixeira} alt="Remover" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
