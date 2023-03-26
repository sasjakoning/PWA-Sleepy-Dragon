import touchHandler from "./touchHandler.js";
import local from "./localstorage.js";
import rive from "./rive.js";
import appWindow from "./windows.js";

const backBtn = document.querySelector(".nav-back");

const url = window.location.href;
const urlArray = url.split("/");
const urlPath = urlArray[3];

console.log(urlPath)


switch (urlPath) {
    case "story":
        const canvasStory = document.querySelector("#canvas-dragon-reading");
        rive.riveAnimReading(canvasStory);
        break;
    case "saved":
        const data = await fetchSavedContent();
        insertSavedContent(data);
    default:
        const canvasHome = document.querySelector("#canvas-dragon-title");
        rive.riveAnimTitle(canvasHome);

        const storyBtn = document.querySelector(".btn-story");
        storyBtn.addEventListener("click", () => {
            const storyLoadingWindow = document.querySelector(".story-loading");
            appWindow.openWindow(storyLoadingWindow, "right");
        });
        break;
}


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