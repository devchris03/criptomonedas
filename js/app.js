// --------------------- EVENTOS ---------------------

window.addEventListener('load', () => {
    consultCriptonedas()
})

// --------------------- FUNCIONES ---------------------

// obtener getCriptomonedas
const getCriptomonedas = criptomonedas => new Promise (resolve => {
    resolve(criptomonedas)
})

// consultar tipos de criptomonedas
function consultCriptonedas() {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

    fetch(url)
        .then(result => result.json())
        .then(result => getCriptomonedas(result.Data))
        .then(criptomonedas => showCriptomonedas(criptomonedas))
}

// muestra criptomonedas
function showCriptomonedas(criptomonedas) {
    
}