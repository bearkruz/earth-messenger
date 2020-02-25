import React from 'react';
import './App.css';
import SearchClimateForm from '../SearchClimateForm/SearchClimateForm'
import SearchRepForm from '../SearchRepForm/SearchRepForm'
import SendRepForm from '../SendRepForm/SendRepForm'
import Processes from '../../util/Processes'


import { GoogleMap, LoadScript } from '@react-google-maps/api'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: [-25, 168],
      name: '',
      city: '',
      postcode: '',
      country: '',
      zoom: 4,
      tempAnomaly: 0,
      temp: 0,
      repNames: [],
      repEmails: [],
      email_body: "",
      facts: [],
      show_reps: 0
    };


    this.search = this.search.bind(this);
    this.searchRep = this.searchRep.bind(this);
  }
  

  search(name, city, postcode, country) {
    Processes.get_lat_long(city, country).then(
      geo_details => {
      return Processes.get_climate_data(geo_details)}).then(
        details => {
        console.log(details);
        this.setState({temp: details.temp.temp_anomaly})
        this.setState({name: name})
        this.setState({postcode: postcode})
        this.setState({zoom: 10})
        this.setState({city: details.geo.city})
        this.setState({country: country})
        this.setState({location: [details.geo.lat, details.geo.lng +0.4]})

        if (this.state.temp >= 0) {
        Processes.three(this.state.postcode).then(details => {
        this.setState({repNames: details.names})
        this.setState({repEmails: details.emails})
        })
        Processes.get_facts(this.state.temp).then(facts => {
          this.setState({facts: facts})
          Processes.get_email_body(this.state.name, this.state.city, this.state.temp, this.state.facts).then(email_body => {
            this.setState({email_body: email_body})
          })
        })
        } 
      })
  }

   searchRep(num) {
    this.setState({show_reps: 1})
  }


    //map

  render() {
    return (
      <code>Runtime env var example: { process.env.REACT_APP_HELLO }</code>
    <div>
      <div className="App">

        <div className='interface'>
          <SearchClimateForm onSearch={this.search} temp={this.state.temp}/> 
          <SearchRepForm name={this.state.name} city={this.state.city} postcode={this.state.postcode} country={this.state.country} temp={this.state.temp} facts ={this.state.facts} show_reps={this.state.show_reps} onSearch={this.searchRep} reps={this.state.repNames}/>
         <SendRepForm names={this.state.repNames} emails={this.state.repEmails} email_body={this.state.email_body} show_reps={this.state.show_reps} />
        </div>

        <LoadScript
            googleMapsApiKey = {process.env.GOOGLE_KEY}
        >
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "100vh",
              width: "100%"
            }}
            zoom={this.state.zoom}
            center={{
              lat: this.state.location[0],
              lng: this.state.location[1]
            }}
          />
        </LoadScript>
      </div>
   </div>
    )
  }
}


export default App;

