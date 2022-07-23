let link = document.getElementById("alert");
let linkT = document.getElementById("alertTwo");



function currentTime() {
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

function currentDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fullDate = year+"-"+month+'-'+day;
    document.getElementById('year').innerText = fullDate;
}


link.addEventListener("click", function() {
    alert("Page coming soon!");
});
linkT.addEventListener("click", function() {
    alert("Page coming soon!");
}); 


currentTime();
currentDate();

module.export = currentDate();