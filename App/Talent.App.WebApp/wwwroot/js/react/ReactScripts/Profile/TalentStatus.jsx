import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);


       this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e, { value }){
        this.props.saveProfileData({jobSeekingStatus:{status:value,availablesDate:null}})
    }

    render() {
        return(
            <div className='ui sixteen wide column'>
                <Form.Field>
                <label>Current Status</label>
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='Actively looking for a job'
                    name='checkboxRadioGroup'
                    value='Actively looking for a job'
                    checked={(this.props.status == null ? '' : this.props.status.status) == 'Actively looking for a job'}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='Not looking for a job at the momment'
                    name='checkboxRadioGroup'
                    value='Not looking for a job at the momment'
                    checked={(this.props.status == null ? '' : this.props.status.status)  == 'Not looking for a job at the momment'}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='Currently employed but open to offers'
                    name='checkboxRadioGroup'
                    value='Currently employed but open to offers'
                    checked={(this.props.status == null ? '' : this.props.status.status)  == 'Currently employed but open to offers'}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='Will be available on later date'
                    name='checkboxRadioGroup'
                    value='Will be available on later date'
                    checked={(this.props.status == null ? '' : this.props.status.status)  == 'Will be available on later date'}
                    onChange={this.handleChange}
                />
                </Form.Field>
            </div>
        )
    }
}