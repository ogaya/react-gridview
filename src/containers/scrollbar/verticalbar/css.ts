
import css from "../../../util/css";

css(`
.rg-scroll-vertical-base{

  background: #f5f5ff;
  table-layout: fixed;
  width: 20px;
  height: 100%;
  border-left: 1px solid #ccc;

}


.rg-scroll-vertical-thumb-area{
  position: relative;
  width: 20px;
  height: calc(100% - 6px);
  margin: 3px;
}

.rg-scroll-vertical-thumb{
  background: #bbc;
  position: absolute;
  border-radius: 5px;
}

.rg-scroll-vertical-thumb:hover{
  background: #99a;
}
`);
