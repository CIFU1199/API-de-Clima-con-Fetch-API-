const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('click', buscarClima);
})

function buscarClima (e) {
    e.preventDefault();

    // Validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;   
    
    if(ciudad === ''|| pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return; 
    }
    //Consultar la API
    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje){
    
   //crear una alerta 

   const alerta = document.querySelector('.bg-red-100'); 

   if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md','mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 3000);
   }
    
   

   
}


function consultarAPI(ciudad ,pais){
    const appID = '56f13bbd5293af42eda51c5d6e9d4532';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    fetch(url)
        .then( respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return;
            } 
            
            //imprime la respuesta en el html 
            mostrarClima(datos);
        }) 
}

function mostrarClima(datos){
    const {name , main: {temp , temp_max , temp_min}} = datos;

    const celcius = kelvinACentigrados(temp);
    const CMax = kelvinACentigrados(temp_max);
    const CMin = kelvinACentigrados(temp_min);
    const NombreCiudad = document.createElement('p');
    NombreCiudad.textContent(`Clima en: ${name}`);
    NombreCiudad.classList.add('font-bold','text-6xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${celcius} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${CMax} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${CMin} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(NombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
    
   
}

const kelvinACentigrados = grados => parseInt(grados-273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}