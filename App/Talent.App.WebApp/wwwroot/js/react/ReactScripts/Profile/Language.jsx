/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Form, Button, Table, Icon, Dropdown } from 'semantic-ui-react';
import { languageOptions } from '../Employer/common.js'


export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const data = this.props.languageData
        this.state = {
            showEditSection: false,
            newLanguage:{
                name:'',
                level:''
            },
            isStatusClicked: null,
            languageList: data
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
    }

    componentDidUpdate(prevProps){
        if (this.props.languageData !== prevProps.languageData) {
            const languageData = JSON.parse(JSON.stringify(this.props.languageData))
            this.setState ({
                languageList: languageData
            })
        }
    }

    
    handleChange(event,data) {
        const languageCopy = Object.assign({}, this.state.newLanguage)
        languageCopy[data] = event
        this.setState({
            newLanguage: languageCopy
        })
    }

    handleRowChange(event,data,index) {
        let languageCopy = this.state.languageList
        languageCopy[index][data] = event
        this.setState({
            languageList: languageCopy
        })
    }
    
    saveRowContact() {
        let data = this.state.languageList
        let newData = {}
        newData['languages'] = data
        this.props.updateProfileData(newData)
        this.closeRowEdit()
    }

    saveContact() {
        let data = JSON.parse(JSON.stringify(this.props.languageData))
        data.push(this.state.newLanguage)
        this.setState({
            languageList:data
        })
        let newData = {}
        newData['languages'] = data
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
        let data = JSON.parse(JSON.stringify(this.props.languageData))
        data.splice(index,1)
        this.setState({
            languageList:data
        })
        let newData = {}
        newData['languages'] = data
        this.props.updateProfileData(newData)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    closeRowEdit(){
        let data = JSON.parse(JSON.stringify(this.props.languageData))
        this.setState ({
            isStatusClicked: null,
            languageList: data
        })
    }

    render() {
        const languageLevel = [
            {key: 'Basic', value: 'Basic', text: 'Basic'},
            {key: 'Conversational', value: 'Conversational', text: 'Conversational'},
            {key: 'Fluent', value: 'Fluent', text: 'Fluent'},
            {key: 'Native/Bilingual', value: 'Native/Bilingual', text: 'Native/Bilingual'}
        ]
        let addInput;
        if (this.state.showEditSection){
            addInput = (
                <Form.Group>
                <Form.Dropdown
                    onChange = {(e,{value})=>this.handleChange(value, 'name')} 
                    width={5}
                    placeholder='Add Language' 
                    search 
                    selection
                    options={languageOptions}/>   
                <Form.Dropdown
                    onChange = {(e,{value})=>this.handleChange(value, 'level')} 
                    width={5}
                    placeholder='Language Level' 
                    search 
                    selection
                    options={languageLevel}/>
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
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'><Button type="button" secondary onClick={this.openEdit}>+ Add New</Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                    {this.props.languageData.map((item, i) => !(this.state.isStatusClicked == i) ? 
                    
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
                                    <Dropdown
                                    onChange = {(e,{value})=>this.handleRowChange(value, 'name',i)} 
                                    placeholder='Add Language'
                                    value={this.state.languageList[i]['name']} 
                                    search 
                                    selection
                                    options={languageOptions}/>  
                                </Table.Cell>
                                <Table.Cell width={4}>
                                    <Dropdown
                                    onChange = {(e,{value})=>this.handleRowChange(value, 'level',i)} 
                                    placeholder='Language Level'
                                    value={this.state.languageList[i]['level']} 
                                    search 
                                    selection
                                    options={languageLevel}/> 
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