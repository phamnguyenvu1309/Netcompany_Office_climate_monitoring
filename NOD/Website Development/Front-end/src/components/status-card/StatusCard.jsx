import React from 'react'
import PropTypes from 'prop-types';
import './statuscard.css'


StatusCard.propTypes = {
    values: PropTypes.array,
};

StatusCard.defaultProps = {
    values: [],
}

const RED_HEX = "#ff0000";
const GREEN_HEX = "#1fe01f"
const YELLOW_HEX = "#e1ff10"

function StatusCard(props) {
    const { values, sensorConfig } = props;
    const {airRed, airYellow, airGreen, noiseRed, noiseYellow, noiseGreen} = sensorConfig;
    const getBGColor = (_actualValue, {_redValue, _yellowValue, _greenValue}) => {
        const actualValue = parseInt(_actualValue);
        const redValue = parseInt(_redValue);
        const yellowValue = parseInt(_yellowValue);
        const greenValue = parseInt(_greenValue);

        const sortArr = [redValue, greenValue, yellowValue].sort(function(a, b){return a-b});
        let sensorData = {};
        const [smallest, medium, largest] = sortArr;
        switch(smallest) {
            case redValue:
                sensorData.smallest = {value: redValue, color: RED_HEX};
                break;
            case greenValue:
                sensorData.smallest = {value: greenValue, color: GREEN_HEX};
                break;
            case yellowValue:
                sensorData.smallest = {value: yellowValue, color: YELLOW_HEX};
                break;
            default:
                break;
        }
        switch(medium) {
            case redValue:
                sensorData.medium = {value: redValue, color: RED_HEX};
                break;
            case greenValue:
                sensorData.medium = {value: greenValue, color: GREEN_HEX};
                break;
            case yellowValue:
                sensorData.medium = {value: yellowValue, color: YELLOW_HEX};
                break;
            default:
                break;
        }
        switch(largest) {
            case redValue:
                sensorData.largest = {value: redValue, color: RED_HEX};
                break;
            case greenValue:
                sensorData.largest = {value: greenValue, color: GREEN_HEX};
                break;
            case yellowValue:
                sensorData.largest = {value: yellowValue, color: YELLOW_HEX};
                break;
            default:
                break;
        }
        console.log('$$sensorData', sensorData);
        if (actualValue >= 0 && actualValue <= sensorData.smallest.value) {
            return sensorData.smallest.color;
        } else if (actualValue > sensorData.smallest.value && actualValue <= sensorData.medium.value) {
            return sensorData.medium.color;
        } else if (actualValue > sensorData.medium.value) {
            return sensorData.largest.color;
        }
    };

    return (
        <div>
            {values.map(value => (
                <div className='status-card '>
                    <div className="status-card__info">
                        
                        <h4><i className={props.icon}></i> {props.area}</h4>
                        <h5>Air Quality: {value.field3} AQI <span className="dot" style={{backgroundColor: getBGColor(value.field3, {_redValue: airRed, _yellowValue: airYellow, _greenValue: airGreen})}}></span></h5>
                        <br />
                        <h5>Noise Level: {value.field4} dB <span className="dot" style={{backgroundColor: getBGColor(value.field4, {_redValue: noiseRed, _yellowValue: noiseYellow, _greenValue: noiseGreen})}}></span></h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatusCard
