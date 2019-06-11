import React, { Component } from 'react';

export default class Parametered extends Component {
  static displayName = Parametered.name;

  constructor(props) {
    super(props);
    this.state = { results: [], loading: true };
  }

  handleOnClick = () => {
    this.getData();
  }

  getData = () => {
    fetch('api/FoursquareData/GetPlacesWithSocialMedia')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(error => this.setState({ results: ['The following error occurred: ' + error], loading: false }))};

  renderResultsTable = (results) => {
    console.log(results);
    return (
      <div>
        <h1>Get all the places that have a social media account</h1>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Social Medias:</th>
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

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderResultsTable(this.state.results);

    return (
      <div>
          <div>
            <input value={this.state.input} type={'text'}/>
            <button onClick={this.handleOnClick}  style={buttonStyle} >Search</button>
          </div>
         
        {contents}
      </div>
    );
  }
}

const buttonStyle = {
  margin: '5px'
}