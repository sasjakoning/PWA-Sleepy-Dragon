import fetch from "node-fetch"

async function listAllStories() {
    console.log(`fetching all stories`);
    const response = await fetch(`https://shortstories-api.onrender.com/stories`);
    const data = await response.json();
    console.log("fetched all stories")
    return data;
}

function findSavedStories(allStories) {
    console.log(`finding saved stories`);
    const existingStories = JSON.parse(localStorage.getItem('savedStories'));

    if (existingStories != null) {
        const matchingStories = allStories.filter(story => existingStories.includes(story._id));
        return matchingStories;
    }

}

function findStory(allStories, id) {
    console.log('finding story');
    console.log(id)
    const matchingStory = allStories.find(story => story._id === id);

    if (matchingStory) {
        return matchingStory;
    } else {
        console.log('No story found');
    }
}


//  Get random story from API
async function getRandomStory() {
    // const windowStory = document.querySelector('.window-story');
    console.log('finding random story');
    try {
        const response = await fetch(`https://shortstories-api.onrender.com/`);
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

// async function getRandomStory(allStories) {
//     console.log('finding random story');
//     try {
//         const randomStory = allStories[Math.floor(Math.random() * allStories.length)];
//         return randomStory;
//     }catch {
//         console.log(err);
//     }
// }


export default {
    getRandomStory,
    listAllStories,
    findStory,
    findSavedStories,
};