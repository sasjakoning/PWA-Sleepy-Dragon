import api from '../helpers/api.js';
import express from 'express';
const router = express.Router();

let storyData;

// homepage
router.get('/', (req, res) => {
    res.render('home', { offline: false });
});

// Get story from API
router.get('/story', async (req, res) => {
    storyData = await api.getRandomStory();
    res.redirect('/story/' + 'id=' + storyData._id)
});

// Story page
router.get('/story/:id', async (req, res) => {  

    // if request came from homepage
    if(storyData){
        res.render('story', { story: storyData });
    }else {
        // If request came from saved stories page
        const allStories = await api.listAllStories();
        const story = await api.findStory(allStories, req.params.id);

        res.render('story', { story: story });
    }
});

// Save story in cookie
router.post('/savestory/:id', (req, res) => {
    console.log("setting cookie");

    const savedStories = req.cookies.savedStories || [];
    savedStories.push(req.params.id);
    res.cookie('savedStories', savedStories);
    res.redirect('back');
});

// Remove story from cookie
router.get('/removestory/:id', (req, res) => {
    console.log("removing cookie")

    const savedStories = req.cookies.savedStories || [];
    const index = savedStories.indexOf(req.params.id);

    if (index > -1) {
        savedStories.splice(index, 1);
    }


    res.cookie('savedStories', savedStories);

    res.send("cookie removed")
});

// Saved stories page
router.get('/saved', async (req, res) => {
    // get all stories
    const allStories = await api.listAllStories();

    // get saved stories from cookie
    const savedStoryIds = req.cookies.savedStories;

    async function savedStories() {
        if(savedStoryIds) {
            console.log("saved stories")
            const promises = savedStoryIds.map(async (story) => {
                const storyData = await api.findStory(allStories, story);
                return storyData;
            });
            return Promise.all(promises);
        } else {
            console.log("no saved stories")
            return null;
        }
    }


    // Render saved stories
    res.render('saved', { 
        savedStories: await savedStories()
    });

});


// router.get('/saved/:id', async (req, res) => {
//     const allStories = await api.listAllStories();
//     const story = await api.findStory(allStories, req.params.id);

//     console.log(story)
    
//     res.send(story)
// } );


// view offline page
router.get('/offline', (req, res) => {
    res.render('home', { offline: true });
});

export default router;