import React from 'react'
import './SearchClimateForm.css';

class SearchClimateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            postcode: '',
            country: 'Australia',
        }
        
        this.search = this.search.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
       this.handleValidation = this.handleValidation.bind(this)

    }

    search() {
        if(this.handleValidation()){
            this.props.onSearch(this.state.name, this.state.city, this.state.postcode, this.state.country);
        } else {

            alert(`Search Form has errors. Try again!`)
        }
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleCityChange(event) {
        this.setState({city: event.target.value})
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value})
    }

    handlePostalCodeChange(event) {
        this.setState({postcode: event.target.value})
    }
    

    handleValidation() {

        let formIsValid = true;

        //Name
        if(!this.state.name){
           formIsValid = false;
        
        }

        if(typeof this.state.name !== "undefined"){
            if(!this.state.name.match(/^[a-zA-Z]+$/)){
               formIsValid = false;
            
            }        
         }

         //city
         if(!this.state.city){
            formIsValid = false;
         

         }
 
         if(typeof this.state.city !== "undefined"){
             if(!this.state.city.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
      
             }        
          }

          //postcode
          if(!this.state.postcode){
            formIsValid = false;
          }

            if(typeof this.state.postcode !== "undefined"){
                if(!this.state.postcode.match(/^[0-9]+$/)){
                   formIsValid = false;
                }        
             }
       
         
 
    
          
        // this.setState({errors: errors});
         return formIsValid;
    }



    


    render() {

            if(this.props.temp !== 0) {
                return null;
            } else {
                return (
                    <div className="SearchBar">
                        <div className="climate_inputs">
                         <input placeholder="Your Name:" onChange={this.handleNameChange} autoComplete="new-password"/>
                         <input placeholder="Your City:" onChange={this.handleCityChange} autoComplete="new-password"/>
                         <input placeholder="Your Postal Code:" onChange={this.handlePostalCodeChange} autoComplete="new-password"/>
                         <select>
                            <option value="Australia" onChange={this.handleCountryChange}>Australia</option>
                        </select>
                        </div>
                        <button className="SearchButton" onClick={this.search}>Check Climate Data</button>
                    </div>
                )
            }
     
    }
}

export default SearchClimateForm; 
