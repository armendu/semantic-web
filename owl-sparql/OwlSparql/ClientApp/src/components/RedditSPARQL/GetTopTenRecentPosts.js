import React, { Component } from 'react';

export default class GetTopTenRecentPosts extends Component {
  static displayName = GetTopTenRecentPosts.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true };

    // fetch('http://localhost:8080/GetPlacesWithSocialMedia')
    this.getData();      
  }

  getData = () => {
    fetch('api/RedditData/GetTopTenRecentPosts')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(error => this.setState({ results: [], loading: false }))};

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
          {results === [] ?
            results.data.map(result =>
              <tr key={result.toString()}>
                <td>{result.post}</td>
                <td>{result.title}</td>
                <td>{result.date}</td>
              </tr>
            )
          :
          <tr >
            <td>Error</td>
          </tr>
          }
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
