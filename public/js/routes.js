// import api from './api.js';
import rive from './rive.js';
import utils from './utilities.js';
import touchHandle from './touchHandler.js'

let currentStory = null;

function home() {
  utils.closeActiveWindow();

  // Load the dragon title animation
  const titleCanvas = document.querySelector('#canvas-dragon-title');
  rive.riveAnimTitle(titleCanvas);

}

async function story(id) {

    currentStory = id;

  // Create a new instance of the 'story-loading' element and add it to the window

    const storyReadingCanvas = document.querySelector('#canvas-dragon-reading');
    rive.riveAnimReading(storyReadingCanvas);

    const saveBtn = document.querySelector('.save-toggle');
    const saveNotif = document.querySelector('.story-saved-notif');
    const saveNotifContent = saveNotif.querySelector('p');

    saveBtn.addEventListener('change', async () => {
        if (saveBtn.checked) {
            console.log("saving story")
            utils.saveStory(currentStory)

            saveNotifContent.textContent = 'Story saved!';
            saveNotif.classList.add('saved-notif-slide-in');
            setTimeout(() => {
            saveNotif.classList.remove('saved-notif-slide-in')
            }, 2000);
        } else if (!saveBtn.checked) {

            utils.removeStory(currentStory)
            
            saveNotifContent.textContent = 'Story unsaved!';
            saveNotif.classList.add('saved-notif-slide-in');
            setTimeout(() => {
                saveNotif.classList.remove('saved-notif-slide-in')
            }, 2000);
        }
    });

}

async function saved() {
  utils.closeActiveWindow();
  const windowSaved = document.querySelector('.window-saved');
  const windowSavedContent = document.querySelector('.saved-content');


  // The below function detects the swipe direction and logs it to the console

    const touchArea = document.querySelectorAll('.saved-storypart');


    touchArea.forEach((element) => {
    const slideElement = element.querySelector('.window-saved-storypart');
    touchHandle.swipeAndRemove(slideElement, element);
    });

    //   utils.checkIfEmpty(windowSavedContent, 'saved-empty');

}

async function error() {
  utils.closeActiveWindow();

  const windowError = document.querySelector('.window-error');
  utils.openWindow(windowError, 'right');
}

export default {
  home,
  story,
  saved,
  error,
};