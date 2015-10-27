
import css from "../../../util/css";

css(`
.rg-scroll-base{
  background: #f5f5ff;
  table-layout: fixed;
  height: 20px;
  border-top: 1px solid #ccc;
}

.rg-scroll-arrow{
  width: 0;
}
.rg-scroll-thumb-area{
  position: relative;
  height: 20px;
  width: calc(100% - 6px);
  margin: 3px;
}

.rg-scroll-thumb{
  background: #bbc;
  position: absolute;
  border-radius: 5px;
}

.rg-scroll-thumb:hover{
  background: #99a;
}
`);
