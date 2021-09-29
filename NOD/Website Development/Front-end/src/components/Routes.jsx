import React, {useState, useEffect} from 'react'

import { Route, Switch } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import Dashboard from '../pages/Dashboard'
import Login from '../pages/login'

import Area1 from '../pages/Area1'
import Configuration from '../pages/Configuration'
import ForgotPassword from '../pages/ForgotPassword'
import Settings from '../pages/Settings'
import firebase from '../config/firebase';
import { useDispatch } from 'react-redux'
import { fetchSensorConfig } from '../redux/actions/sensorConfig';

const database = firebase.database();

const Routes = () => {
    const dispatch = useDispatch();

    async function fetchFeeds() {
        const endPoint = 'https://api.thingspeak.com/channels/1449821/feeds.json?results=1';
        const response = await fetch(endPoint);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { feeds } = responseJSON;
        await database.ref(`sensorFeeds`).push(feeds);
        dispatch({type: 'FETCH_FEEDS', feeds});
    }

    const fetchConfig = async () => {
        const snapshot = await database.ref(`sensorConfig`).once('value');
            const config = [];
            snapshot.forEach((childSnapshot) => {
                config.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
            });
        });
        return config[0];
    };

    useEffect(() => {
        fetchFeeds();
        fetchConfig().then((config) => {
            dispatch(fetchSensorConfig(config));
            setTimeout(() => setIsLoading(false), 300);
            setInterval(fetchFeeds, config.timeInterval ? config.timeInterval * 1000 : 60000);
        });
    }, [])

    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
        {
            isLoading &&
            <Loader active large content="Loading..." />
        }
        { !isLoading && 
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' exact render={routeProps => (<Dashboard {...routeProps} />)} />
                <Route path='/Configuration'  render={routeProps => (<Configuration {...routeProps} />)} />
                <Route path='/Area1' render={routeProps => (<Area1 {...routeProps} />)} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <Route path='/settings' component={Settings} />
            </Switch> 
        }
        </>
    )
}

export default Routes
