import * as React from "react";


export interface Props{
    hash?: string;
}
export default class NotFound extends React.Component<Props, {}> {

  render() {
    return (
      <div>
        <div>
          Not Found
        </div>

      </div>
    );
  }
}
