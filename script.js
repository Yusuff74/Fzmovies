const searchInput = document.querySelector('.search')
const searchBtn = document.getElementById('search-result')
const resultTemplate = document.getElementById('result-template')
const resultDiv = document.querySelector('.result-div')
const searchedMovie = document.querySelector('.searched-movie')
const movieResultSection = document.querySelector('[data-result]')

const getMovieApi = (movieName) => {
    const ApiKey = 'aaa4d1ad021dbd551a7d97aeb157c77e'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${movieName}`
    fetch(url)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        parseMovie(data)
    })
}

 

    const movieName = searchBtn.onclick = () => {
        document.querySelector('.result-html').style.display = 'block'
        document.querySelector('.main-html').style.display = 'none'
        movieText = searchInput.value
        getMovieApi(movieText)
    }

    const selectedValues = ['overview', 'poster_path', 'release_date', 'title']
    const extractedValues = []

    const parseMovie = (data) => {
       for (const result of data.results){
        const extractedObj = {}
        for (const [key, value] of Object.entries(result)){
            if(selectedValues.includes(key)){
                extractedObj[key] = value
            }
        }
        extractedValues.push(extractedObj)
       }
           console.log(extractedValues)
           searchInput.addEventListener('input', () =>{
            if (searchInput.value == '') {
                extractedValues.length = 0
            }
           })
           const movieTitle = searchInput.value
           movieResultSection.innerHTML = ''

           if (movieTitle.length > 0 ) {
            extractedValues.forEach(info => {

                    const element = resultTemplate.content.cloneNode(true)
    
                    element.querySelector('[data-movie-name]').textContent = info.title
                    element.querySelector('[data-date]').textContent = `(${info.release_date})`
                    element.querySelector('[data-overview]').textContent = info.overview
                    element.querySelector('[data-a-template]').href = info.poster_path
                    element.querySelector('[data-image-template]').src = `https://image.tmdb.org/t/p/w500/${info.poster_path}`
                    element.querySelector('[data-right-a-template]').href = info.poster_path
                    
                        
                    movieResultSection.append(element)
               })
           
        } else {
            movieResultSection.innerHTML = `<h1 style="color: red; font-size: 1rem; text-align: center;">No matching Video</h1>`
            console.log('no matching video')
        } 
        searchedMovie.textContent = searchInput.value
    }
