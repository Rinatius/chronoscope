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
        <div className='examples'>
        <div className='parent'>
            <label>echarts-gl demo</label>
            <ReactEcharts option={getOption()}  />
        </div>
        </div>
    );
}

export default scatter3d