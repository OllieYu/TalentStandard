/* Self introduction section */
import React, { Component } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import Cookies from 'js-cookie';
import { Input, Form, TextArea ,Header, Label} from 'semantic-ui-react';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summary : '',
            description : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
    };

    handleChange(event) {
        const data = Object.assign({}, this.props)
        data[event.target.name] = event.target.value
        this.setState({
            summary : data.summary,
            description : data.description
        })
        this.props.updateWithoutSave(data)
        
    }

    saveContact() {
        this.props.updateProfileData(this.state)
    }

    render() {
        let summary = this.props.summary ? this.props.summary : ""
        let description = this.props.description ? this.props.description : ""
        return(
            <div className='ui sixteen wide column field'>
                <Input
                name = 'summary'    
                fluid 
                value = {summary} 
                onChange = {this.handleChange}
                placeholder = 'Please provide a short summary about yourself' />
                <label>Summary must be no more than 150 characters.</label>
                <br/>
                <TextArea 
                value={description}
                name = 'description'
                onChange = {this.handleChange}
                placeholder="Please tell us about any hobbies,additional expertise,or anything lese you'd like to add. " style={{ minHeight: 150 }} />
                <label>Description must be between 150-600 characters.</label>
                <button disabled = {!(summary.length < 150) || !(description.length > 150) || !(description.length < 600)} type="button" className="ui teal button right floated" onClick={this.saveContact}>Save</button>
            </div>
        )
    }
}



