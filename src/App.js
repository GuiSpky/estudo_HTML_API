import { useState } from "react";



function App() {
  const [cidade, setCidade] = useState("Umuarama")
  const [previsaoTempo, setPrevisaoTempo] = useState (null)

  const handleChange = (e) => {
    setCidade(e.target.value);
  }

  const handleShearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=9b2e5c44704e4b61a30165333232808&q=${cidade}&lang=pt`
    ).then((response) => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      setPrevisaoTempo(data)
    })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="top">
          Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique a previsão</h1>
          <p className="lead">
            Digite o nome da cidade que deseja consultar e clique em pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input 
                onChange={handleChange}
              className="form-control" value = {cidade}/>
            </div>

          </div>
          <button onClick={handleShearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          
            {previsaoTempo ? (
              <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={previsaoTempo.current.condition.icon}/>
                </div>
                <div>
                  <h3>Hoje o dia está: {previsaoTempo.current.condition.text}</h3>
                  <p className="lead">
                    Temperatura: {previsaoTempo.current.temp_c} <br/>
                    Indice uv: {previsaoTempo.current.uv}
                  </p>
                  <p className="lead">
                  </p>
                </div>
              </div>
            </div>
            ) : null
            }
        </div>
      </main>
    </div>
  );
}

export default App;
