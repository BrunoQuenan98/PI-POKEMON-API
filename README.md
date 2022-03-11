<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon


## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


La idea general es crear una aplicación en la cual se puedan ver los distintos pokemones disponibles junto con información relevante de los mismos utilizando la api externa [PokeAPI](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemones
  - Filtrarlos / Ordenarlos
  - Agregar nuevos pokemones

#### Tecnologías utilizadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

La app cuenta con:

__Pagina inicial__: Landing Page
- [ ] Imagen representativa del proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: Contiene:
- [ ] Input de búsqueda para encontrar pokemones por nombre
- [ ] Área donde se verá el listado de pokemones.
- [ ] Botones/Opciones para filtrar por género y por pokemon existente o agregado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemones por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes pokemones, 9 juegos por pagina, mostrando los primeros 12 en la primer pagina.

__Ruta de detalle de pokemon__: Contiene:
- [ ] Informacion adicional sobre cada pokemon en particular

__Ruta de creación de pokemones__: Contiene:
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Stats
- [ ] Posibilidad de seleccionar/agregar varios tipos
- [ ] Botón/Opción para crear un nuevo videojuego



#### Backend

El backend fue desarrollado en node/express y consta de las siguientes rutas:



- [ ] __GET /pokemons__:
  - Obtener un listado de los pokemones
  
- [ ] __GET /pokemons?name="..."__:
  - Obtener un listado de los pokemones que coincidan la palabra ingresada como query parameter
 
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtener el detalle de un pokemon en particular
  
- [ ] __GET /types__:
  - Obtener todos los tipos pokemons posibles
 
- [ ] __POST /pokemon__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemon por body
  - Crea un pokemon en la base de datos


#### Iniciar proyecto

- [ ] __Posicionarse en la carpeta Api, ejecutar el comando npm i y luego npm start__
- [ ] __Posicionarse en la carpeta Client, ejecutar el comando npm i y luego npm start__
