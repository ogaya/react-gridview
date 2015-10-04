
import css from "../../dist/util/css";

css(`

  .sample-cell-area{
    width: 100%;
    table-layout: fixed;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
  }
  .sample-cell-table{
    display: table;
  }
  .sample-cell-table > div{
    display: table-cell;
  }
`);
