import React, { Component } from 'react';
import FirstSparql from './SPARQL/FirstSparql';
import SecondSparql from './SPARQL/SecondSparql';

export class Sparql extends Component {
  static displayName = Sparql.name;

  constructor(props) {
    super(props);
    this.state = { child: <SecondSparql /> };
  }

  render() {
    return (
      this.state.child
    );
  }
}
