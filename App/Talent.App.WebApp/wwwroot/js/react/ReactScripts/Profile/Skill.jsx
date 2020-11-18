/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Form, Button, Table, Icon, Dropdown, Input } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.skillData
        this.state = {
            showEditSection: false,
            newSkill:{
                name:'',
                level:''
            },
            isStatusClicked: null,
            skillList: data
        }
        
        this.saveContact = this.saveContact.bind(this)
        this.saveRowContact = this.saveRowContact.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.openRowEdit = this.openRowEdit.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.closeRowEdit = this.closeRowEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRowChange = this.handleRowChange.bind(this)
    };

    componentDidUpdate(prevProps){
        if (this.props.skillData !== prevProps.skillData) {
            const skillData = JSON.parse(JSON.stringify(this.props.skillData))
            this.setState ({
                skillList: skillData
            })
        }
    }

    
    handleChange(event,data) {
        const skillCopy = Object.assign({}, this.state.newSkill)
        skillCopy[data] = event
        this.setState({
            newSkill: skillCopy
        })
    }

    handleRowChange(event,data,index) {
        let skillCopy = this.state.skillList
        skillCopy[index][data] = event
        this.setState({
            skillList: skillCopy
        })
    }
    
    saveRowContact() {
        let data = this.state.skillList
        let newData = {}
        newData['skills'] = data
        this.props.updateProfileData(newData)
        this.closeRowEdit()
    }

    saveContact() {
        let data = JSON.parse(JSON.stringify(this.props.skillData))
        data.push(this.state.newSkill)
        this.setState({
            skillList:data
        })
        let newData = {}
        newData['skills'] = data
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
        let data = JSON.parse(JSON.stringify(this.props.skillData))
        data.splice(index,1)
        this.setState({
            skillList:data
        })
        let newData = {}
        newData['skills'] = data
        this.props.updateProfileData(newData)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    closeRowEdit(){
        let data = JSON.parse(JSON.stringify(this.props.skillData))
        this.setState ({
            isStatusClicked: null,
            skillList:data
        })
    }

    render(){
        const skillLevel = [
            {key: 'Beginner', value: 'Beginner', text: 'Beginner'},
            {key: 'Intermediate', value: 'Intermediate', text: 'Intermediate'},
            {key: 'Expert', value: 'Expert', text: 'Expert'}
        ]
        let addInput;
        if (this.state.showEditSection){
            addInput = (
                <Form.Group>
                <Form.Input
                    onChange = {(e,{value})=>this.handleChange(value, 'name')} 
                    width={5}
                    placeholder='Add Skill' />   
                <Form.Dropdown
                    onChange = {(e,{value})=>this.handleChange(value, 'level')} 
                    width={5}
                    placeholder='Skill Level' 
                    search 
                    selection
                    options={skillLevel}/>
                <Button type="button" onClick={this.saveContact} secondary>Add</Button> 
                <Button onClick={this.closeEdit}>Cancel</Button> 
            </Form.Group> 
            )
        }
        return(
            <div className='ui sixteen wide column'>
            {addInput}
            
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Skill</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'><Button type="button" secondary onClick={this.openEdit}>+ Add New</Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                    {this.props.skillData.map((item, i) => !(this.state.isStatusClicked == i) ? 
                    
                        (<Table.Row key={i} >
                             <Table.Cell>{item.name}</Table.Cell>
                             <Table.Cell>{item.level}</Table.Cell>
                             <Table.Cell textAlign='right'>
                                 <Icon name='pencil alternate' onClick={() => this.openRowEdit(event, i)}></Icon>
                                 <Icon name='cancel' onClick={() => this.deleteRow(event, i)}/>
                             </Table.Cell>
                         </Table.Row>
                         ):(
                            <Table.Row key={i} >
                                <Table.Cell width={4}>
                                    <Input
                                    onChange = {(e,{value})=>this.handleRowChange(value, 'name',i)} 
                                    placeholder='Add Skill'
                                    value={this.state.skillList[i]['name']} />  
                                </Table.Cell>
                                <Table.Cell width={4}>
                                    <Dropdown
                                    onChange = {(e,{value})=>this.handleRowChange(value, 'level',i)} 
                                    placeholder='Skill Level'
                                    value={this.state.skillList[i]['level']} 
                                    search 
                                    selection
                                    options={skillLevel}/> 
                                </Table.Cell>
                                <Table.Cell>
                                    <Button basic color='blue' onClick={this.saveRowContact}>Update</Button>
                                    <Button basic color='red' onClick={this.closeRowEdit}>Cancel</Button>
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
   

