import touchHandler from "./touchHandler.js";
import local from "./localstorage.js";

const backBtn = document.querySelector(".nav-back");

console.log(backBtn);

// get current url and see if last part is matches

// if it does, then hide the back button

// localStorage.setItem("storyID", "5fce30db59830a875dba5cc6") 


if (window.location.href.includes("saved")) {


    const data = await fetchSavedContent();
    
    insertSavedContent(data);

}   

// console.log(window.location.hash)

// switch (window.location.href.includes()) {
//     case "story":
//         console.log("storyeas")
//         break;

//     default:
//         break;
// }


async function fetchSavedContent() {
    let story = localStorage.getItem("storyID") 
    const response = await fetch(`/saved/${story}`)
    const data = await response.json();


    return data
}

function insertSavedContent(data) {
    const container = document.createElement("div");
    container.classList.add("window-saved-storypart", "touch-area");

    const title = document.createElement("h3");
    const author = document.createElement("p");

    title.textContent = data.title;
    author.textContent = data.author;

    container.appendChild(title);
    container.appendChild(author);


    document.querySelector(".saved-content").appendChild(container);
}