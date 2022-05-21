let total = 0;
let tempOne = '';
let tempTwo = '';
let process = '';

//function that sets temporary numbers 
const Getnum = id => {
    if(total !== 0) {
        alert("Click ' C ' button to continue")
    } else if(process === '') {
        tempOne = id;
        document.getElementById("screen").value += id;
        return tempOne;
    } else {
        tempTwo = id;
        document.getElementById("screen").value += id;
        console.log(tempTwo);
        return tempOne;
    }
}

//function that sets the arithmetic operations
const changeProcess = value => {
    if(tempOne  !== "" && tempTwo !== "") {
        alert("Click ' = ' button to continue")
    } else {
    process = value;
    console.log(process);
    tempOne = document.getElementById("screen").value;
    document.getElementById("screen").value = "";
    console.log(tempOne);
    return process, tempOne;
    }
}

//function that does the final process
function final(type) {
    if(type === "add") {
        tempTwo = document.getElementById("screen").value;
        total = parseInt(tempOne) + parseInt(tempTwo);
        document.getElementById("screen").value = total;
        console.log(total);
    } else if(type === "subtract") {
        tempTwo = document.getElementById("screen").value;
        total = parseInt(tempOne) - parseInt(tempTwo);
        document.getElementById("screen").value = total;
        console.log(total);
    } else if(type === "multiply") {
        tempTwo = document.getElementById("screen").value;
        total = parseInt(tempOne) * parseInt(tempTwo);
        document.getElementById("screen").value = total;
        console.log(total);
    } else if(type === "divide") {
        tempTwo = document.getElementById("screen").value;
        total = parseInt(tempOne) / parseInt(tempTwo);
        document.getElementById("screen").value = total;
        console.log(total);
    }
    return total;
}

//function to reset all the variables
function reset() {
    document.getElementById("screen").value = "";
    total = 0;
    tempOne = "";
    tempTwo = ""
    process = "";
    console.log(total,tempOne,tempTwo,process);
    return tempOne, tempTwo, process, total;
}