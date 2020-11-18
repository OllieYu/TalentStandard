import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, Grid, Button, Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            dateInputOpen: false,
            visaType: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.saveChange = this.saveChange.bind(this)
    }

    componentDidUpdate(prevProps){
        if (this.props.visaStatus !== prevProps.visaStatus) {
            if(this.props.visaStatus == 'Work Visa' || this.props.visaStatus == 'Student Visa'){
                this.setState({
                    dateInputOpen : true
                })
            }
        }
    }

    handleChange(value){
        if(value == 'Work Visa' || value == 'Student Visa'){
            this.setState({
                dateInputOpen : true,
                visaType : value
            })
            let data = {}
            data['visaStatus'] = value
            data['visaExpiryDate'] = moment()
            this.props.updateProfileData(data)
        }else{
            let data = {}
            data['visaStatus'] = value
            data['visaExpiryDate'] = null
            this.props.saveProfileData(data)
            this.setState({
                dateInputOpen : false
            }) 
        }
    }

    handleDateChange(date){
        let data = {}
        data['visaExpiryDate'] = date
        this.props.updateProfileData(data)
    }

    saveChange(){
        let data = {}
        data['visaStatus'] = this.state.visaType
        data['visaExpiryDate'] = this.props.visaExpiryDate
        this.props.saveProfileData(data)

    }

    render() {
        const VisaStatus = [
            {key: 'Citizen', value: 'Citizen', text: 'Citizen'},
            {key: 'Permanent Resident', value: 'Permanent Resident', text: 'Permanent Resident'},
            {key: 'Work Visa', value: 'Work Visa', text: 'Work Visa'},
            {key: 'Student Visa', value: 'Student Visa', text: 'Student Visa'}
        ]
        const visatype = this.props.visaStatus ? this.props.visaStatus : ''
        const visaExpiryDate = this.props.visaExpiryDate ? moment(this.props.visaExpiryDate) : moment()
      return(
        <div className='ui sixteen wide column'>
                <Form.Group>
                <Form.Field width={5}>
                    <div className="field">
                        <label>Visa type</label>
                        <Dropdown
                        onChange = {(e,{value})=>this.handleChange(value)} 
                        placeholder='Select your visa status'
                        value = {visatype} 
                        search 
                        selection
                        options={VisaStatus}/>
                    </div>
                </Form.Field>
                {this.state.dateInputOpen ?
                <Form.Field>
                    <label>Visa expiry date</label>
                    <DatePicker
                        selected={visaExpiryDate}
                        onChange={(date) => this.handleDateChange(date)}
                        dateFormat="DD/MM/YYYY"
                        minDate={moment()}
                    />
                </Form.Field>
                :null}
                {this.state.dateInputOpen ?
                <Form.Field>
                    <label>&nbsp;</label>
                    <Button type="button" onClick={this.saveChange} secondary>Save</Button> 
                </Form.Field>
                :null}
                </Form.Group>

        </div>
      )
    }
}