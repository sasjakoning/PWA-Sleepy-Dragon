import api from '../helpers/api.js';
import express from 'express';
const router = express.Router();

let storyData;

router.get('/', (req, res) => {
    res.render('home', { offline: false });
});

router.get("/getuser" , (req, res) => {
    res.send(req.cookies)
})


router.get('/story', async (req, res) => {
    storyData = await api.getRandomStory();
    res.redirect('/story/' + 'id=' + storyData._id)
});

router.get('/story/:id', async (req, res) => { 
    res.render('story', { story: storyData });
});

router.get('/savestory/:id', (req, res) => {
    console.log("setting cookie")

    const savedStories = req.cookies.savedStories || [];
    savedStories.push(req.params.id);
    res.cookie('savedStories', savedStories);

    res.send("cookie set")
});

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

router.get('/saved', async (req, res) => {
    const allStories = await api.listAllStories();

    const savedStoryIds = req.cookies.savedStories;
    let savedStories = [];

    if(savedStoryIds) {
        savedStoryIds.forEach(async (story) => {
            const storyData = await api.findStory(allStories, story);
            savedStories.push(storyData);
        });
    }else {
        savedStories = null;
    }

    console.log(savedStories)

    res.render('saved', { 
        savedStories: savedStories
    });
});

router.get('/saved/:id', async (req, res) => {
    const allStories = await api.listAllStories();
    const story = await api.findStory(allStories, req.params.id);

    console.log(story)
    
    res.send(story)
} );

router.get('/offline', (req, res) => {
    res.render('home', { offline: true });
});

export default router;

// app.get('/', async (req, res) => {
//     res.render('home');
// }); 
  
// app.get('/story', async (req, res) => {
//     res.render('story', {
//         layout: 'index',
//         story: await api.insertStory()
//     });
// }); 