window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
      console.log("Service Worker Registered")
    }
});

// switch case based on the current page

const url = window.location.href;

const urlArray = url.split("/");
const urlPath = urlArray[3];

switch (urlPath) {
  case "":
    riveAnimTitle(document.getElementById('canvas-dragon-title'))
    break
  case "story":
    riveAnimReading(document.getElementById('canvas-dragon-reading'))
    break
  case "contact":
    console.log("Contact page")
    break
  default:
    console.log("Default page")
    break
};

function riveAnimLoad(canvas) {
  const canvasDragonLoadRive = new rive.Rive({
    src: '/images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-loading',
    artboard: 'dragon-loading',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonLoadRive.resizeDrawingSurfaceToCanvas();

    },
  });
}


function riveAnimTitle(canvas) {
  const canvasDragonTitleRive = new rive.Rive({
    src: '/images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-sleeping-states',
    artboard: 'dragon-sleeping',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonTitleRive.resizeDrawingSurfaceToCanvas();
    },
  });
}

function riveAnimReading(canvas) {
  const canvasDragonReadingRive = new rive.Rive({
    src: '/images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-reading',
    artboard: 'dragon-reading',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonReadingRive.resizeDrawingSurfaceToCanvas();

    },
  });
}