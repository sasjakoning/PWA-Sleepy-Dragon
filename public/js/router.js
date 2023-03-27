import routes from './routes.js';


function onRouteChanged(myHash) {

    const urlArray = myHash.split("/");
    const urlPath = urlArray[3];
    let id = null;

    urlArray.forEach(string => {
        if(string.includes("id=")){
            // remove the id= from the string
            id = string.split("id=").pop()
        }
    });

    switch (urlPath) {
        case '':
            console.log('home');
            routes.home();
            break;
        case 'home':
            console.log('home');
            routes.home();
            break;
        case 'story':
            console.log('story');
            routes.story(id);
            break;
        case 'saved':
            console.log('saved');
            routes.saved();
            break;
        case 'settings':
            console.log('settings');
            routes.error()
            break;
        case 'credits':
            console.log('credits');
            routes.error()
            break;
        default:
            // if (hash.includes('#id=')) {
            //     const id = hash.substring(4);
            //     routes.story(id)
            // } else {
            //     routes.error()
            // }
            routes.error()
            break;
    }
}



export default {
    onRouteChanged,
};