import React, { Component } from 'react';
import FirstSparql from './SPARQL/FirstSparql';

export class Sparql extends Component {
  static displayName = Sparql.name;

  constructor (props) {
    super(props);
    this.state = { child: <FirstSparql /> };
  }

  render () {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        {
          this.state.child
        }        
      </div>
    );
  }
}
