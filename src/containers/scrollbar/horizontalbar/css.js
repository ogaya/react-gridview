
import css from "../../../util/css";

css(`
.rg-scroll-base{
  display: table;
  background: #334;
  table-layout: fixed;
  height: 20px;
}
.rg-scroll-base > div{
  display: table-cell;
}

.rg-scroll-arrow{
  width: 0;
}
.rg-scroll-thumb-area{
  position: relative;
  height: inherit;
}

.rg-scroll-thumb{
  background: #667;
  position: absolute;
  height: inherit;
  border-radius: 40px;
  margin: 3px 0px;
}

.rg-scroll-thumb:hover{
  background: #CCE;
}
`);
