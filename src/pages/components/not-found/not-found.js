import React, { PureComponent } from 'react';
import '../generic-page.css';
import { withRouter } from 'react-router';

class NotFound extends PureComponent {
//   handleRandomClick = () => {
//     const random = Math.round(Math.random() * (10 - 1) + 1);
//     this.props.history.push(`/videos?id=${random}`, { id: random})
//   }
//   handleForwardClick = () => {
//     this.props.history.goForward();
//   }
//   handleBackClick = () => {
//     // this.props.history.goBack();
//     this.props.history.go(-1);
//   }


  render() {
    return (
      <div className="Page NotFound">
        <h1>404</h1>
        <h3 className="SadFace">:(</h3>
        <h2>No hemos encontrado la página que buscabas</h2>
      </div>
    )
  }
}

export default withRouter(NotFound)
