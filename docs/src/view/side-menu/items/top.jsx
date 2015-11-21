import React from "react";
const isSelectTop = function(hash){
  if (!hash){
    return true;
  }
  if (hash === "#/"){
    return true;
  }
  return false;
};

const createTopItems = function(hash){
  let className = "side-menu-item-text";
  if (isSelectTop(hash)){
    className = className + " select";
  }
  return (
    <li className="side-menu-item">
      <a href="#/" className={className}>Top</a>
    </li>
  );
};

export{
  createTopItems as default
};
