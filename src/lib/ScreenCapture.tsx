import React, { useState, MouseEvent } from 'react';
import html2canvas from 'html2canvas';
import './styles.css';

interface Props {
  on: boolean;
  onEndCapture: (base64Source: string) => void;
  children: React.ReactNode;
}

export default function ScreenCapture(props: Props) {
  const [mouseStart, setMouseStart] = useState({x: 0, y: 0});
  const [crosshairs, setCrosshairs] = useState({top: 0, left: 0});
  const [mouseDown, setMouseDown] = useState(false);
  const [cropPosition, setCropPosition] = useState({top: 0, left: 0});
  const [cropSize, setCropSize] = useState({width: 0, height: 0});
  const [show, setShow] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    setCrosshairs({top: e.clientY, left: e.clientX});
    setCropSize({
      width: Math.abs(e.clientX - mouseStart.x) * window.devicePixelRatio,
      height: Math.abs(e.clientY - mouseStart.y) * window.devicePixelRatio
    });
    setCropPosition({
      top: Math.min(e.clientY, mouseStart.y),
      left: Math.min(e.clientX, mouseStart.x)
    });
  };

  const handleMouseDown = (e: MouseEvent) => {
    setMouseStart({
      x: e.clientX,
      y: e.clientY
    });
    setMouseDown(true);
    setCropPosition({
      top: e.clientY,
      left: e.clientX
    });
    setCropSize({
      width: 0,
      height: 0
    });
  };

  const handleMouseUp = () => {
    if (cropSize.width && cropSize.height && mouseDown) {
      takeScreenshot(cropPosition.top, cropPosition.left, cropSize.width, cropSize.height).then(props.onEndCapture);
    }
    setMouseDown(false);
    setCropSize({
      width: 0,
      height: 0
    });
  };

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
    setMouseDown(false);
  };

  return (
    <div
      className='screen-capture'
      onMouseMove={props.on ? handleMouseMove : undefined}
      onMouseDown={props.on ? handleMouseDown : undefined}
      onMouseUp={props.on ? handleMouseUp : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.on && show && <>
        <div
          className={`overlay ${mouseDown}`}
          style={{
            top: cropPosition.top,
            left: cropPosition.left,
            width: cropSize.width,
            height: cropSize.height
          }}
        />
        <div
          className={`crosshairs`}
          style={{left: crosshairs.left + 'px', top: crosshairs.top + 'px'}}
        />
      </>}
      {props.children}
    </div>
  );
}

const takeScreenshot = async (
  cropPositionTop: number,
  cropPositionLeft: number,
  cropWidth: number,
  cropHeight: number,
) => {
  const body = document.querySelector('body');
  if (!body) {throw new Error('ScreenCapture could not find body')}

  const canvas = await html2canvas(body)
  const croppedCanvas = document.createElement('canvas');
  const croppedCanvasContext = croppedCanvas.getContext('2d');

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  
  if (croppedCanvasContext) {
    croppedCanvasContext.drawImage(
      canvas,
      cropPositionLeft,
      cropPositionTop,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );
  }
  
  return croppedCanvas.toDataURL();
};