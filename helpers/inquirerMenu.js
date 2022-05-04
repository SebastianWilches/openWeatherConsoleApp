const inquirer = require('inquirer');
const colors = require('colors');




const inquirerMenu = async () => {
    
    const preguntasMenu = [
        {
            type: 'list',
            name: 'opcionMenu',
            message: '¿Que desea hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.cyan} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.cyan} Historial de busquedas`
                },
                {
                    value: 0,
                    name: `${'0.'.cyan} Salir`
                }
            ]
        }
    ];

    console.log('=============================='.brightMagenta);
    console.log('       OPEN WEATHER APP       '.bold);
    console.log('=============================='.brightMagenta);

    //Uso deestructuración para que no devuleva el objeto completo
    const { opcionMenu } = await inquirer.prompt(preguntasMenu);
    // console.log(opcion);
    return opcionMenu;

}


const pausaMenu = async () => {
    console.log('');
    const pausa = await inquirer.prompt([
        {
            type: 'input',
            name: 'pausaMenu',
            message: `Presione ${'enter'.green} para continuar`
        }
    ])
}

const inputInquirer = async (mensaje) => {
    const parametrosInquirer = [
        {
            type: 'input',
            name: 'inputUser',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { inputUser } = await inquirer.prompt(parametrosInquirer);
    return inputUser;


}


const listarLugares = async (lugares = []) => { //Mostrara las opciones de lugares

    const choicesLugar = lugares.map((lugar, indice) => {
        const corrimientoIndice = indice + 1;


        return {
            value: lugar.id,
            name: `${colors.red(corrimientoIndice)}${'.'.red} ${lugar.nombre}`
        }

    });

    choicesLugar.unshift({
        value: '0',
        name: `${colors.red('0')}${'.'.red} ${'Cancelar'}`
    })

    // console.log(choicesLugar);

    const preguntasBuscar = [
        {
            type: 'list',
            name: 'idLugar',
            message: 'Seleccione el lugar:',
            choices: choicesLugar
        }
    ];

    const { idLugar } = await inquirer.prompt(preguntasBuscar);
    return idLugar;
}

const listadoCheckTareas = async (tareas = []) => { //Mostrara las opciones de tareas a borrar

    const choicesDelete = tareas.map((tarea, indice) => {
        const corrimientoIndice = indice + 1;


        return {
            value: tarea.id,
            name: `${colors.cyan(corrimientoIndice)}${'.'.cyan} ${tarea.descripcion}`,
            checked: (tarea.completada) ? true : false
        }

    });


    console.log(choicesDelete);

    const preguntasDelete = [
        {
            type: 'checkbox',
            name: 'idsLista',
            message: 'Borrar tarea',
            choices: choicesDelete
        }
    ];

    const { idsLista } = await inquirer.prompt(preguntasDelete);
    return idsLista;
}

const confirmarAccion = async (mensaje) => {
    const preguntaConfirmar = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ]

    const { ok } = await inquirer.prompt(preguntaConfirmar);
    return ok;
}


module.exports = {
    inquirerMenu,
    pausaMenu,
    inputInquirer,
    listarLugares,
    confirmarAccion,
    listadoCheckTareas
}