import fetch from "node-fetch"

// get all stories from API
async function listAllStories() {
    console.log(`fetching all stories`);
    const response = await fetch(`https://shortstories-api.onrender.com/stories`);
    const data = await response.json();
    console.log("fetched all stories")
    return data;
}


// Find saved stories in all stories from API
function findStory(allStories, id) {
    console.log('finding story');
    const matchingStory = allStories.find(story => story._id === id);

    if (matchingStory) {
        return matchingStory;
    } else {
        console.log('No story found');
    }
}


//  Get random story from API
async function getRandomStory() {
    console.log('finding random story');
    try {
        const response = await fetch(`https://shortstories-api.onrender.com/`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}


export default {
    getRandomStory,
    listAllStories,
    findStory,
};