import React, { Component } from 'react';

export default class GetTopTenRecentPosts extends Component {
  static displayName = GetTopTenRecentPosts.name;

  constructor(props) {
    super(props);
    // fetch('http://localhost:8080/GetPlacesWithSocialMedia')
    this.state = { results: [], loading: true, input: '5' };
  }

  onChange = (e) => this.setState({ input: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    fetch('api/RedditData/GetTopTenRecentPosts/numberOfPosts=' + this.state.input)
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
        <h1>Get Top 10 most recent Posts.</h1>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Post:</th>
              <th>Title:</th>
              <th>Date:</th>
            </tr>
          </thead>
          <tbody>
              {results.data.map(result =>
                <tr key={result.toString()}>
                  <td>{result.post}</td>
                  <td>{result.title}</td>
                  <td>{result.date}</td>
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
            <select value={this.state.input}
              onChange={this.onChange}
              style={{ flex: '5', margin: '5px' }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
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
