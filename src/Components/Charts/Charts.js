import React from 'react'

const charts = (props) => {
    return (
        <div>
          <div>{this.state.externalToolTip}</div>
          <ReactEcharts
            option={{
              tooltip: {
                trigger: 'axis',
                formatter: (params => {
                  //console.log("params: ", params);
                  this.setState({
                    externalToolTip: "Data index: " + params[0].dataIndex
                  })
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
                data: this.state.timeRange
              },
              yAxis: {
                type: "value"
              },
              series: this.state.nestedData
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
                data: this.state.timeRange
              },
              yAxis: {
                type: "value"
              },
              series: this.state.nestedPercentData
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
                      data: this.state.timeRange
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
                this.state.timeRange.map((time, time_i) => {
                  return {
                    yAxis: [{
                          data: this.state.nestedPercentData
                                  .filter(d => d.key !== "")
                                  .map(d => d.key)
                      }],
                      title: {
                          text: time
                      },
                      series: [
                          {
                              data: this.state.nestedPercentData
                                      .filter(d => d.key !== "")
                                      .map(d => d.values[time_i])
                          },
                      ]
                  }
                })
            }}
          />
          <Slider
            value={this.state.slider}
            onChange={this.handleSliderChange}
            onChangeCommitted={this.handleSliderCommitted}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            //getAriaValueText="check"
          />
          <div>
            <Button
              variant="contained"
              onClick={this.handleNestDataClick}>
              Nest Data
            </Button>
            <div>
              {JSON.stringify(this.state.nestedData)}
            </div>
            <div>
              {JSON.stringify(this.state.nestedAllTags)}
            </div>
            <div>
              {JSON.stringify(this.state.nestedAllTagsDates)}
            </div>
          </div>
        </div>
    )
}

export default charts