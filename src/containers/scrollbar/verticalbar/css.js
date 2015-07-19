
import css from "../../../util/css";

css(`
.rg-scroll-vertical-base{
  display: table;
  background: #557;
  table-layout: fixed;
  width: 20px;
}
.rg-scroll-vertical-base > div{
  display: table-cell;
}

.rg-scroll-vertical-thumb-area{
  position: relative;
  width: inherit;
}

.rg-scroll-vertical-thumb{
  background: #88A;
  position: absolute;
  width: inherit;
  border-radius: 40px;
  margin: 0px 3px;
  height: 50px;
}

.rg-scroll-vertical-thumb:hover{
  background: #CCE;
}
`);
