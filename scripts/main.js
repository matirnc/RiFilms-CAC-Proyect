API_WEB = 'https://api.themoviedb.org/3'
IMG_PREFIX = 'https://image.tmdb.org/t/p/w500/'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTA1MDJkZGIxMjVlMTdjMGU1OTBhNmJlZTQxYTM5ZCIsInN1YiI6IjY2MmVmMTNmN2Q1ZGI1MDEyOTNlNDlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ddbmsv-zvoIEzs1u0ghE0LE8J1dTYsLVBxa2dqBFyI'
    }
};

const lugares = {
    popular: "popular",
    topRated: "top_rated",
    upcoming: "upcoming"
}

document.addEventListener("DOMContentLoaded", ()=>{
    armarCarouselsPeliculas("carouselsContainer", lugares.topRated, 2, true)
    armarCarouselsPeliculas("carteleraCarousel", lugares.upcoming, null)
    armarTendencias()
})


const armarCarouselsPeliculas = async (carouselID, lugar, page = null, duplicado = false) => {
    if ( !carouselID || lugar == "") {
        return
    }
    let response;
    if ( !page ){
        response = await fetch(`${API_WEB}/movie/${lugar}`, options).then(response => response.json()).catch(err => console.error(err))
    }
    else{
        response = await fetch(`${API_WEB}/movie/${lugar}?page=${page}`, options).then(response => response.json()).catch(err => console.error(err))
    }

    const peliculas = response.results
    const carouselsContainer = document.getElementById(carouselID)
    const carouselsArray = Array.from(carouselsContainer.children)

    for (let i = 0; i < carouselsArray.length; i++) {
        const div = document.createElement("div")
        for (let j = 0; j < peliculas.length; j++) {
            const img = document.createElement("img")
            img.src = `${IMG_PREFIX}${peliculas[j].poster_path}`
            img.alt = peliculas[j].title
            img.loading = "lazy"

            div.appendChild(img)
        }
        carouselsArray[i].appendChild(div)
        if(duplicado){
            let divCopy = div.cloneNode(true)
            carouselsArray[i].appendChild(divCopy)
        }
    }
}



const armarTendencias = async (page = 1) => {
    const response = await fetch(`${API_WEB}/movie/popular?page=${page}`, options).then(response => response.json()).catch(err => console.error(err))
    const peliculas = response.results
    const tendenciasContainer = document.querySelector(".tendenciasContainer")

    tendenciasContainer.innerHTML = "";

    peliculas.forEach((pelicula)=>{
        const contenedorPelicula = document.createElement("div")
        const tituloPelicula = document.createElement("h4")
        const imgPelicula = document.createElement("img")

        tituloPelicula.textContent = pelicula.title
        imgPelicula.src = `${IMG_PREFIX}${pelicula.poster_path}`

        contenedorPelicula.appendChild(imgPelicula)
        contenedorPelicula.appendChild(tituloPelicula)
        tendenciasContainer.appendChild(contenedorPelicula)
    })
}


function openNav(){
    document.getElementById("mobile-menu").style.width = "100%"
}
function closeNav(){
    document.getElementById("mobile-menu").style.width = "0%"
}