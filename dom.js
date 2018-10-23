
var data = "{}";

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        let obj = JSON.parse(this.responseText);
        console.log(obj.results);
    }
});

xhr.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=pirates&language=en-US&api_key=5d8bd24ef078f4f56af491d103b406d9");

xhr.send(data);


//feching data
const movieNameInput = document.getElementById('movie-name');   //input element
const searchButton = document.getElementById('search-btn');     //submit button
const form = document.getElementById('search-movie-form');
const text = document.getElementById('p1');
const favorite = document.getElementById("favourites");
favorite.style.display = "none";
form.addEventListener('submit', searchMovie);
function searchMovie(e) {
    e.preventDefault();
    const movieName = movieNameInput.value;
    console.log(movieName);
    fetch('http://api.themoviedb.org/3/search/movie?query=' + movieName + '&api_key=5d8bd24ef078f4f56af491d103b406d9')
        .then((resp) => resp.json())
        .then(obj => {
            text.innerHTML = "";
            for (i = 0; i < obj.results.length; i++) {
                console.log(obj.results[i].title);
                const movies = obj.results[i].title;
                span = document.createElement("span");
                span.innerHTML = obj.results[i].title + "<hr/><br/>";
                division = document.createElement("div");
                division.className = 'col-md-3 col-sm-3 col-lg-3 col-xs-3 divMovie';
                // division.innerHTML = "movie";
               

                btn = document.createElement('button');
                btn.innerText = "Add to favourites";

                btn.id = "botton"
                var styleButton = "float: right; margin-left: 10px; margin-right: 490px; color:black ; background-color:grey;"
                btn.setAttribute('style', styleButton);
                // btn.setAttribute('onclick', addFavourite(movies));
                text.appendChild(division);
                // text.appendChild(span);
                text.appendChild(btn);
                text.appendChild(span);
                // p=document.createElement("h3");
                // p.innerHTML="My favourites";
                btn.addEventListener('click', (e) => {

                    addFavourite(movies, i++)
                });
            }

        });
}

//adding favourites to local storage.
// const text1 = document.getElementById('p2');
function addFavourite(movie, j) {
    // searchMovie();


    localStorage.setItem('movieName' + j, movie);
    // console.log(j);
    console.log(movie);
    //e.preventDefault();
    // getitem=localStorage.getItem('movieName'+j);

}

//getting the favourites to local storage.
const favbutton = document.getElementById('p2');
favbutton.addEventListener("click", toggleButton);
function displayMovies(e) {
    //e.preventDefault();
    favorite.innerHTML = "";
    arr = new Array();
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        arr[i] = localStorage.getItem(key);

    }
    console.log(arr);
    list = duplicateMovie(arr);
    list.sort();
    for (var i = 0; i < list.length; i++) {
        // var key=localStorage.key(i);
        // var value=localStorage.getItem(key);
        span = document.createElement("span");
        span.innerHTML = "<br/>" + list[i] + "<br/><hr/>"
        var styleButton = "color:blue ;font-style:italic; display:center";
        span.setAttribute('style', styleButton);
        // favorite.appendChild(p);
        favorite.appendChild(span);
    }
}

function duplicateMovie(arr) {
    let unique_array = []

    for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}
// function searchMovie(e){
//     let list=localStorage.getItem('movieName');
//     console.log(list);
// }

function toggleButton(e) {
    // e.preventDefault();
    if (favorite.style.display == "none") {
        favorite.style.display = "block";
        displayMovies();
    }
    else {
        favorite.style.display = "none";
    }
}
