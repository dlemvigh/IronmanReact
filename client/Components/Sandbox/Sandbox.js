import React from 'react'
import Relay from 'react-relay'

class MyRoute extends Relay.Route {
    static queries = {
        users: () => Relay.QL`
            query {
                users
            }
        `
    }
    static routeName = "MyRoute";
}

 class MyComp extends React.Component {
     render(){
         return <span>x</span>;
     }
 }

 const MyContainer = Relay.createContainer(MyComp, {
     fragments: {
         users: () => Relay.QL`
            fragment on User {
                name
            }
         `
     }
 })



                // <Relay.RootContainer
                //     Component={MyContainer}
                //     route={new MyRoute()}
                //     />
export default class Sanbox extends React.Component {
    render() {
        return (
            <div>
                <h3>Sandbox</h3>
                <Relay.RootContainer
                    Component={MyContainer}
                    route={new MyRoute()}
                    />
            </div>
        );
    }
}