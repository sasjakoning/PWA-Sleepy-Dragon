import router from "./router.js";

router.onRouteChanged(window.location.href)

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/service-worker.js", {
            scope: "/",
        });
        if (registration.installing) {
            console.log("Service worker installing");
        } else if (registration.waiting) {
            console.log("Service worker installed");
        } else if (registration.active) {
            console.log("Service worker active");
        }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};


registerServiceWorker();



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