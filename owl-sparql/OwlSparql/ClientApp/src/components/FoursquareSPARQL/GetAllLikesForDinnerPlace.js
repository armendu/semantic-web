import React, { Component } from 'react';

export default class GetAllLikesForDinnerPlace extends Component {
  static displayName = GetAllLikesForDinnerPlace.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true };

    this.getData();
  }

  getData = () => {
    fetch('api/FoursquareData/GetAllLikesForDinnerPlace')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      });
  }

  renderResultsTable = (results) => {
    console.log(results);
    return (
      <div>
        <h1>Get all likes of places that serve Dinner</h1>
        
        <table className='table table-striped'>
          <thead>
            <tr>
                <th>Address</th>
                <th>Places</th>
            </tr>
          </thead>
          <tbody>
            {results.data.map(info =>
              <tr key={info.place.toString()}>
                <td>
                  {info.place}
                </td>
                <td>
                  {info.likes}
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
