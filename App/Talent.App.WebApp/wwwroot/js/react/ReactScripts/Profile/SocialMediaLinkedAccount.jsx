/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const details = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }    
        this.state = {
            showEditSection : false,
            newContact: details
        }

        this.handleChange = this.handleChange.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.validateURL = this.validateURL.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
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

    saveContact() {
            let data = {}
            data['linkedAccounts'] = this.state.newContact
            console.log(data)
            this.props.saveProfileData(data)
            this.closeEdit()
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }
    
    validateURL(textval) {
        var urlregex = new RegExp( "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return urlregex.test(textval);
    }

    renderEdit(){
        return(
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newContact.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Linkedln Url"
                    errorMessage="Please enter a valid Linkedln Url"
                    isError={!this.validateURL(this.state.newContact.linkedIn)}
                />
                <ChildSingleInput
                    inputType="text"
                    label="Github"
                    name="github"
                    value={this.state.newContact.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter a valid Github Url"
                    isError={!this.validateURL(this.state.newContact.github)}
                />
                <button disabled={!this.validateURL(this.state.newContact.github) || !this.validateURL(this.state.newContact.linkedIn)} type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay(){
        return(
            <div className="ui sixteen wide column">

                <Button type="button" style={{ minWidth:"12rem" }} icon='linkedin' content='LinkedIn' primary onClick={()=>window.open(`${this.props.linkedAccounts.linkedIn}`)}/>
                <Button type="button" style={{ minWidth:"12rem", marginLeft:'2rem'}} icon='github' content='Github' secondary onClick={()=>window.open(`${this.props.linkedAccounts.github}`)}/>
                <Button floated='right' content='Edit' secondary onClick={this.openEdit}/>

            </div>
        )
    }

    render() {
        return(
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

}