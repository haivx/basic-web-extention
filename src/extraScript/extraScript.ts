console.log("Script is working now.")

let height = window.innerHeight;
let width = window.innerWidth;
const overlaySelector = document.createElement("div");
const newCrossHair = document.createElement("div");
let mouseStart = {x: 0, y: 0};
let mouseDown = false;
let cropPosition = {top: 0, left: 0};
let cropSize = {width: 0, height: 0};
let crosshairs = {top: 0, left: 0};
let show = false


function handleMouseDown(e) {
  console.log("onMouseDown")
  mouseStart = {
    x: e.clientX,
    y: e.clientY
  };
  mouseDown = true;
  cropPosition = {
    top: e.clientY,
    left: e.clientX
  }
  cropSize = {
    width: 0,
    height: 0
  };
  updateImg()
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e) {
  console.log("handleMouseMove")
  crosshairs = {top: e.clientY, left: e.clientX};
  cropSize = {
    width: Math.abs(e.clientX - mouseStart.x) * window.devicePixelRatio,
    height: Math.abs(e.clientY - mouseStart.y) * window.devicePixelRatio
  };
  cropPosition = {
    top: Math.min(e.clientY, mouseStart.y),
    left: Math.min(e.clientX, mouseStart.x)
  };
  updateImg()
}

function handleMouseUp () {
  console.log("handleMouseUp")
  if (cropSize.width && cropSize.height && mouseDown) {
    console.log("onCROP", cropPosition.top, cropPosition.left, cropSize.width, cropSize.height)
    return;
    // takeScreenshot(cropPosition.top, cropPosition.left, cropSize.width, cropSize.height).then((res) => {console.log(res)});
  }
  mouseDown = false;
  cropSize = {
    width: 0,
    height: 0
  };
};

function handleMouseEnter() {
  show = true
}

function handleMouseLeave() {
  show = false
  mouseDown = false;
}


document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseenter", handleMouseEnter);
document.addEventListener("mouseleave", handleMouseLeave);


window.onresize = function() {
  // Setting the current height & width
  // to the elements
  height = window.innerHeight;
  width = window.innerWidth;
  overlaySelector.style.width = `${width}px`;
  overlaySelector.style.height = `${height}px`;
};

function updateImg() {
  if (!show) {
    overlaySelector.style.display = "none";
    return;
  }
  overlaySelector.style.top = String(cropPosition.top)+ 'px';
  overlaySelector.style.left = String(cropPosition.left)+ 'px';
  overlaySelector.style.width = `${cropSize.width}px`;
  overlaySelector.style.height = `${cropSize.height}px`
  newCrossHair.style.top = String(crosshairs.top)+ 'px';
  newCrossHair.style.left = String(crosshairs.left)+ 'px';
  overlaySelector.classList.add(String(mouseDown));
}

function generateOverlay() {
  overlaySelector.classList.add("overlay");
  overlaySelector.classList.add("true");
  overlaySelector.style.width = `${width}px`;
  overlaySelector.style.height = `${height}px`;
  overlaySelector.style.top = String(cropPosition.top)+ 'px';
  overlaySelector.style.left = String(cropPosition.left)+ 'px';
  overlaySelector.style.position = "fixed";
  overlaySelector.style.background = '#000'
  overlaySelector.style.zIndex = "999999999"
  overlaySelector.style.opacity = '0.6'
  document.querySelector('body').appendChild(overlaySelector);

  
  newCrossHair.className = "crosshairs"
  newCrossHair.style.top = String(crosshairs.top)+ 'px';
  newCrossHair.style.left = String(crosshairs.left)+ 'px';
  document.querySelector('body').appendChild(newCrossHair);
}

const extraInit = function() {
  generateOverlay()
}

extraInit()