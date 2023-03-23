import api from '../helpers/api.js';
import express from 'express';
import localstorage from '../public/js/localstorage.js';
const router = express.Router();

let storyData;

router.get('/', (req, res) => {
    res.render('home');
});


router.get('/story', async (req, res) => {
    storyData = await api.getRandomStory();
    res.redirect('/story/' + storyData._id)
});

router.get('/story/:id', async (req, res) => { 
    res.render('story', { story: storyData });
});

router.get('/saved', async (req, res) => {
    res.render('saved', { });
});

router.get('/saved/:id', async (req, res) => {
    const allStories = await api.listAllStories();
    const story = await api.findStory(allStories, req.params.id);

    console.log(story)
    
    res.send(story)
} );

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