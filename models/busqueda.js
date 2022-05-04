const axios = require('axios').default;

class Busqueda {

    historial = ['Bogota', 'Medellin', 'Cartagena'];

    constructor() {

    }

    get parametrosMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es'
        }
    }


    //Peticion HTTP
    async ciudad(lugar = '') {

        //Petición http

        //Instancia axios
        const instance = axios.create({
            //Todo lo que va despues de un signo de interrogacion en una url son los parametros que reciben
            //Ejmeplo de la url original: https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?language=es&access_token=pk.eyJ1Ijoic2ViYXN0aWFud2lsY2hlczIiLCJhIjoiY2wycXZkN3NlMDFlZjNicXM4aGhyMjBiOSJ9.EYCh0yMiVpmL7geIMRURLQ


            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.parametrosMapBox
        })

        try {
            const respuesta = await instance.get();
            // console.log(respuesta.data.features);
            return respuesta.data.features.map( lugar => {
                return {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    latitud: lugar.center[1],
                    longitud: lugar.center[0]
                }
            })

        } catch (error) {
            console.log(error);
        }

        return []; //Aqui vamos a retornar todas las coincidencias de la peticion hecha por http
    }
}

module.exports = {
    Busqueda
}