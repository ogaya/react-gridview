
import css from "../../../util/css";

css(`
.rg-scroll-vertical-base{

  background: #334;
  table-layout: fixed;
  width: 20px;
  height: 100%;
}


.rg-scroll-vertical-thumb-area{
  position: relative;
  width: 20px;
  height: 100%;
}

.rg-scroll-vertical-thumb{
  background: #667;
  position: absolute;
  border-radius: 40px;
  margin: 0px 3px;
}

.rg-scroll-vertical-thumb:hover{
  background: #CCE;
}
`);
