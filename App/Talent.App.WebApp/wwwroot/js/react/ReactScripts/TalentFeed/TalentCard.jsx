import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Label, Tab, Item, Image } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       
    };

    
    
    render() {
        
        return(
        <Card fluid>
            <Card.Content header='Ru(Talent)Ng'/>
            <Item.Header>
            <Icon name='favorite'/>
            </Item.Header>
            <br/>
            <Image size='medium' src='/images/avatar/large/matthew.png' wrapped />
            <Card.Content description='123' />
            <Card.Content extra>

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

