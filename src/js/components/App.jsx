import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home'



 class App extends Component{
    state = {
        test:''
    }

    componentDidMount(){
        if(process.env.NODE_ENV === 'production'){
            if(window.navigator.serviceWorker){
                window.navigator.serviceWorker.register('/service-worker')
                .then(register=>console.log('service worker registered successfully',register))
                .catch(e=>console.log('error comes in registering the service worker',e))
            }
        }
    }

    render(){
        return (
            <div className="jumbotron">
                <div className="container">This is the app component</div>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        )
    }
}

export default App