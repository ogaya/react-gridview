import React from "react";

const isSelect = function(hash){

  if (hash === "#/sheet"){
    return true;
  }
  return false;
};

const createSheetItems = function(hash){
  let className = "side-menu-item-text";
  if (isSelect(hash)){
    className = className + " select";
  }
  return (
    <li className="side-menu-item">
      <a href="#/sheet" className={className}>Sheet</a>
    </li>
  );
};

export{
  createSheetItems as default
};
