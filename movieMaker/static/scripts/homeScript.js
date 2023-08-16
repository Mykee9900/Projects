// API details for the call
const apiKey = '32c916598f40cad073bf3b001cc6bc90';
const url = 'https://api.themoviedb.org/3';
const originalUrl = "https://image.tmdb.org/t/p/original";



// API request to get user data from the databse
const fetchUserData = async () => {
    try {
        const response = await fetch('/get_user_data');
        if(response.ok){
            const userData = await response.json();
            console.log(userData)
            favMovie = userData.favMovies;
            return favMovie;
        }
    } catch(error){
        console.log(error)
    }
}


//API request to search movies
const searchMovie = async () => {
    console.log("In the search movie function");
    // creating the search values for url
    let searchTitle = document.getElementById("search");
    let searchInfo = searchTitle.value;

    // API URL
    const searchPoint = "/search/movie";
    let params = `?query=${encodeURIComponent(searchInfo)}&api_key=${apiKey}`;
    const urlToFetch = `${url}${searchPoint}${params}`

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doing response");
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            movieResults(jsonResponse);
        }
    }
    catch(error){
        console.log(error)
    }
}
// Function that display movie reults in the search input
const movieResults = (data) => {
    const mainBox = document.getElementById("results");
    mainBox.innerHTML = "";
    console.log("in the movie results");
    console.log(data);
    let array = data.results;

    for(let i=0; i < array.length; i++){
        // creating a div to display movies
        let resultDiv = document.createElement("div");
        let img = document.createElement("img");
        let posterPath = array[i].poster_path;
        let fullPosterPath = `${originalUrl}${posterPath}`;



        img.src = fullPosterPath
        img.alt = "There is no poster for this movie";
        let title = document.createElement("p");
        title.innerHTML = array[i].title;
        let link = document.createElement('a');
        let id = array[i].id;
        link.href = `/movie/${encodeURIComponent(id)}`;
        link.target = "_blank";

       let favLink = document.createElement("a");
       let favBtn = document.createElement("button");
       let data = title.innerHTML
       favBtn.innerHTML = "Add to favorites";
       favLink.href = `/favMovie/${encodeURIComponent(data)}`;
       favLink.appendChild(favBtn);

        link.appendChild(img)
        resultDiv.appendChild(link);
        resultDiv.appendChild(title);
        resultDiv.appendChild(favLink);
        mainBox.appendChild(resultDiv);
    }

    
}

//APIS for genres list 
const genreListComedy = async () => {
    console.log("doing the genre response");
    const searchPoint = "/discover/movie";
    let params = `?with_genres=35&api_key=${apiKey}`;
    const urlToFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doig response");
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            list(jsonResponse);
        }
    } catch(error){
        console.log(error);
    }

}

const genreListAction = async () => {
    console.log("doing the genre response");
    const searchPoint = "/discover/movie";
    let params = `?with_genres=28&api_key=${apiKey}`;
    const urlToFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doig response");
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            list(jsonResponse);
        }
    } catch(error){
        console.log(error);
    }

}

