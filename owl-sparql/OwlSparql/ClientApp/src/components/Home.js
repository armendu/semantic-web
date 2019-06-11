import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Semantic Web</h1>
        <p>This is a simple page application made using React</p>
        
        <p>To help you get started:</p>
        <ul>
          <li>Choose <strong>SPARQL</strong> or <strong>SWRL</strong> from the navigation bar up top</li>
         </ul>
      </div>
    );
  }
}
