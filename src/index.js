// write your code here!
const baseUrl = "http://localhost:3000"
const duckUrl = baseUrl + "/ducks"

// grabbing html
const duckNav = document.getElementById("duck-nav")

const featuredDuckName = document.getElementById("duck-display-name")
const featuredDuckImage = document.getElementById("duck-display-image")
const featuredDuckLikes = document.getElementById("duck-display-likes")

const newDuckForm = document.getElementById("new-duck-form")


///////////////////////////////////////
// Renders
///////////////////////////////////////
function renderDuckToNav(duck) {
    const duckPreview = document.createElement("img")
    duckPreview.className = "duck-nav"
    duckPreview.src = duck.img_url

    // Click event
    duckPreview.addEventListener("click", (e) => {
        renderDuckToFeature(duck)
    })

    duckNav.append(duckPreview)
    
}


function renderDuckToFeature(duck) {
    featuredDuckName.textContent = duck.name
    featuredDuckImage.src = duck.img_url
    featuredDuckLikes.textContent = `${duck.likes} Likes`
    featuredDuckLikes.addEventListener("click", ()=>{
        console.log("so far so good?")
        addLike(duck, featuredDuckLikes)
    } )
}


///////////////////////////////////////
// Fetches
///////////////////////////////////////

// Opening Fetch
fetch(duckUrl)
.then(r=>r.json())
.then(data => {
    data.forEach(renderDuckToNav)
    console.log(data)
    renderDuckToFeature(data[0])
})

// Add new duck
newDuckForm.addEventListener("submit", e => {
    e.preventDefault()

    const newDuck = {
        "name": e.target["duck-name-input"].value,
        "img_url": e.target["duck-image-input"].value,
        "likes": 0
    }

    const postConfig = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accepts": 'application/json'
        },
        body: JSON.stringify(newDuck)
    }

    fetch(duckUrl, postConfig)
    .then(r=>r.json())
    .then(duck => {
        renderDuckToNav(duck)
        renderDuckToFeature(duck)
    })

})

function addLike(duck, likesElement) {
    // Likes should be incremented here!
    duck.likes +=1

    patchConfig = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accepts": "application/json"
        },
        body: JSON.stringify({"likes": duck.likes})
    }
    const patchUrl = duckUrl + "/" + duck.id
    
    fetch(patchUrl, patchConfig)
    .then(r=>r.json())
    .then(data => {
        console.log('updating the dom')
        likesElement.textContent = `${data.likes} Likes`
    })
    
}