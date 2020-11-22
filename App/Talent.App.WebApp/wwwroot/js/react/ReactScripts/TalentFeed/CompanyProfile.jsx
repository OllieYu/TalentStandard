import React from 'react';
import Cookies from 'js-cookie';
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
            <Card.Header>{this.props.details.name}</Card.Header>
            <Card.Meta>
                <Icon name="marker"/>{this.props.details.location.city}, {this.props.details.location.country}
            </Card.Meta>
            <Card.Description>
                We currently do not have specific skills that we desire?
            </Card.Description>
            </Card.Content>
            <Card.Content extra >
                <List>
                    <List.Item>
                        <Icon name='phone' />
                        : {this.props.details.phone}
                    </List.Item>
                    <List.Item>
                        <Icon name='mail' />
                        : {this.props.details.email}
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
        )
    }
}