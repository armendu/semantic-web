import React, { Component } from 'react';

export default class GetPlacesThatServeBreakfastAndTea extends Component {
  static displayName = GetPlacesThatServeBreakfastAndTea.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true };

    this.getData();
  }

  getData = () => {
    fetch('api/FoursquareData/GetPlacesThatServeBreakfastAndTea')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      });
  }

  renderResultsTable = (results) => {
    console.log(results);
    return (
      <div>
        <h1>Get all places that have a service breakfast, and tea/coffee</h1>

        <table className='table table-striped'>
          <thead>
            <tr>
                <th>Address</th>
                <th>Places</th>
            </tr>
          </thead>
          <tbody>
            {results.data.map(info =>
              <tr key={info.address.toString() + Math.random}>
                <td>
                  {info.address}
                </td>
                <td>
                  {info.place}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderResultsTable(this.state.results);

    return (
      <div>
        {contents}
      </div>
    );
  }
}
