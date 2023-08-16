// For the Api request
const apiKey = '32c916598f40cad073bf3b001cc6bc90';
const url = 'https://api.themoviedb.org/3';
const originalUrl = "https://image.tmdb.org/t/p/original";

// function for time and date
export function currentTime() {
    let date = new Date(); 
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let session = "AM";

    if(hour === 0){
        hour = 12;
    }
    if(hour > 12){
        hour = hour - 12;
        session = "PM";
    }

    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;
    
    let time = hour + ":" + minute + ":" + second + " " + session;

    document.getElementById("time").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
}

export function currentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fullDate = year+"-"+month+'-'+day;
    document.getElementById('year').innerText = fullDate;
}


// For the data and movie information
let dataArray;
let matchedId

// making the API request
    const popMoviList = async () => {
        console.log("API request for popular movie list started");
        // API URL variables
        let searchPoint = "/movie/popular";
        let params = `?api_key=${apiKey}`;
        let urlToFetch = `${url}${searchPoint}${params}`;
    
        try {
            const response = await fetch(urlToFetch);
            if(response.ok){
                console.log("doing response");
                let jsonResponse = await response.json();
                let data = jsonResponse.results;
                console.log(data);
                showResults(data);
    
            }
        } catch(error) {
                        console.log(error);
                    }
                
                }

// Function to show popular movie list results
const showResults = (data) => {
        const movieBoxone = document.getElementById("subMoviebox");
        console.log("in the api results function")
    
        movieBoxone.innerHTML = "";
    
        // looping through to create html elements from the api
            data.forEach(item => {
                const resultDiv = document.createElement("div");
                const imgPoster = document.createElement('img');
                const movTitle = document.createElement('h1');
                const movDate = document.createElement("p");
                const link = document.createElement("a");
    // assigning elemets their content
                link.textContent = item.title;
                link.classList.add("movieLink");
                link.href = `/movie/${encodeURIComponent(item.id)}`;
                link.target = '_blank';
                let posterPath = item.poster_path;
                let  fullPosterPath = `${originalUrl}${posterPath}`;
                imgPoster.src = fullPosterPath;

        // functions and appending elements
                    link.onclick = () => matchMovie(item.id);
                    resultDiv.appendChild(movDate);
                    resultDiv.appendChild(imgPoster);
                    resultDiv.appendChild(movTitle);
                    movTitle.appendChild(link);
                    movieBoxone.appendChild(resultDiv);
            });

            dataArray = data.map(item => item.id);
            console.log(dataArray+ "here are the ids");   
};
                
// function to find the movie and send it 
const matchMovie = (id) => {
    for(let i=0; i<dataArray.length; i++){
        if(id == dataArray[i]){
            console.log("matched");
            matchedId = id;
            console.log(id);
        }
    }

}    
// // used to start the API call
if(document.title === "Movie Page Index"){
    document.addEventListener("DOMContentLoaded", () => {
        popMoviList();
    })
};

currentTime();
currentDate();
