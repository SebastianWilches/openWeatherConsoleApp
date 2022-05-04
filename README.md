Para iniciar el programa usaremos el comando npm start


Paquetes usados:
Axios: Trabaja las peticiones en bases a promesas 

MapBox: Lo usaremos para hacer la busqueda de una ciudad, arrojandonos 5 respuestas, cada una con latitud y longitud. Dentro de los query params de mapbox solo vamos a usar el de lenguaje y la key de acceso.

Se va a manejar los parametros de la consulta de mapbox a traves de las variables de entorno en un archivo de variables de entorno llamado '.env'. Para eso se usara el paquete npm de dotenv

Para comprobar que este detectando las variables de entorno correctamente podemos hacer un console.log(process.env); y tenemos que encontrar las nuevas variables definidas. (Por lo general no se suele subir este archivo a github)

Practica curso udemy