/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Form, Button, Table, Icon, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
       
        const data = this.props.experienceData
        this.state = {
            showEditSection: false,
            newExperience:{
                company : '',
                position : '',
                responsibilities : '',
                start: moment(),
                end: moment()
            },
            isStatusClicked: null,
            experienceList: data
        }
        
        this.saveContact = this.saveContact.bind(this)
        this.saveRowContact = this.saveRowContact.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.openRowEdit = this.openRowEdit.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.closeRowEdit = this.closeRowEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleRowChange = this.handleRowChange.bind(this)
        this.handleRowDateChange = this.handleRowDateChange.bind(this)
    }

    componentDidUpdate(prevProps){
        if (this.props.experienceData !== prevProps.experienceData) {
            const experienceData = JSON.parse(JSON.stringify(this.props.experienceData))
            this.setState ({
                experienceList: experienceData
            })
        }
    }

    handleDateChange(date,name){
        const experienceCopy = Object.assign({}, this.state.newExperience)
        experienceCopy[name] = date
        this.setState({
                newExperience: experienceCopy
        })
        // console.log(experienceCopy)
    }

    handleRowDateChange(date,name,index){
        let experienceCopy = this.state.experienceList
        experienceCopy[index][name] = date
        this.setState({
            experienceList: experienceCopy
        })
    }

    handleChange(event) {
        const experienceCopy = Object.assign({}, this.state.newExperience)
        experienceCopy[event.target.name] = event.target.value
        this.setState({
            newExperience: experienceCopy
        })
        // console.log(experienceCopy)
    }

    handleRowChange(event,index) {
        let experienceCopy = this.state.experienceList
        experienceCopy[index][event.target.name] = event.target.value
        this.setState({
            experienceList: experienceCopy
        })
    }
    
    saveRowContact() {
        let data = this.state.experienceList
        let newData = {}
        newData['experience'] = data
        this.props.updateProfileData(newData)
        this.closeRowEdit()
    }

    saveContact() {
        let data = JSON.parse(JSON.stringify(this.props.experienceData))
        data.push(this.state.newExperience)
        this.setState({
            experienceList:data
        })
        let newData = {}
        newData['experience'] = data
        this.props.updateProfileData(newData)
        this.closeEdit()
    }

    openEdit() {
        this.setState({
            showEditSection: true
        })
    }

    openRowEdit(event, index){
        this.setState ({
            isStatusClicked: index,
        })
    }

    deleteRow(event, index){
        let data = JSON.parse(JSON.stringify(this.props.experienceData))
        data.splice(index,1)
        this.setState({
            experienceList:data
        })
        let newData = {}
        newData['experience'] = data
        this.props.updateProfileData(newData)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    closeRowEdit(){
        let data = JSON.parse(JSON.stringify(this.props.experienceData))
        this.setState ({
            isStatusClicked: null,
            experienceList: data
        })
    }

    render() {

        return(
            <div className='ui sixteen wide column'>
            {this.state.showEditSection ? 
            <div> 
                <Form.Group widths='equal'>
                    <Form.Input name = 'company' onChange={this.handleChange} fluid label='Company:' placeholder='Company' />
                    <Form.Input name = 'position' onChange={this.handleChange} fluid label='Position:' placeholder='Position' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Start Date:</label>
                        <DatePicker
                            selected={this.state.newExperience.start}
                            onChange={(date) => this.handleDateChange(date,'start')}
                            dateFormat="DD/MM/YYYY"
                            maxDate={moment()}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>End Date:</label>
                        <DatePicker
                            selected={this.state.newExperience.end}
                            onChange={(date) => this.handleDateChange(date,'end')}
                            dateFormat="DD/MM/YYYY"
                            maxDate={moment()}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Input name = 'responsibilities' onChange={this.handleChange} label='Responsibilities:' placeholder='Responsibilities' />
                <Form.Group>
                    <Button type="button" onClick={this.saveContact} secondary>Add</Button> 
                    <Button onClick={this.closeEdit}>Cancel</Button> 
                </Form.Group>
            </div>
            : null}
            
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                            <Table.HeaderCell>Start</Table.HeaderCell>
                            <Table.HeaderCell>End</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'><Button type="button" secondary onClick={this.openEdit}>+ Add New</Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                    {this.props.experienceData.map((item, i) => !(this.state.isStatusClicked == i) ? 

                        (<Table.Row key={i} >
                             <Table.Cell>{item.company}</Table.Cell>
                             <Table.Cell>{item.position}</Table.Cell>
                             <Table.Cell>{item.responsibilities}</Table.Cell>
                             <Table.Cell>{moment(item.start).format("Do MMM, YYYY")}</Table.Cell>
                             <Table.Cell>{moment(item.end).format("Do MMM, YYYY")}</Table.Cell>
                             <Table.Cell textAlign='right'>
                                 <Icon name='pencil alternate' onClick={() => this.openRowEdit(event, i)}></Icon>
                                 <Icon name='cancel' onClick={() => this.deleteRow(event, i)}/>
                             </Table.Cell>
                         </Table.Row>
                         ):(
                            <Table.Row key={i} >
                                <Table.Cell collapsing colSpan={6}>
                                    <Form.Group widths='equal'>
                                        <Form.Input 
                                        value = {this.state.experienceList[i]['company']} 
                                        name = 'company' 
                                        onChange = {(event)=>this.handleRowChange(event,i)} 
                                        fluid 
                                        label='Company:' 
                                        placeholder='Company' />
                                        <Form.Input 
                                        value = {this.state.experienceList[i]['position']} 
                                        name = 'position' 
                                        onChange={(event)=>this.handleRowChange(event,i)} 
                                        fluid label='Position:' 
                                        placeholder='Position' />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Start Date:</label>
                                            <DatePicker
                                                selected={moment(this.state.experienceList[i]['start'])}
                                                onChange={(date) => this.handleRowDateChange(date,'start',i)}
                                                dateFormat="DD/MM/YYYY"
                                                maxDate={moment()}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>End Date:</label>
                                            <DatePicker
                                                selected={moment(this.state.experienceList[i]['end'])}
                                                onChange={(date) => this.handleRowDateChange(date,'end',i)}
                                                dateFormat="DD/MM/YYYY"
                                                maxDate={moment()}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Input 
                                    value = {this.state.experienceList[i]['responsibilities']} 
                                    name = 'responsibilities' 
                                    onChange={(event)=>this.handleRowChange(event,i)}  
                                    label='Responsibilities:' 
                                    placeholder='Responsibilities' />
                                    <Form.Group>
                                        <Button type="button" onClick={this.saveRowContact} secondary>Update</Button> 
                                        <Button onClick={this.closeRowEdit}>Cancel</Button> 
                                    </Form.Group>
                                </Table.Cell>
                            </Table.Row>
                         )
                    )}
                    </Table.Body>
                </Table>
            </div>
        )
        
    }
}
