import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      houses: [],
      selectedHouse: {},
      showDetailView: false,
      showListView: true
    }

    this.componentDidMount = async () => {
      const response = await fetch('https://anapioficeandfire.com/api/houses');
      const houses = await response.json();
      
      this.setState({houses});
    }

    this.getHouses = () => {
    
      let counter = 1;
      let houseList = [];
      
      this.state.houses.forEach(house => {
        
        houseList.push(<tr key={counter}>
          <th scope="row">{counter}</th>
          <td>{house.name}</td>
          <td>{house.region}</td>
          <td><button type="button" onClick={() => this.getDetails(house.url)} className="btn btn-primary">Details</button></td>
        </tr>);
        
        counter++;
      });

      return (houseList);
    }

    this.getDetails = async url => {
      
      const response = await fetch(url);
      const selectedHouse = await response.json();

      let selectedHouseFormattedValues = [...selectedHouse];

      selectedHouseFormattedValues.titles = this.arrayToListMapper(selectedHouseFormattedValues.titles);
      selectedHouseFormattedValues.seats = this.arrayToListMapper(selectedHouseFormattedValues.seats);
      selectedHouseFormattedValues.coatOfArms = this.stringToArrayMapper(selectedHouseFormattedValues.coatOfArms);
      selectedHouseFormattedValues.swornMembers = this.arrayToListMapper(selectedHouseFormattedValues.swornMembers);

      this.setState({selectedHouse: selectedHouseFormattedValues, showDetailView: true, showListView: false});
    }

    this.arrayToListMapper = list => {
      return (list && list.length > 0) ? list.map((item, index) => (<div key={index}>{item}</div>)) : null;
    }
    
    this.stringToArrayMapper = list => {
      return (list && list.length > 0) ? list.split(', ').map((item, index) => (<div key={index}>{item}</div>)) : null;
    }

    this.backToListView = () => {
      this.setState({showDetailView: false, showListView: true});
    }

    this.listViewClasses = () => this.state.showListView ? 'list-view d-block' : 'list-view d-none';

    this.detailViewClasses = () => this.state.showDetailView ? 'detail-view d-block' : 'detail-view d-none';
  }

  render() {
    return (
      <div className="container">

        <div className={this.listViewClasses()}>

          <h1 className="mt-5 mb-5 text-center">Ice And Fire - Houses</h1>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">region</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {this.getHouses()}
            </tbody>
          </table>
        
        </div>

        <div className={this.detailViewClasses()}>
          
          <h1 className="mt-5 mb-5 text-center">{this.state.selectedHouse.name}</h1>

          <button type="button" onClick={this.backToListView} className="btn btn-primary mb-5">Houses List</button>

          <table className="table">
            <tbody>
            <tr>
              <th scope="col">name</th>
              <td>{this.state.selectedHouse.name}</td>
            </tr>
            <tr>
              <th scope="col">region</th>
              <td>{this.state.selectedHouse.region}</td>
            </tr>
            <tr>
              <th scope="col">coat of arms</th>
              <td>{this.state.selectedHouse.coatOfArms}</td>
            </tr>
            <tr>
              <th scope="col">words</th>
              <td>{this.state.selectedHouse.words}</td>
            </tr>
            <tr>
              <th scope="col">titles</th>
              <td>{this.state.selectedHouse.titles}</td>
            </tr>
            <tr>
              <th scope="col">seats</th>
              <td>{this.state.selectedHouse.seats}</td>
            </tr>
            <tr>
              <th scope="col">current lord</th>
              <td>{this.state.selectedHouse.currentLord}</td>
            </tr>
            <tr>
              <th scope="col">heir</th>
              <td>{this.state.selectedHouse.heir}</td>
            </tr>
            <tr>
              <th scope="col">overlord</th>
              <td>{this.state.selectedHouse.overlord}</td>
            </tr>
            <tr>
              <th scope="col">founded</th>
              <td>{this.state.selectedHouse.founded}</td>
            </tr>
            <tr>
              <th scope="col">founder</th>
              <td>{this.state.selectedHouse.founder}</td>
            </tr>
            <tr>
              <th scope="col">died out</th>
              <td>{this.state.selectedHouse.diedOut}</td>
            </tr>
            <tr>
              <th scope="col">ancestral weapons</th>
              <td>{this.state.selectedHouse.ancestralWeapons}</td>
            </tr>
            <tr>
              <th scope="col">cadet branches</th>
              <td>{this.state.selectedHouse.cadetBranches}</td>
            </tr>
            <tr>
              <th scope="col">sworn members</th>
              <td>{this.state.selectedHouse.swornMembers}</td>
            </tr>
            <tr>
              <th scope="col">url</th>
              <td>{this.state.selectedHouse.url}</td>
            </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    );
  }
}

export default App;
