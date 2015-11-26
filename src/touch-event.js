
const TouchEvent = {

  _onTouchStart(e){
    this._startTouches = e.touches;
    this._startOperation = this.state.operation;
  },
  _onTouchMove(e){
    if (e.touches.length < 1){
      return;
    }

    const touch = e.touches[0];
    const startTouch = this._startTouches[0];

    if (startTouch.identifier !== touch.identifier){
      return;
    }

    const sheet = this.state.sheet;
    const operation = this.state.operation;

    const diffX = startTouch.clientX - touch.clientX + sheet.rowHeader.width;
    const diffY = startTouch.clientY - touch.clientY + sheet.columnHeader.height;

    const top = sheet.rowHeader.items.get(this._startOperation.scroll.rowNo).top;
    const left = sheet.columnHeader.items.get(this._startOperation.scroll.columnNo).left;

    let columnNo = sheet.pointToColumnNo(left + diffX / sheet.scale);
    let rowNo = sheet.pointToRowNo(top +  diffY / sheet.scale);

    if (rowNo < 1){
      rowNo = 1;
    }

    if (columnNo < 1){
      columnNo = 1;
    }
    const scroll = operation.scroll
      .setColumnNo(columnNo)
      .setRowNo(rowNo);
    this._onOperationChange(operation.setScroll(scroll));
  }
};

export{
  TouchEvent
};