const genreListAnimation = async () => {
    console.log("doing the genre response");
    const searchPoint = "/discover/movie";
    let params = `?with_genres=16&api_key=${apiKey}`;
    const urlToFetch = `${url}${searchPoint}${params}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            console.log("doig response");
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            list(jsonResponse);
        }
    } catch(error){
        console.log(error);
    }

}

// Getting data from user to look up movies that are liked
let userLikedMov;
fetchUserData().then(userLikedMovies => {
    userLikedMov = userLikedMovies;
    console.log("here are the movies----", userLikedMov);
    genreListComedy();
    genreListAction();
    genreListAnimation();
}).catch(error => {
    console.log(error)
});


// function to show list of movies
const list = (data) => {
    console.log("in the list function");
    const homeList = document.getElementById("genreList");
    const homeList2 = document.getElementById("action");
    const homeList3 = document.getElementById("animation");

    //creating movie list elements
    let array = data.results;


    for(let i=0; i < array.length; i++){
        // filtering the reults by genre
        if(array[i].genre_ids.includes(35))
        {
            // check if the movie is favorited by the user
            let isFavorited = userLikedMov.includes(array[i].title);
            // Creating a div to display movies
            let resultDiv = document.createElement("div");
            let img = document.createElement("img");
            let posterPath = array[i].poster_path;
            let fullPosterPath = `${originalUrl}${posterPath}`;
            img.src = fullPosterPath
            img.alt = "There is no picture for this movie."
            let title = document.createElement("p");
            title.innerHTML = array[i].title;
            let link = document.createElement('a');
            let id = array[i].id;
            link.href = `/movie/${encodeURIComponent(id)}`;
            link.target = "_blank";
            link.appendChild(img)

               // Create the "Favorite" or "Unfavorite" button based on the isFavorited status
            let favLink = document.createElement("a");
            let favBtn = document.createElement("button");
            let data = title.innerHTML;

            if(isFavorited){
                favBtn.innerHTML = "Unfavorite";
                favLink.href = `/delete/${encodeURIComponent(data)}`;
            } else {
                favBtn.innerHTML = "Add to favorites";
                favLink.href = `/favMovie/${encodeURIComponent(data)}`;
            }

            
            favLink.appendChild(favBtn);
            resultDiv.appendChild(favLink)
            resultDiv.appendChild(link);
            resultDiv.appendChild(title);
            homeList.appendChild(resultDiv);
        }
        else if(array[i].genre_ids.includes(28)){
            let isFavorited = userLikedMov.includes(array[i].title);

            let resultDiv = document.createElement("div");
            let img = document.createElement("img");
            let posterPath = array[i].poster_path;
            let fullPosterPath = `${originalUrl}${posterPath}`;
            img.src = fullPosterPath
            img.alt = "There is no picture for this movie."
            let title = document.createElement("p");
            title.innerHTML = array[i].title;
            let link = document.createElement('a');
            let id = array[i].id;
            link.href = `/movie/${encodeURIComponent(id)}`;
            link.target = "_blank";
            link.appendChild(img)

            // Create the "Favorite" or "Unfavorite" button based on the isFavorited status
            let favLink = document.createElement("a");
            let favBtn = document.createElement("button");
            let data = title.innerHTML;

            if(isFavorited){
                favBtn.innerHTML = "Unfavorite";
                favLink.href = `/delete/${encodeURIComponent(data)}`;
            } else {
                favBtn.innerHTML = "Add to favorites";
                favLink.href = `/favMovie/${encodeURIComponent(data)}`;
            }

            favLink.appendChild(favBtn);
            resultDiv.appendChild(favLink)
            resultDiv.appendChild(link);
            resultDiv.appendChild(title);
            homeList2.appendChild(resultDiv);
        }
        else if(array[i].genre_ids.includes(16)){
            let isFavorited = userLikedMov.includes(array[i].title);

            let resultDiv = document.createElement("div");
            let img = document.createElement("img");
            let posterPath = array[i].poster_path;
            let fullPosterPath = `${originalUrl}${posterPath}`;
            img.src = fullPosterPath
            img.alt = "There is no picture for this movie."
            let title = document.createElement("p");
            title.innerHTML = array[i].title;
            let link = document.createElement('a');
            let id = array[i].id;
            link.href = `/movie/${encodeURIComponent(id)}`;
            link.target = "_blank";
            link.appendChild(img)

            // Create the "Favorite" or "Unfavorite" button based on the isFavorited status
            let favLink = document.createElement("a");
            let favBtn = document.createElement("button");
            let data = title.innerHTML;

            if(isFavorited){
                favBtn.innerHTML = "Unfavorite";
                favLink.href = `/delete/${encodeURIComponent(data)}`;
            } else {
                favBtn.innerHTML = "Add to favorites";
                favLink.href = `/favMovie/${encodeURIComponent(data)}`;
            }



            favLink.appendChild(favBtn);
            resultDiv.appendChild(favLink)
            resultDiv.appendChild(link);
            resultDiv.appendChild(title);
            homeList3.appendChild(resultDiv);
        }
    }

}

//function for image upload 
const profileUpload = document.getElementById("imageInput");
const profilePicture = document.getElementById("profilePicture");

profileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const imageURL = URL.createObjectURL(file);
        profilePicture.src = imageURL;
    }
})




