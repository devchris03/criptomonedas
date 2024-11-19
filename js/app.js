// --------------------- SELECTORES ---------------------
const selectCriptomoneda = document.querySelector('#criptomoneda');
const selectMoneda = document.querySelector('#moneda');
const form = document.querySelector('#form');
const details = document.querySelector('#details');

// --------------------- VARIABLES ---------------------
const objSelect = {
    moneda: '',
    criptomoneda: ''
}

// --------------------- EVENTOS ---------------------

window.addEventListener('load', () => {
    consultCriptonedas();
    selectCriptomoneda.addEventListener('change', readValue);
    selectMoneda.addEventListener('change', readValue);
    form.addEventListener('submit', submitForm);
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
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;

        selectCriptomoneda.appendChild(option)
    })
}


// lee valor del select
function readValue(event) {
    objSelect[event.target.name] = event.target.value;
}


// valida formulario
function submitForm(event) {
    event.preventDefault();

    const {moneda, criptomoneda} = objSelect;

    if(moneda === '' || criptomoneda === '') {
        showAlert('Ambos campos son obligatorios');
    };

    consultAPI()
}


// consulta API
function consultAPI() {
    const {moneda, criptomoneda} = objSelect;

    const urlAPI = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    fetch(urlAPI)
        .then(result => result.json())
        .then(result => showResult(result.DISPLAY[criptomoneda][moneda]))
}


// muestra información
function showResult(result) {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = result;

    const price = document.createElement('P');
    price.innerHTML = `El precio es: <span>${PRICE}</span>`;
    
    const higDay = document.createElement('P');
    higDay.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;
    
    const lowDay = document.createElement('P');
    lowDay.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;
    
    const change = document.createElement('P');
    change.innerHTML = `Varición últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;
    
    const lastUpdate = document.createElement('P');
    lastUpdate.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

    details.append(price, higDay, lowDay, change, lastUpdate)
}


// muestra alerta
function showAlert(msg) {
    if(!document.querySelector('.error')) {
        const error = document.createElement('P');
        error.textContent = msg;
        error.classList.add('error');

        form.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 3000)
    }
}

