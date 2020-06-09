import React from 'react'
import ReactEcharts from "echarts-for-react";
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const charts = (props) => {
    return (
        <div>
          <div>{props.externalToolTip}</div>
          <ReactEcharts
            option={{
              tooltip: {
                trigger: 'axis',
                formatter: (params => {
                  () => props.handleExternalToolTip("Data index: " + params[0].dataIndex)
                }),
                axisPointer: {
                  animation: false
                }
              },
              legend: {
                data: ["check", "check1", "check"],/*this.state.nestedData
                  .filter(d => d.key !== "")
                  .map(d => d.key),*/
                left: 10
              },
              xAxis: {
                type: "category",
                data: props.timeRange
              },
              yAxis: {
                type: "value"
              },
              series: props.nestedData
                .filter(d => d.key !== "")
                .map(d => {
                return {
                  name: d.key,
                  data: d.values,
                  type: "line"
                }
              })
            }}
          />
          <ReactEcharts
            option={{
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  animation: false
                }
              },
              legend: {
                data: ["check", "check1", "check"],/*this.state.nestedData
                  .filter(d => d.key !== "")
                  .map(d => d.key),*/
                left: 10
              },
              xAxis: {
                type: "category",
                data: props.timeRange
              },
              yAxis: {
                type: "value"
              },
              series: props.nestedPercentData
                .filter(d => d.key !== "")
                .map(d => {
                return {
                  name: d.key,
                  data: d.values,
                  type: "line"
                }
              })
            }}
          />
          <ReactEcharts
            option={{

              baseOption: {
                  timeline: {
                      //loop: false,
                      axisType: 'category',
                      show: true,
                      autoPlay: true,
                      playInterval: 300,
                      data: props.timeRange
                  },
                  grid: {containLabel: true},
                  xAxis: [{
                      type: 'value',
                      name: '%',
                      max: 6
                  },],
                  yAxis: [{
                      type: 'category',
                      inverse: true,
                  }],
                  series: [
                      {
                          type: 'bar',

                      },
                  ]
              },
              options:
                props.timeRange.map((time, time_i) => {
                  return {
                    yAxis: [{
                          data: props.nestedPercentData
                                  .filter(d => d.key !== "")
                                  .map(d => d.key)
                      }],
                      title: {
                          text: time
                      },
                      series: [
                          {
                              data: props.nestedPercentData
                                      .filter(d => d.key !== "")
                                      .map(d => d.values[time_i])
                          },
                      ]
                  }
                })
            }}
          />
          <Slider
            value={props.slider}
            onChange={props.handleSliderChange}
            onChangeCommitted={props.handleSliderCommitted}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            //getAriaValueText="check"
          />
          <div>
            <Button
              variant="contained"
              onClick={props.handleNestDataClick}>
              Nest Data
            </Button>
            <div>
              {JSON.stringify(props.nestedData)}
            </div>
            <div>
              {JSON.stringify(props.nestedAllTags)}
            </div>
            <div>
              {JSON.stringify(props.nestedAllTagsDates)}
            </div>
          </div>
        </div>
    )
}

export default charts