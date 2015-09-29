
import css from "../../dist/util/css";

css(`
  #text-area-base{
    background: #eef;
    table-layout: fixed;
    border-top: 1px solid #ccc;
  }
  #breadcrumbs-one{
    background: #FF0;
    border-width: 1px;
    border-style: solid;
    border-color: #f5f5f5 #e5e5e5 #ccc;
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    overflow: hidden;
    width: 100%;
  }

  #breadcrumbs-one li{
    float: left;
  }

  #breadcrumbs-one a{
/*    padding: .7em 1em .7em 2em;*/
    float: left;
    text-decoration: none;
    color: #444;
    position: relative;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    background-color: #ddd;
    background-image: linear-gradient(to right, #f5f5f5, #ddd);
  }

  #breadcrumbs-one li:first-child a{
  /*  padding-left: 1em;*/
    border-radius: 5px 0 0 5px;
  }

  #breadcrumbs-one a:hover{
    background: #fff;
  }

  #breadcrumbs-one a::after,
  #breadcrumbs-one a::before{
    content: "";
    position: absolute;
  /*  top: 50%;*/
/*    margin-top: -1.5em;*/
/*    border-top: 1.5em solid transparent;*/
/*    border-bottom: 1.5em solid transparent;*/
    border-left: 1em solid;
    right: -1em;
  }

  #breadcrumbs-one a::after{
    z-index: 2;
    border-left-color: #ddd;
  }

  #breadcrumbs-one a::before{
    border-left-color: #ccc;
    right: -1.1em;
    z-index: 1;
  }

  #breadcrumbs-one a:hover::after{
    border-left-color: #fff;
  }

  #breadcrumbs-one .current,
  #breadcrumbs-one .current:hover{
    font-weight: bold;
    background: none;
  }

  #breadcrumbs-one .current::after,
  #breadcrumbs-one .current::before{
    content: normal;
  }
`);
