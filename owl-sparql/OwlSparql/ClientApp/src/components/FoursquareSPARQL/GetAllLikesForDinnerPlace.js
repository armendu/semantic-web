import React, { Component } from 'react';

export default class GetAllLikesForDinnerPlace extends Component {
  static displayName = GetAllLikesForDinnerPlace.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true, input: 'Dinner' };
  }

  onChange = (e) => this.setState({ input: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    fetch('api/FoursquareData/GetAllLikesForDinnerPlace/place=' + this.state.input)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(error => this.setState({ results: ['The following error occurred: ' + error], loading: false }));

  }

  renderResultsTable = (results) => {
    console.log(results);
    return (
      <div>
        <h3>Get all likes for a type of place.</h3>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Place</th>
              <th>Numer of likes</th>
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
        <div>
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
            <input
              type="text"
              name="title"
              placeholder="Search"
              style={{ flex: '10', margin: '5px' }}
              value={this.state.input}
              onChange={this.onChange}
            />
            <input
              type="submit"
              value="Submit"
              style={{ flex: '1', margin: '5px' }}
            />
          </form>
        </div>

        {contents}
      </div>
    );
  }
}