import React from 'react'

import ReactSpeedometer from 'react-d3-speedometer'

const GaugeChart = (
    {
        minValue,
        maxValue,
        value,
        currentValueText
    }
) => (
    <ReactSpeedometer
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        currentValueText={currentValueText}
        width={500}
        startColor="#33FF33"
        endColor="#FF0000"
        segments={10}
        maxSegmentLabels={5}
        valueTextFontSize={32}
        paddingVertical={10}
        needleColor="steelblue"
        needleTransitionDuration={2000}
        needleTransition="easeElastic"
        needleHeightRatio={0.8}
        ringWidth={100}
    />
)

export default GaugeChart



