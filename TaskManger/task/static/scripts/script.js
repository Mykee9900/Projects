
// functions to show and hide forms 
const showForm = (form) => {
    const Form = document.getElementById(form);
    console.log(Form)
    Form.style.display = "block";
}

const hideForm = (form) => {
    const Form = document.getElementById(form);
    Form.style.display = "none";
}

const hideEditForm = (form) => {
    let formNum = form
    let item = document.getElementById("editTask-"+formNum)
    item.style.display = "none"
}

const showEditForm = (form) => {
    let formNum = form
    let item = document.getElementById("editTask-"+formNum)
    console.log(item)
    item.style.display = "block"
}

// function for photo validation
const photoValidator = (input) => {
    console.log("In the function")
    const file = input.files[0]
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if(file.size  > 2097152) {
        alert("File is to big!");
        input.value = "";
        return;
    } else if(!allowedFileTypes.includes(file.type)){
        alert("Invalid file type. Please choose a valid image file.");
        input.value = "";  // Clear the file input
        return;
    }
}
