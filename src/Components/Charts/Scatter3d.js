import React from 'react';
import ReactEcharts from "echarts-for-react";
import 'echarts-gl';

const scatter3d = (props) => {
    const getOption = () => ({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [{
        type: 'scatter3D',
        symbolSize: 5,
        data: props.data,
        itemStyle: {
            opacity: 1
        }
        }]
    });

    return (
        <div>
            <label>{props.status}</label>
            <ReactEcharts option={getOption()}  />
        </div>
    );
}

export default scatter3d