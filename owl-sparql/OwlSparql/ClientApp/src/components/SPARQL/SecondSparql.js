import React, { Component } from 'react';

export default class SecondSparql extends Component {
  static displayName = SecondSparql.name;

  constructor (props) {
    super(props);
    this.state = { results: [], loading: true };

    fetch('api/SampleData/FirstSparql')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      });
  }

  static renderResultsTable(results) {
    console.log(results);
    return (
      <div>
        <h1>Data</h1>

        <p>This is a simple example of getting data from the API.</p>

        <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name of data:</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result =>
            <tr key={result.toString()}>
              <td>{result}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : SecondSparql.renderResultsTable(this.state.results);

    return (
      <div>
        {contents}
      </div>
    );
  }
}
