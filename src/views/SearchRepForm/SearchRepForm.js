import React from 'react';
import './SearchRepForm.css'


class SearchRepForm extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.capitalize = this.capitalize.bind(this)
    }

    search() {
        console.log('show reps')
        this.props.onSearch(1);
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    

    render() {

        if(this.props.name === '' || this.props.show_reps !== 0) {
            return null;
        } else {
        
        if(this.props.temp >= 0) {

            if(this.props.reps.length < 1 ) {

                return (
                    <div className="SearchResults">
                    <div className='temp_data'>
                        <h1>{this.capitalize(this.props.name)}, the average minimum temperature in {this.capitalize(this.props.city)} this week is <strong>{this.props.temp.toFixed(2)}°</strong> above the historical average for the month.</h1>
                    </div>
                    <div className='facts'>
                        <div className='facts_data'>
                        <h1>A permanent increase of {this.props.temp.toFixed(2)}° would lead to:<br></br><br></br></h1>
                        <ol>
                        <li>{this.props.facts[0]}<br></br><br></br></li>
                        <li>{this.props.facts[1]}<br></br><br></br></li>
                        <li>{this.props.facts[2]}<br></br><br></br></li>
                        </ol>
                        <h3>{this.props.facts[3]}</h3>
                        </div>
                    </div> 
                        <button className="InvalidSearchButton" disabled>..Searching For Your Gov Rep's..</button>
                    </div>
                )

            } else {

                return (
                    <div className="SearchResults">
                    <div className='temp_data'>
                        <h1>{this.capitalize(this.props.name)}, the average minimum temperature in {this.capitalize(this.props.city)} this week is <strong>{this.props.temp.toFixed(2)}°</strong> above the historical average for the month.</h1>
                    </div>
                    <div className='facts'>
                        <div className='facts_data'>
                        <h1>A permanent increase of {this.props.temp.toFixed(2)}° would lead to:<br></br><br></br></h1>
                        <ol>
                        <li>{this.props.facts[0]}<br></br><br></br></li>
                        <li>{this.props.facts[1]}<br></br><br></br></li>
                        <li>{this.props.facts[2]}<br></br><br></br></li>
                        </ol>
                        <h3>{this.props.facts[3]}</h3>
                        </div>
                    </div> 
                        <button className="SearchButton" onClick={this.search}>Show Your Gov Rep's</button>
                    </div>
                )


            }
     
        } else {
            return (
                <div className="SearchResults">
                     <div className='no_data'>
                    <h1>The temperature in {this.capitalize(this.props.city)} is cool this week - no need to stress! Give us another check next week {this.capitalize(this.props.name)}!</h1>  
                     </div>
                </div>
            )
        }
    }
    }
}

export default SearchRepForm;