const apiKey = 'ed6226552f7a4cd0a8fdc122bf11c329';
const url = 'https://api.themoviedb.org/3';
let listMovies = document.getElementById("movies");
let call = document.getElementById("button");
let popMovies = [];
let genList = document.getElementById("gen");


//function to search movies
call.addEventListener("click", async function() {
    if(genList.style.display == "block") {
        genList.style.display = "none";
        call.innerText = "Search"
    } else {
        var searchPoint = '/genre/movie/list';
        var params = `?api_key=${apiKey}`;
        var urltoFetch = `${url}${searchPoint}${params}`;
        try {
            const response = await fetch(urltoFetch);
            let add = document.getElementById("search");
            if(response.ok){
            let jsonResponse = await response.json();
            let genres = jsonResponse.genres;
            console.log(genres.length);
            for(var i=0; i<genres.length; i++) {
                let para = document.createElement("p");
                genList.appendChild(para);
                para.innerText = genres[i].name;
                genList.style.display = "block";
                console.log(genres[i]);
                console.log(genres[i].name);
            }
            call.innerText = "hide";
            return genres;
            }
        } catch (error) {
            console.log(error)
        }}
    });

const popular = async () => {
    console.log("yes");
    var searchPoint = '/movie/popular';
    var params = `?api_key=${apiKey}`;
    var urltoFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urltoFetch);
        if(response.ok){
            console.log("doing response");
            let jsonResponse = await response.json();
            let length = jsonResponse.results;
            for(var i =0; i<length.length; i++) {
                popMovies.push(length[i].title)
                let para = document.createElement("li");
                listMovies.children[i].insertAdjacentElement("afterend", para);
                //document.body.appendChild(para);
                para.innerText = popMovies[i];
            }
            JSON.stringify(popMovies);
            return popMovies;
        }
        } catch(error) {
            console.log(error)
    }
};

popular();

console.log(popMovies);
console.log(listMovies);