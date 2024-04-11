console.log("Script is working now.");

const state = {
  on: false,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  crossHairsTop: 0,
  crossHairsLeft: 0,
  isMouseDown: false,
  windowWidth: 0,
  windowHeight: 0,
  borderWidth: "px",
  cropPositionTop: 0,
  cropPositionLeft: 0,
  cropWidth: 0,
  cropHeigth: 0,
  imageURL: "",
};

// TODO: window.removeEventListener('resize', this.handleWindowResize);
function handleWindowResize() {
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  state.windowWidth = windowWidth;
  state.windowHeight = windowHeight;
}

window.onresize = function () {
  handleWindowResize();
};

function startCapture() {
  state.on = true;
}

function handleMouseMove(e) {
  console.log("handleMouseMove", state);
  const {
    isMouseDown,
    windowWidth,
    windowHeight,
    startX,
    startY,
    borderWidth,
  } = state;
  let cropPositionTop = startY;
  let cropPositionLeft = startX;
  const endX = e.clientX;
  const endY = e.clientY;
  const isStartTop = endY >= startY;
  const isStartBottom = endY <= startY;
  const isStartLeft = endX >= startX;
  const isStartRight = endX <= startX;
  const isStartTopLeft = isStartTop && isStartLeft;
  const isStartTopRight = isStartTop && isStartRight;
  const isStartBottomLeft = isStartBottom && isStartLeft;
  const isStartBottomRight = isStartBottom && isStartRight;
  let newBorderWidth = borderWidth;
  let cropWidth = 0;
  let cropHeigth = 0;

  if (isMouseDown) {
    if (isStartTopLeft) {
      newBorderWidth = `${startY}px ${windowWidth - endX}px ${
        windowHeight - endY
      }px ${startX}px`;
      cropWidth = endX - startX;
      cropHeigth = endY - startY;
    }

    if (isStartTopRight) {
      newBorderWidth = `${startY}px ${windowWidth - startX}px ${
        windowHeight - endY
      }px ${endX}px`;
      cropWidth = startX - endX;
      cropHeigth = endY - startY;
      cropPositionLeft = endX;
    }

    if (isStartBottomLeft) {
      newBorderWidth = `${endY}px ${windowWidth - endX}px ${
        windowHeight - startY
      }px ${startX}px`;
      cropWidth = endX - startX;
      cropHeigth = startY - endY;
      cropPositionTop = endY;
    }

    if (isStartBottomRight) {
      newBorderWidth = `${endY}px ${windowWidth - startX}px ${
        windowHeight - startY
      }px ${endX}px`;
      cropWidth = startX - endX;
      cropHeigth = startY - endY;
      cropPositionLeft = endX;
      cropPositionTop = endY;
    }
  }

  cropWidth *= window.devicePixelRatio;
  cropHeigth *= window.devicePixelRatio;
  cropPositionLeft *= window.devicePixelRatio;
  cropPositionTop *= window.devicePixelRatio;
  state.crossHairsTop = e.clientY;
  state.crossHairsLeft = e.clientX;
  state.borderWidth = newBorderWidth;
  state.cropWidth = cropWidth;
  state.cropHeigth = cropHeigth;
  state.cropPositionTop = cropPositionTop;
  state.cropPositionLeft = cropPositionLeft;
  updateCropImg();
}

function handleMouseDown(e) {
  console.log("handleMouseDown", state);
  const startX = e.clientX;
  const startY = e.clientY;

  state.startX = startX;
  state.startY = startY;
  state.cropPositionTop = startY;
  state.cropPositionLeft = startX;
  state.isMouseDown = true;
  state.borderWidth = `${state.windowWidth}px ${state.windowHeight}px`;
  updateCropImg();
}
window.onload = function () {
  function handleClickTakeScreenShot() {
    const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = state;
    const body = document.querySelector("body");
    console.log("BODY", body)
    // if (body) {
    //   html2canvas(body).then((canvas) => {
    //     const croppedCanvas = document.createElement("canvas");
    //     const croppedCanvasContext = croppedCanvas.getContext("2d");
  
    //     croppedCanvas.width = cropWidth;
    //     croppedCanvas.height = cropHeigth;
  
    //     if (croppedCanvasContext) {
    //       croppedCanvasContext.drawImage(
    //         canvas,
    //         cropPositionLeft,
    //         cropPositionTop,
    //         cropWidth,
    //         cropHeigth,
    //         0,
    //         0,
    //         cropWidth,
    //         cropHeigth
    //       );
    //     }
  
    //     if (croppedCanvas) {
    //       console.log(croppedCanvas.toDataURL());
    //     }
    //   });
    // }
  }
};

function handleMouseUp() {
  console.log("handleMouseUp", state);
  // handleClickTakeScreenShot();
  state.on = false;
  state.isMouseDown = false;
  state.borderWidth = "0px";
  // updateCropImg()
}

const overlaySelector = document.createElement("div");
const newCrossHair = document.createElement("div");

function updateCropImg() {
  overlaySelector.style.width = `${state.cropWidth}px`;
  overlaySelector.style.height = `${state.cropHeigth}px`;
  overlaySelector.style.top = String(state.cropPositionTop) + "px";
  overlaySelector.style.left = String(state.cropPositionLeft) + "px";
}

function generateOverlay() {
  overlaySelector.classList.add("overlay");
  overlaySelector.style.borderWidth = `${state.borderWidth}px`;
  document.querySelector("body").appendChild(overlaySelector);

  newCrossHair.className = "crosshairs";
  newCrossHair.style.top = String(state.crossHairsTop) + "px";
  newCrossHair.style.left = String(state.crossHairsLeft) + "px";
  document.querySelector("body").appendChild(newCrossHair);
}

document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

const extraInit = function () {
  generateOverlay();
};

window.onload = (event) => {
  console.log('page is fully loaded');
  extraInit();
};