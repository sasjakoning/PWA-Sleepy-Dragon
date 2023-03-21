import api from '../helpers/api.js';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/story', async (req, res) => {
    res.render('story');

    const data = await api.getRandomStory();
    //  do something here
});

router.get('/story/:id', async (req, res) => { 
    res.render('story', { 
        story: data
    });
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