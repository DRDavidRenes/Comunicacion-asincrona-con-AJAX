//Tarea 7 DEWC
//autor: David Renes Tejado 71270642J ®
//version: 2.0

//***************************************************************************/
//********* Comunicación asíncrona con AJAX haciendo uso de XML *************/
//***************************************************************************/




//Utilizamos una arrow function en lugar de una funcion normal para que se ejecute al cargar la página
const encontrarArtistas = () => {


    //Se crea un objeto XMLHttpRequest
    let xhr = new XMLHttpRequest();
    //Creamos la petición con el método open, indicando el método, la ruta y si es asíncrona, en este caso sí(true)
    xhr.open('GET', 'xml/cd_catalog.xml', true);

    //En caso de que la petición sea exitosa...
    xhr.onload = () => {

        //Comprobamos que la petición se haya procesado correctamente
        if (xhr.status === 200) {


            //Lee la respuesta XML y obtiene los elementos ARTIST
            let artists = xhr.responseXML.getElementsByTagName('ARTIST');
            //Y los convierte en un array
            artists = Array.from(artists);

            //Crea un fragmento y añade un elemento OPTION para cada artista
            let fragment = document.createDocumentFragment();
            //Recorre el array de artistas
            artists.forEach(artist => {
                //Crea un elemento OPTION
                let option = document.createElement('option');
                //El valor del OPTION es el contenido del elemento ARTIST
                option.value = artist.textContent;
                //El texto del OPTION es el contenido del elemento ARTIST
                option.textContent = artist.textContent;
                //Añade el OPTION al fragmento
                fragment.appendChild(option);
            });

            //Añade el fragmento al HTML.
            const select = document.getElementById('artist');
            //Vacía el select
            select.innerHTML = "";
            //Añade el fragmento
            select.appendChild(fragment);

            //Si la respuesta no es la esperada...
        } else {
            error(); //...se llama a la función error.
        }
    };

    //Si hubo un error en la petición...
    xhr.onerror = () => {
        error(); //...se llama a la función error.
    }

    //Se envía la petición con el método send
    xhr.send();
}

//Se llama en caso de que la petición no se procese correctamente.
const error = () => {

    //Crea un elemento OPTION que informa del error.
    let option = document.createElement('option');
    //El valor del OPTION es 0
    option.value = '0';
    //El texto del OPTION es "Error obteniendo artistas"
    option.textContent = 'Error obteniendo artistas';

    //Lo añade al HTML.
    const select = document.getElementById('artist');
    //Vacía el select
    select.innerHTML = "";
    //Añade el fragmento
    select.appendChild(option);
}
