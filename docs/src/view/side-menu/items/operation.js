import React from "react";

const isSelect = function(hash){

  if (hash === "#/operation"){
    return true;
  }
  return false;
};

const createOperationItems = function(hash){
  let className = "side-menu-item-text";
  if (isSelect(hash)){
    className = className + " select";
  }
  return (
    <li className="side-menu-item">
      <a href="#/operation" className={className}>Operation</a>
    </li>
  );
};

export{
  createOperationItems as default
};
