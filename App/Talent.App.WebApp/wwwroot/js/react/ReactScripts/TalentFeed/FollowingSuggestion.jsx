import React from 'react';
import { Card, Item, Button, Icon } from 'semantic-ui-react';

export default class FollowingSuggestion extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                <Card.Header textAlign="center">Follow Talent</Card.Header>
                <Item.Group >
                    <Item>
                        <Item.Image circular size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                        <Item.Content verticalAlign='middle'>
                        <a>Veronika Ossi</a>
                        <Button basic primary><Icon name='user' />Follow</Button>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Image circular size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                        <Item.Content verticalAlign='middle'>
                        <a>Veronika Ossi</a>
                        <Button basic primary><Icon name='user' />Follow</Button>
                        </Item.Content>
                    </Item>
                </Item.Group>
                </Card.Content>
            </Card>
            // <div className="content">
            //     <div className="center aligned header">Follow Talent</div>
            //     <div className="ui items following-suggestion">
            //         <div className="item">
            //             <div className="ui image">
            //                 <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
            //             </div>
            //             <div className="content">
            //                 <a className="">Veronika Ossi</a>
            //                 <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
            //             </div>
            //         </div>
            //         <div className="item">
            //             <div className="ui image">
            //                 <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
            //             </div>
            //             <div className="content">
            //                 <a className="">Veronika Ossi</a>
            //                 <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}