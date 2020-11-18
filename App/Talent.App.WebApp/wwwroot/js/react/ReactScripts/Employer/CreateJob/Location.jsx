import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Grid } from 'semantic-ui-react'
import { countries } from '../common.js'

export class Country extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }
    

    handleChange(event) {
        var data = Object.assign({}, this.props.location);
        //required
        const name = event.target.name;
        let value = event.target.value;

        data[name] = value;
        if (name == "country") {
            data["city"] = "";
        }
        if( this.props.source == 'employer'){
            var updateData = {
                target: { name: "location", value: data }
            }
        }
        
        if(this.props.source == 'talent'){
            var updateData = {
                target: { name: "country", value: value }
            }
        }
        
        //update props here
        this.props.handleChange(updateData);
    }

    render() {
        let countriesOptions = [];

        const selectedCountry = this.props.location.country;

        
        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);
        
    
    return(
                    <Grid.Column width={this.props.countryWidth}>
                    <div className="field">
                        <label>Country</label>
                    <select className="dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">
                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                    </div>
                    </Grid.Column>
        )
    }
    
}

export class City extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }
    

    handleChange(event) {
        var data = Object.assign({}, this.props.location);
        //required
        const name = event.target.name;
        let value = event.target.value;

        data[name] = value;

        if( this.props.source == 'employer'){
            var updateData = {
                target: { name: "location", value: data }
            }
        }

        if(this.props.source == 'talent'){
            var updateData = {
                target: { name: "city", value: value }
            }
        }

        //update props here
        this.props.handleChange(updateData);
    }

    render() {
        let citiesOptions = [];
        const selectedCountry = this.props.location.country;
        const selectedCity = this.props.location.city;
        

        citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {(selectedCountry != "" && selectedCountry != null ) && countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>) }
            </select><br/></span>
        
    
    return(
                    <Grid.Column width={this.props.cityWidth}>
                    <div className="field">
                        <label>City</label>
                        {citiesOptions}
                    </div>
                    </Grid.Column>         
        )
    }
    
}