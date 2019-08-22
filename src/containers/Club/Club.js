import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Club extends Component {
  render() {
    console.log(this.props.match.params.id);

    return (
      <div>
        lorem
      </div>
    )
  }
}

export default withRouter(Club);
