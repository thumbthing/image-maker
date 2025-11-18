'use client';

import useBrowser from "@/app/feature/hook/browser/useBrowser";
import { canvasHeight, canvasWidth } from "@/lib/features/canvas/canvasSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CanvasSize.module.css";

const CANVAS_SIZE = {
  'Chrome': {
    min: 1,
    max: 32767,
    totalMax: 268435456
  },
  'Firefox': {
    min: 1,
    max: 32767,
    totalMax: 472907776
  },
  'Safari': {
    min: 1,
    max: 32767,
    totalMax: 268435456
  }
}

const DEFAULT_SIZE = {
  height: 150,
  width: 300,
}

const ERROR_MESSAGE = {
  max: "허용된 범위를 초과했습니다.",
  min: "캔버스를 표시할 수 없습니다"
}

export default function CanvasSize() {
  const heightInput = useRef(DEFAULT_SIZE.height);
  const widthInput = useRef(DEFAULT_SIZE.width);

  const [ sizeError, setSizeError ] = useState({
    "minWidth": null,
    "maxWidth": null,
    "minHeight": null,
    "maxHeight": null,
    "limit": null,
  });

  const viewHeight = useSelector((state) => state.canvas.height);
  const viewWidth = useSelector((state) => state.canvas.width);

  const browser = useBrowser();
  const canvasSize = !CANVAS_SIZE[browser] ? CANVAS_SIZE.Chrome : CANVAS_SIZE[browser];

  const dispatch = useDispatch();

  const changeCanvasSize = (heightInput, widthInput) => {
    const hasError = Object.values(sizeError).some(error => error !== null);
    if (hasError) return;
    if (heightInput.current !== viewHeight) dispatch(canvasHeight(heightInput.current));
    if (widthInput.current !== viewWidth) dispatch(canvasWidth(widthInput.current));
  }

  const checkValidCanvas = (heightInput, widthInput) => {
    const errorStatus = {
      "minWidth": null,
      "maxWidth": null,
      "minHeight": null,
      "maxHeight": null,
      "limit": null,
    }

    if (widthInput < canvasSize.min) errorStatus.minWidth = ERROR_MESSAGE.min;
    if (widthInput > canvasSize.max)  errorStatus.maxWidth = ERROR_MESSAGE.max;
    if (heightInput < canvasSize.min) errorStatus.minHeight = ERROR_MESSAGE.min;
    if (heightInput > canvasSize.max) errorStatus.maxHeight = ERROR_MESSAGE.max;
    if (heightInput * widthInput > canvasSize.totalMax) errorStatus.limit = ERROR_MESSAGE.max;
    
    for (const [key, value] of Object.entries(errorStatus)) {
      if (sizeError[key] !== value) {
        setSizeError(errorStatus);
        return;
      }
    }
    
    for (const value of Object.values(errorStatus)) {
      if (value) {
        setSizeError(errorStatus);
        return;
      }
    }
  }

  const handleCanvasSize = (heightInput, widthInput) => {
    checkValidCanvas(heightInput, widthInput);
    changeCanvasSize(heightInput, widthInput);
  }

  return (
    <div className={style.container}>
      <p>사용중인 브라우저: {browser}</p>
      <p>최소 {canvasSize.min}, 최대 {canvasSize.max}</p>
      <p>{sizeError.limit}</p>
      <form className={style.sizeForm}>
        <div>
          <label>가로</label>
          <input type="number" id="canvas-width" min={canvasSize.min} max={canvasSize.max} placeholder={viewWidth} onChange={(e) => widthInput.current = e.target.value}/>
        </div>
        <p>{sizeError.minWidth}{sizeError.maxWidth}</p>
        <div>
          <label>세로</label>
          <input type="number" id="canvas-height" min={canvasSize.min} max={canvasSize.max} placeholder={viewHeight} onChange={(e) => heightInput.current = e.target.value}/>
        </div>
        <p>{sizeError.minHeight}{sizeError.maxHeight}</p>
        <input type="button" onClick={() => {
          handleCanvasSize(heightInput.current, widthInput.current);
        }}/>
      </form>
    </div>
  )
}