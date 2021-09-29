import React from 'react'
import './page.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Button, Form, Message } from 'semantic-ui-react'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'

import ThemeAction from '../redux/actions/ThemeAction'
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase';
import { addConfig, editConfig } from '../redux/actions/sensorConfig';

const database = firebase.database();


const Configuration = (props) => {

    const themeReducer = useSelector(state => state.ThemeReducer)
    const sensorConfig = useSelector(state => state.sensorConfig);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("This function runs only on first Render")
        if (localStorage.getItem('museremail') === null || localStorage.getItem('museremail') === "" || localStorage.getItem('museremail') === "null") {
            history.push("/")
        }



        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, []);

    const handleChange = ({ target }) => setFormValues({ ...formValues, [target.name]: parseInt(target.value) });

    const onSubmit = async () => {
        try {
            setInProgress(true);
            if (formValues.id) {
                await database.ref(`sensorConfig/${formValues.id}`).update(formValues)
                dispatch(editConfig(formValues.id, formValues));
            } else {
                const ref = await database.ref(`sensorConfig`).push(formValues);
                dispatch(addConfig({ id: ref.key, ...formValues }));
            }
            setInProgress(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (e) {
            alert('An error occurred, please contact with the administrator.');
        }
    };

    const [formValues, setFormValues] = useState({
        id: sensorConfig.id || null,
        intervalScan: sensorConfig.intervalScan,
        noiseRed: sensorConfig.noiseRed,
        noiseGreen: sensorConfig.noiseGreen,
        noiseYellow: sensorConfig.noiseYellow,
        airRed: sensorConfig.airRed,
        airGreen: sensorConfig.airGreen,
        airYellow: sensorConfig.airYellow,
    });
    const [isSaved, setIsSaved] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const { intervalScan, noiseRed, noiseGreen, noiseYellow, airRed, airGreen, airYellow, tempRed, tempGreen, tempYellow } = formValues;
    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>

            <Sidebar {...props} />
            <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                    <h2 className="page-header">Configuration</h2>
                    <br />
                    {isSaved &&
                        <Message positive>
                            <Message.Header>Config saved successfully!</Message.Header>
                        </Message>
                    }
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <label>Interval Scan (s)</label>
                            <input name="intervalScan" value={intervalScan} onChange={handleChange} type="number" min="1" placeholder='Enter interval in seconds' />
                        </Form.Field>
                        <br />
                        <h3>Set the threshold display color: Good - Moderate - Unhealthy</h3>
                        <br />
                        <h4> Air Quality Level </h4> <br />
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Green threshold value</label>
                                <input name="airGreen" value={airGreen} onChange={handleChange} type="number" min="0" placeholder='Green threshold value in aqi' />
                            </Form.Field>
                            <Form.Field>
                                <label>Yellow threshold value</label>
                                <input name="airYellow" value={airYellow} onChange={handleChange} type="number" min="0" placeholder='Red threshold value in aqi' />
                            </Form.Field>
                            <Form.Field>
                                <label>Red threshold value</label>
                                <input name="airRed" value={airRed} onChange={handleChange} type="number" min="0" placeholder='Red threshold value in aqi' />
                            </Form.Field>
                        </Form.Group>
                        <h4> Noise Level </h4><br />
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Green threshold value</label>
                                <input name="noiseGreen" value={noiseGreen} onChange={handleChange} type="number" min="0" placeholder='Green threshold value in db' />
                            </Form.Field>
                            <Form.Field>
                                <label>Yellow threshold value</label>
                                <input name="noiseYellow" value={noiseYellow} onChange={handleChange} type="number" min="0" placeholder='Red threshold value in db' />
                            </Form.Field>
                            <Form.Field>
                                <label>Red threshold value</label>
                                <input name="noiseRed" value={noiseRed} onChange={handleChange} type="number" min="0" placeholder='Red threshold value in db' />
                            </Form.Field>
                        </Form.Group>

                        <Button type='submit' color='green' disabled={inProgress}>{inProgress ? 'Saving..' : 'Submit'}</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Configuration
