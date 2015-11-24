const classNameCss =
`/*.css*/
.gridview-mini
{
  width: 15rem;
  height: 7rem;
  border: 1px solid #388E3C;
}
.gridview-large
{
  margin-left: 5rem;
  width: 30rem;
  height: 15rem;
  border: 1px solid #FF7043;
}`;

const classNameJsMini =
`// .jsx
<GridView className="gridview-mini"/>`;

const classNameJsLarge =
`// .jsx
<GridView className="gridview-large"/>`;

const sheetJs =
`// .jsx
import {GridView, Sheet} from "react-gridview";

const sheetModel = Sheet.createClass();
<GridView sheet={sheetModel}/>`;

const operationJs =
`// .jsx
import {GridView, Operation} from "react-gridview";

const opeModel = Operation.createClass();
<GridView operation={opeModel}/>`;

const onChangeSheetJs =
`// .jsx
const func = (prevSheet, nextSheet) => {
  if (nextSheet.getCell("A1").text){
    return prevSheet;
  }
  else{
    return nextSheet;
  }
};

// Cell("A1") can't change
<GridView onChangeSheet={func}/>`;

const onChangeOperationJs =
`// .jsx
const func = (prevOperation, nextOperation) => {
  if (nextOperation.selectItem){
    return prevOperation;
  }
  else{
    return nextOperation;
  }
};

// This Component can't select
<GridView onChangeOperation={func}/>`;

const func2 = (prevOperation, nextOperation) => {
  if (nextOperation.selectItem){
    return prevOperation;
  }
  else{
    return nextOperation;
  }
};

export{
  classNameCss,
  classNameJsMini,
  classNameJsLarge,
  sheetJs,
  operationJs,
  onChangeSheetJs,
  onChangeOperationJs
}
