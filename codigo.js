//video del que me base para hacerlo: https://www.youtube.com/watch?v=PNr8-JDMinU by Falcon Master
//Documentacion de The Movie Database (TMDB) API: https://developers.themoviedb.org/3/getting-started/introduction
//documentacion que usé en la pagina:
//Para la informacion de la lista de las peliculas mas polulares: https://developers.themoviedb.org/3/movies/get-popular-movies
//obtuve:
//1. /movie/popular -->La ruta de la lista para obtener la info de las peliculas mas polulares
//2.como poner la propiedad de la ApiKey (La api key se obtiene haciendo una solicitud en la pagina de la API creando una cuenta y llendo a la ajustes de
//la cuenta, en el panel izquierso ir a API, Pestaña Crear, Opcion Developer,Aceptar terminos, Llenar formulario,revisar notificaciones donde te llega la APIkEY
//3. El array de las peliculas donde sacaré la info de los titulos e imagenes
//4. como poner el lenguaje
//5. Como usar el numero de paginas para la paginacion

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',() => {
	if(pagina<1000){	
		pagina+=1;
		cargarPeliculas();
	}
})

btnAnterior.addEventListener('click',() => {
	if(pagina>1){
		pagina-=1;
		cargarPeliculas();
	}
})


const cargarPeliculas= async() => {
	try	{
const respuesta =  await fetch('https://api.themoviedb.org/3/movie/popular?api_key=bb2e053573349d12feaf318a6f4d32eb&language=es-MX&page='+pagina);
console.log(respuesta);



if (respuesta.status === 200) {

const datos = await respuesta.json();

let peliculas = '';
datos.results.forEach(pelicula => {
	peliculas += 
	 '<div class="pelicula"> <img class="poster" src="https://image.tmdb.org/t/p/w500/'+pelicula.poster_path+'"><h3 class="titulo">'+pelicula.title+'</h3></div>';
});
document.getElementById("contenedor").innerHTML = peliculas;
}else if (respuesta.status === 401) {
	console.log("id mal escrito");
} else if (respuesta.status === 404) {
	console.log("Pelicula no encontrada");
} else {
	console.log("error inesperado");
}
}catch(error){
	console.log(error);
}
}

cargarPeliculas();