import api from '../helpers/api.js';
import express from 'express';
const router = express.Router();

let allStories = [];
let storyData;

router.get('/', (req, res) => {
    res.render('home');
});


router.get('/story', async (req, res) => {
    // if (!storyData) {
    //     res.render('story', { loading: true, story: null });
    //     allStories = await api.listAllStories();
    //     storyData = await api.getRandomStory(allStories);
    //     return res.redirect('/story/' + storyData._id)
    // }
    // res.render('story', { loading: false, story: storyData });

    // res.render('story', {
    //     showLoading: res.locals.showLoading
    // })

    allStories = await api.listAllStories();
    storyData = await api.getRandomStory(allStories);

    res.redirect('/story/' + storyData._id)

    // res.send(storyData)
});

router.get('/story/:id', async (req, res) => { 
    if (!storyData || storyData._id !== req.params.id) {
        storyData = await api.getStory(req.params.id);
    }
    res.render('story', { loading: false, story: storyData });
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