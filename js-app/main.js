const url = "https://localhost:5001/api/beanvariety/";

// html variable declaration
const mainCont = document.querySelector(".container")
const runButton = document.querySelector("#run-button");
const beanFormButton = document.querySelector("#bean-form");

//event listeners
runButton.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            mainCont.innerHTML = beanVarieties.map(variety => displayBeanVariety(variety)).join("");
        })
});

beanFormButton.addEventListener("click", () => {
    mainCont.innerHTML = beanForm();
});


//form submit functions
function submitBean(form) {
    const beanVariety = {
        name: form.name.value,
        region: form.region.value,
        notes: form.notes.value
    }

    postBeanVariety(beanVariety);
}

//api functions

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

function postBeanVariety(beanVariety) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanVariety)
    });
};


// html functions
function displayBeanVariety(variety) {
    return `<div class="bean-variety">
                <h2>Bean No. ${variety.id}</h2>
                <ul>
                    <li>Name: ${variety.name}</li>
                    <li>Region: ${variety.region}</li>
                    <li>Notes: ${variety.notes ? variety.notes : "No Notes"}</li>
                </ul>
            </div>`
}

function beanForm() {
    return `<div class="bean-form" onsubmit="submitBean()">
                <h2>Bean Creation Form</h2>
                <form>
                    <label for="name">Bean name:</label>
                    <input type="text" id="name" name="name" />
                    <label for="region">Region:</label>
                    <input type="text" id="region" name="region" />
                    <label for="notes">Notes:</label>
                    <input type="text" id="notes" name="notes" />
                    <input type="submit" value="Save Bean" />
                </form>
            </div>`
}