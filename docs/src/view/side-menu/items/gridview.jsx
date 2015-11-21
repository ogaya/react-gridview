import React from "react";

const isSelectGridView = function(hash){

  if (hash === "#/gridview"){
    return true;
  }
  return false;
};

const createGridViewItems = function(hash){
  let className = "side-menu-item-text";
  if (isSelectGridView(hash)){
    className = className + " select";
  }
  return (
    <li className="side-menu-item">
      <a href="#/gridview" className={className}>GridView</a>
    </li>
  );
};

export{
  createGridViewItems as default
};
