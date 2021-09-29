import React from 'react'
import './page.css'
import SensorValue from './Area';
import { useEffect } from 'react';

import Chart from 'react-apexcharts'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'

import ThemeAction from '../redux/actions/ThemeAction'
import { useHistory } from 'react-router-dom'



const Area1 = (props) => {

    
    const history = useHistory();
    const themeReducer = useSelector(state => state.ThemeReducer);
    const sensorValue = useSelector(state => state.feeds);

    const dispatch = useDispatch()
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

    const lineChart = {
        options: {
            chart: {
            id: 'apexchart-example'
            },
            xaxis: {
            categories: ["temperature", "humidity", "airquality", "noise"]
            }
      },
        series: [{
            name: 'series-1',
            data: [sensorValue[0].field1, sensorValue[0].field2, sensorValue[0].field3, sensorValue[0].field4]
        }]
    };

    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar {...props} />
            <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                    <div>
                        <SensorValue values={sensorValue} />
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="page-header">Chart</h2>
                            <div className="row">
                                <br />
                                <div className="col-12">
                                    <Chart options={lineChart.options} series={lineChart.series} type="bar" height={320} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Area1
