import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts';
import Data from './Data';

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <Data />
        <Footer />
      </Fragment>
    );
  }
}
