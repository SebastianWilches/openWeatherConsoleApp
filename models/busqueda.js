const fs = require('fs')
const axios = require('axios').default;

class Busqueda {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerBD();
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
            return respuesta.data.features.map(lugar => {
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

    }


    parametrosOpenWeather(latitud, longitud) {
        return {
            lat: latitud,
            lon: longitud,
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'sp'
        }
    }

    async consultarClimaCoords(latitud, longitud) {
        //https://api.openweathermap.org/data/2.5/weather?lat=4.59889&lon=-74.08083&appid=b69543e3032213fcdf9c4257fadba1fc&units=metric&lang=sp

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.parametrosOpenWeather(latitud, longitud)
            });

            const respuesta = await instance.get();
            // console.log(respuesta.data);

            return {
                descripcion: respuesta.data.weather[0].description,
                temperaturaMin: respuesta.data.main.temp_min,
                temperaturaMax: respuesta.data.main.temp_max,
                temperatura: respuesta.data.main.temp
            }



        } catch (error) {
            console.log(error);
        }

    }

    agregarHistorial(lugar = '') {

        //Evitar historial repetido
        if (this.historial.includes(lugar.toLowerCase())) {
            return
        }

        this.historial = this.historial.splice(0,5); //Para que limite un historial maximo de 6 resultados

        //Guardar historial
        this.historial.unshift(lugar);

        //Guardar en persistencia
        this.guardarBD()

    }

    guardarBD() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerBD() {
        //Verificar si existe la BD
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        //En caso de existir que lea y asigne la info a una variable
        const informacionString = fs.readFileSync(this.dbPath, { encoding: 'utf-8' }) //El encoding es para use un formato unicode
        const informacion = JSON.parse(informacionString);
        const {historial} = informacion;
        this.historial = historial;
        // console.log(historial);
    }
}

module.exports = {
    Busqueda
}