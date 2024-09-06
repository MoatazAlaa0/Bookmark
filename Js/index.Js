var bookmarkNameInput = document.getElementById("bookmarkName")
var websiteURlInput = document.getElementById("bookmarkURL")
var allWebsite = [];
var valid = true
var myLayer = document.querySelector(".layer")
if (localStorage.getItem("website")) {
    allWebsite = JSON.parse(localStorage.getItem("website"));
    displayElements()
}
/*------ addDetails----- */
function addDetails() {

    if (!bookmarkNameInput.value || !websiteURlInput.value) {
        myLayer.classList.remove("d-none")
        return;
    }


    if (bookmarkNameInput.valid == true && websiteURlInput.valid == true) {
        var website = {
            siteName: bookmarkNameInput.value,
            siteURL: websiteURlInput.value
        }
        allWebsite.push(website)
        displayElements()
        clearValue()
        localStorage.setItem("website", JSON.stringify(allWebsite))
        bookmarkNameInput.classList.remove("is-valid")
        websiteURlInput.classList.remove("is-valid")
    }


    else {

        myLayer.classList.remove("d-none")

    }
}
/*------ clearValue----- */
function clearValue() {
    bookmarkNameInput.value = ""
    websiteURlInput.value = ""
}
/*------ displayElements----- */

function displayElements() {
    var cartoona = ""
    for (i = 0; i < allWebsite.length; i += 1) {
        cartoona += `<div class="d-flex my-border gap-1 bg-light p-2 align-items-center justify-content-center">
<div class="col-2 text-center ">
             <div>
        
             <i class="fa-solid fa-star "></i> 
            </div>
        </div>
        <div class="col-2 text-center ">
        <div>
        
        <h5 class="m-0">${i + 1}</h5>
            </div>
        </div>
        
        <div class="col-2 text-center  ">
        <div>
        
        <h5 class="m-0">${allWebsite[i].siteName}</h5>
            </div>
        </div>
        <div class="col-2 text-center ">
        <div>
        
        <button onclick="updateElements(${i})" class="btn btn-warning"><i class="fa-solid fa-pen "></i> Update</button>
            </div>
        </div>
        <div class="col-2 text-center ">
        <div>
        
        <button onclick="visitWebsite('${allWebsite[i].siteURL}') " class="btn btn-success"><i class="fa-solid fa-eye "></i> Visit</button>
            </div>
        </div>
        <div class="col-2 text-center  ">
        
        <div>
            <button onclick="deleteElements(${i})" class="btn btn-danger  "><i class="fa-solid fa-trash "></i>
    
            Delete</button>
</div>
        </div>
        </div>
        `
    }
    document.getElementById("vip").innerHTML = cartoona
}

/*------ visitWebsite----- */

function visitWebsite(url) {
    open(url);
}
/*------ deleteWebsite----- */
function deleteElements(i) {
    allWebsite.splice(i, 1)
    displayElements()
    localStorage.setItem("website", JSON.stringify(allWebsite))
}


/*------ updateElements----- */
function updateElements(i) {

    bookmarkNameInput.value = allWebsite[i].siteName
    websiteURlInput.value = allWebsite[i].siteURL

    document.getElementById("change").innerHTML = `<button onclick="saveEditElements(${i})" class="btn btn-warning mb-4">Update</button>`;
}


/*------ saveEditElements----- */

function saveEditElements(i) {

    if (!bookmarkNameInput.value || !websiteURlInput.value) {
        alert("Please fill all the fields");
        return;
    }

    if (bookmarkNameInput.valid == true && websiteURlInput.valid == true) {
        allWebsite[i].siteName = bookmarkNameInput.value
        allWebsite[i].siteURL = websiteURlInput.value


        displayElements()
        clearValue()
        localStorage.setItem("website", JSON.stringify(allWebsite));
        document.getElementById("change").innerHTML = `<button onclick="addDetails()" class="btn btn-info px-5 mb-4">Submit</button>`;
        bookmarkNameInput.classList.remove("is-valid")
        websiteURlInput.classList.remove("is-valid")

    }
    else {
        alert(`Site Name : The first character must be capitalized and the word must be completed with up to four character and written in English --------" Site URL : must be a valid one" `)

    }
}

/*------ searchElements----- */



function searchElements(term) {
    var cartoona = ""
    for (i = 0; i < allWebsite.length; i += 1) {
        if (allWebsite[i].siteName.toLowerCase().trim().includes(term.toLowerCase().trim())) {

            cartoona += `<div class="d-flex my-border bg-light p-2 align-items-center justify-content-center">

<div class="col-2 text-center ">
    
<i class="fa-solid fa-star "></i>

</div>
<div class="col-2 text-center ">
    <h5 class="m-0">${i + 1}</h5>
</div>
<div class="col-2 text-center  ">
    <h5 class="m-0">${allWebsite[i].siteName}</h5>
</div>
<div class="col-2 text-center  ">
    <button onclick="updateElements(${i})" class="btn btn-warning"><i class="fa-solid fa-pen me-2"></i> Update</button>
</div>
<div class="col-2 text-center  ">
    <button onclick="visitWebsite('${allWebsite[i].siteURL}') " class="btn btn-success"><i class="fa-solid fa-eye me-2"></i> Visit</button>
</div>
<div class="col-2 text-center  ">
    <button onclick="deleteElements(${i})" class="btn btn-danger "><i class="fa-solid fa-trash me-2"></i>
        Delete</button>
</div>
</div>
`

        }




    }
    document.getElementById("vip").innerHTML = cartoona

}


/*------ validateWebsite----- */

function validateWebsite(element) {
    var regax = {
        bookmarkName: /^[A-Z][a-z]{3,}$/,
        bookmarkURL: /^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}/
    }

    if (regax[element.id].test(element.value) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.valid = true;
    }

    else {


        element.classList.add("is-invalid")
        element.classList.remove('is-valid')
        element.valid = false;
    }
}



myLayer.addEventListener("click", function () {
    addNone();
})

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        addNone();
    }
})

var myclosedicon = document.querySelector(".fa-xmark")
myclosedicon.addEventListener("click", function () {
    addNone();

}
)

function addNone() {
    myLayer.classList.add("d-none")
}