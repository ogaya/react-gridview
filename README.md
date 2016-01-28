# react-gridview
React-Gridview provides a spreadsheet interface to your web application. 

[![Build Status](https://travis-ci.org/ogaya/react-gridview.svg)](https://travis-ci.org/ogaya/react-gridview)

[Demo][]  
[Examples][]  

## Install

```
npm install --save-dev react-gridview
```

## Usage

### ・ES6

```
// .jsx
import React from "react";
import {GridView} from "react-gridview";

const BasicExample = React.createClass({
    render: function() {
        return (
            <GridView />
        );
    }
});
```

### ・TypeScript
```
// tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node",
        // --- ohter options
    }
}
```
  
```
// .tsx

/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import * as React from "react";
import {GridView} from "react-gridview";

export class BasicExample extends React.Component<{}, {}>{
    render() {
        return (
            <GridView className="basic-example" />
        );
    }
};

```


## License

**MIT**

[Demo]: http://ogaya.github.io/react-gridview/
[Examples]: http://ogaya.github.io/react-gridview-examples/dist/index.html#basic-example
[docs]: http://ogaya.github.io/react-gridview/docs/#/
