require('dotenv').config()
const { inquirerMenu, pausaMenu, inputInquirer, listarLugares } = require("./helpers/inquirerMenu");
const { Busqueda } = require("./models/busqueda");

console.log(process.env);

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
                const nombreLugarSeleccionado = lugares.find( l => l.id===idLugar);
                console.log(nombreLugarSeleccionado);
                // console.log({idLugar});
                //Hacer consulta del clima en OpenWeather
                //Mostrar consulta
                console.log('Info de la ciudad');
                console.log('ID', nombreLugarSeleccionado.id);
                console.log('Nombre', nombreLugarSeleccionado.nombre);
                console.log('Latitud', nombreLugarSeleccionado.latitud);
                console.log('Longitud', nombreLugarSeleccionado.longitud);

                break;
            
            case 2: //Historial de busquedas

                break;
        
            default:
                break;
        }
    
        await pausaMenu();
        
    } while (opcionMenu !== 0);
}

main();