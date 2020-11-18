import React from 'react';
import { Loader, Card, Icon, Image, List} from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {        

        return(
            <Card >
            <Card.Content textAlign="center">
            <Image circular src='https://semantic-ui.com/images/wireframe/square-image.png' size='tiny'/>
            <br/>
            <br/>
            <Card.Header>MVP Studio?</Card.Header>
            <Card.Meta>
                <Icon name="marker"/>Auckland, NewZealand?
            </Card.Meta>
            <Card.Description>
                We currently do not have specific skills that we desire?
            </Card.Description>
            </Card.Content>
            <Card.Content extra >
                <List>
                    <List.Item>
                        <Icon name='phone' />
                        : 232323?
                    </List.Item>
                    <List.Item>
                        <Icon name='mail' />
                        : 11@11.com?
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
        )
    }
}