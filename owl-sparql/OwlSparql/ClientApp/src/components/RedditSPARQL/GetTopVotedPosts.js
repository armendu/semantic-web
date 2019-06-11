import React, { Component } from 'react';

export default class GetTopVotedPosts extends Component {
  static displayName = GetTopVotedPosts.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true, input: '' };
  }

  onChange = (e) => this.setState({ input: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    fetch('api/RedditData/GetTopVotedPosts/numberOfResults={numberOfResults}' + this.state.input)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(error => this.setState({ results: ['The following error occurred: ' + error], loading: false }));

    this.setState({ input: '' })
  }

  renderResultsTable = (results) => {
    console.log(results);
    return (
      <div>
        <h3>Get all the places that have a social media account</h3>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Post</th>
              <th>Title</th>
              <th>Date</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {results.data.map(info =>
              <tr key={info.post.toString()+info.title.toString()}>
                <td>
                  {info.post}
                </td>
                <td>
                  {info.title}
                </td>
                <td>
                  {info.date}
                </td>
                <td>
                  {info.votes}
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
              value={this.state.title}
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