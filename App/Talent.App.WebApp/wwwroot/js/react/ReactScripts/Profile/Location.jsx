import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid, Dropdown } from 'semantic-ui-react';
import { Country, City } from '../Employer/CreateJob/Location.jsx';
import { countryOptions } from '../Employer/common.js'

export class Address extends React.Component {
    constructor(props) {
        super(props)
        
        const details = props.addressData ?
        Object.assign({}, props.addressData)
        : {
            city: "",
            country: "",
            number: "",
            postCode: "",
            street: "",
            suburb: ""
        }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
        console.log(data)
    }

    saveContact() {
        let data = {}
        data['address'] = this.state.newContact
        this.props.saveProfileData(data)
        this.closeEdit()
        console.log(data)
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let address = { city: '', country: '' }
        if (this.state.newContact) {
            address = this.state.newContact
        }
        return (
            <div className='ui sixteen wide column'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.newContact.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter an street number"
                                errorMessage="Please enter a valid number"
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newContact.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter an street"
                                errorMessage="Please enter a valid street"
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newContact.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter an suburb"
                                errorMessage="Please enter a valid suburb"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Country location={address} handleChange={this.handleChange} countryWidth={6} source='talent'/>
                        <City location={address} handleChange={this.handleChange} cityWidth={6} source='talent'/>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Postcode"
                                name="postCode"
                                value={this.state.newContact.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter an postcode"
                                errorMessage="Please enter a valid postcode"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {this.props.addressData.number}, {this.props.addressData.street}, {this.props.addressData.suburb}, {this.props.addressData.postCode}</p>
                        <p>City: {this.props.addressData.city}</p>
                        <p>Country: {this.props.addressData.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let textData = {}
        textData['nationality'] = event.target.textContent
        this.props.saveProfileData(textData)
        console.log(event.target.textContent)
    }
    
    render() {
        const nationality = this.props.nationalityData ? countryOptions.find(text=>text.text==this.props.nationalityData).value : ''

        return(
            <div className='ui sixteen wide column'>
                <Dropdown
                onChange = {this.handleChange} 
                style={{minWidth: '250px'}} 
                placeholder='Select your nationality' 
                search 
                selection
                value = {nationality}
                options={countryOptions}/>

            </div>
        )
        
    }
}