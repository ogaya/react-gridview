import {targetToRect} from "./lib";

export default function drawOperation(canvas, viewModel, opeModel) {

  const target = opeModel.select.target;
  if (!target){
    return;
  }
  canvas.context.strokeStyle = "#9AD";
  canvas.context.lineWidth = 5;
  const rect = targetToRect(viewModel, target);
  canvas.drawRecine(rect);
}
