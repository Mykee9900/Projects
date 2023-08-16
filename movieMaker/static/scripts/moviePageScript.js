// importing time function from the main script
import { currentDate, currentTime } from "./script.js";
//API request for movie details
const apiKey = '32c916598f40cad073bf3b001cc6bc90';
const url = 'https://api.themoviedb.org/3';
const originalUrl = "https://image.tmdb.org/t/p/original";

// Assigning movie variables
let movie = document.getElementById("movId");
let movieId = movie.textContent;

// making the api request
const movieDetails = async () => {
    console.log("Making the API request for movie details");
    
    let searchPoint = "/movie/"+movieId;
    let params = `?api_key=${apiKey}`;
    let urlToFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doing response");
            let jsonResponse = await response.json();
            let data = jsonResponse;
            createMovie(data);
        }
    } catch(error){
        console.log(error);
    }
}

//API request for video 
const movVideo = async () => {
    console.log("Making API request for movie video");

    let searchPoint = "/movie/"+movieId+"/videos";
    let params = `?api_key=${apiKey}&language=en-US `;
    let urlToFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doing response");
            let data = await response.json();
            console.log(data);
            createVideo(data);
        }
    } catch(error){
        console.log(error);
    }
}

// function to create movie elements
const createMovie = (data) => {
    const movBox = document.getElementById("movieBox");
    movBox.innerHTML = ""

    // Creating the movie details elements
    const parentDiv = document.createElement("div");
    const movTitle = document.createElement('h3');
    const movImg = document.createElement('img');
    const posterPath = data.poster_path;
    const fullPosterPath = `${originalUrl}${posterPath}`;
    const movInfo = document.createElement("p");

    movTitle.innerHTML = "Movie Title: "+data.title;
    movImg.src = fullPosterPath;
    movInfo.innerHTML = "Description: "+data.overview;

    parentDiv.appendChild(movTitle);
    parentDiv.appendChild(movImg);
    parentDiv.appendChild(movInfo);
    movBox.appendChild(parentDiv);

    //creating classes for elements
    parentDiv.classList.add("movDetails");
    movInfo.classList.add("moveInfo");

    
}
// function to set up video trailer
const createVideo = (data) => {
    console.log("in the create video function");
    let id = data.id;
    let videoUrl = getVideoUrlById(data);
    console.log("here is the "+ videoUrl);

    let trailer = document.getElementById("youtube");
    trailer.src = videoUrl;
}
// function to find videoURL
const getVideoUrlById = (response) => {
    console.log("in get video function");
    const videos = response.results;
    for (const video of videos) {
        if (video.type === "Trailer") {
        // Assuming the site is "YouTube," construct the video URL
        const videoUrl = `https://www.youtube.com/embed/${video.key}`;
        console.log(videoUrl);
        return videoUrl;
        }
    }
    return null;
};


movieDetails();
movVideo();
currentDate()
currentTime()