require('dotenv').config()
const { inquirerMenu, pausaMenu, inputInquirer, listarLugares } = require("./helpers/inquirerMenu");
const { Busqueda } = require("./models/busqueda");

// console.log(process.env); Para mirar variables de entorno declaradas

const main = async () => {

    let opcionMenu
    const busquedas = new Busqueda()


    do {
        console.clear();
        opcionMenu = await inquirerMenu()
        switch (opcionMenu) {
            case 1: //Buscar ciudad
                //Preguntar la ciudad
                const consultaLugar = await inputInquirer('Ingrese una ciudad');

                //Hacer la consulta HTTP
                const lugares = await busquedas.ciudad(consultaLugar);

                //Seleccionar una ciudad
                const idLugar = await listarLugares(lugares);
                if(idLugar ==='0') continue; //Se sale de esta iteracion                
                const nombreLugarSeleccionado = lugares.find( l => l.id===idLugar);
                
                //Guardar en persistencia
                busquedas.agregarHistorial(nombreLugarSeleccionado.nombre);

                //Hacer consulta del clima en OpenWeather
                const clima = await busquedas.consultarClimaCoords(nombreLugarSeleccionado.latitud, nombreLugarSeleccionado.longitud);
                // console.log(clima);

                //Mostrar consulta
                console.log('\n     ', 'Info de la ciudad'.cyan.underline);
                console.log('ID: ', nombreLugarSeleccionado.id);
                console.log('Nombre: ', nombreLugarSeleccionado.nombre);
                console.log('Latitud: ', nombreLugarSeleccionado.latitud);
                console.log('Longitud: ', nombreLugarSeleccionado.longitud);
                console.log('\n     ', 'Clima de la ciudad'.cyan.underline);
                console.log('Descripcion: ', clima.descripcion);
                console.log('Temperatura Minima: ', clima.temperaturaMin);
                console.log('Temperatura Maxima: ', clima.temperaturaMax);
                console.log('Temperatura actual: ', clima.temperatura);

                break;
            
            case 2: //Historial de busquedas
                busquedas.historial.forEach((lugar, indice) => {
                    indice = `${indice+1}`.cyan;
                    console.log(`${indice}. ${lugar}`);
                })
                break;
        
            default:
                break;
        }
    
        await pausaMenu();
        
    } while (opcionMenu !== 0);
}

main();