import React from 'react';
import './SendRepForm.css';


class SendRepForm extends React.Component {


    render() {
        const subject = 'Climate Action';

        if(this.props.show_reps === 0) {
            return null;
        } else {
            
            return (
            <div className="SearchResults">
                <div className='reps'>
                <div className= 'reps_data'>
                    <h1>Your Gov Rep's Include:</h1>
                    <br></br><br></br>
                <ol>
                    {
                        this.props.names.map((item,i) => <li key={i}>{item}</li>)
                    }
                </ol>
                </div>
</div>

<a href={`mailto:${this.props.emails}?subject=${subject}&body=${this.props.email_body}`}>
<button className="SearchButton">Contact Your Rep's</button>
</a>



                

            </div>
        )
    }
}
}

export default SendRepForm;



