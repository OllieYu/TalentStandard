import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Label, Image, Grid, Header, List, Embed } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       this.state={
           isOpen:false
       }

       this.open = this.open.bind(this)
    };

    open(){
        this.setState({
            isOpen:true
        })
    }
    
    render() {
        
        return(
        <Card fluid>
            <Card.Content>
            <Card.Header>Ru(Talent)Ng<Icon link style={{float:'right'}} name='favorite'/></Card.Header>
            </Card.Content>

            {this.state.isOpen ?
            <Card.Content>
            <Grid>
            <Grid.Column width={8}>
            <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped />
            </Grid.Column>
            <Grid.Column width={8}>
            <Header as='h3'>Talent snapshot</Header>
            <List>
                <List.Item>
                <List.Header>CURRENT EMPLOYER</List.Header>
                ABC
                </List.Item>
                <List.Item>
                <List.Header>VISA STATUS</List.Header>
                Citizen
                </List.Item>
                <List.Item>
                <List.Header>POSITION</List.Header>
                Software Developer
                </List.Item>
            </List>
            </Grid.Column>
            </Grid>
            </Card.Content>

            :
            <Embed
                url={null}
            />
            }

            <Card.Content>
                <Grid textAlign={"center"}>
                <Grid.Column width={4}>
                {this.state.isOpen ? 
                <Icon link onClick={()=>this.setState({isOpen:false})} name='video' size='large'/>
                :<Icon link name='user' size='large' onClick={()=>this.setState({isOpen:true})}/>}
                </Grid.Column>
                <Grid.Column width={4}>
                <Icon name='file pdf outline' size='large'/>
                </Grid.Column>
                <Grid.Column width={4}>
                <Icon name='linkedin' size='large'/>
                </Grid.Column>
                <Grid.Column width={4}>
                <Icon name='github' size='large'/>
                </Grid.Column>
                </Grid>
            </Card.Content>
            <Card.Content extra>
            <Label basic color='blue'>
                C#
            </Label>
            </Card.Content>
        </Card>
        
        )
    }
}

