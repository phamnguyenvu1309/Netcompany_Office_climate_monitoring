import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from '../components/GaugeChart/GaugeChart';

SensorValue.propTypes = {
    values: PropTypes.number,
};

SensorValue.defaultProps = {
    values: [],
}

function SensorValue(props) {
    const { values } = props;

    return (
        <div>
            {values.map(value => (
                <div style={{ textAlign: 'center' }}>
                    <h2 className="page-header">Real-time Data</h2>
                    <div className="row">
                        <div className="col-6" >
                            <h4>Temperature</h4>
                            <GaugeChart
                                minValue={10}
                                maxValue={50}
                                value={value.field1}
                                currentValueText={'${value}\u00b0C'}
                            />
                        </div>
                        <div className="col-6">
                            <h4>Humidity</h4>
                            <GaugeChart
                                minValue={50}
                                maxValue={100}
                                value={value.field2}
                                currentValueText={'${value}%'}

                            />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <h4>Air Qualitty Index</h4>
                            <GaugeChart
                                minValue={0}
                                maxValue={200}
                                value={value.field3}
                                currentValueText={'${value} AQI'}
                            />
                        </div>
                        <div className="col-6">
                            <h4>Noise Level</h4>
                            <GaugeChart
                                minValue={30}
                                maxValue={130}
                                value={value.field4}
                                currentValueText={'${value} dB'}
                            />
                        </div>
                    </div>
                </div>

            ))}

        </div>
    );
}

export default
    SensorValue;