import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper/ChartWrapper';
import './App.css';
import { text, csv, tsv, scaleTime, extent, nest, timeFormat, sum, timeDays, range } from 'd3';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BigTable from "./BigTable/BigTable";
import { CSVDownload } from "react-csv";
import ReactEcharts from "echarts-for-react";
import {createConditionalNode, mean} from "mathjs";
import { fromArrayBuffer } from "numpy-parser";
import DownloadData from './Components/DownloadData/DownloadData'
import FilterData from './Components/FilterData/FilterData'
import Centroid from './Components/Centroid/Centroid'
import TagData from './Components/TagData/TagData'


const { List, Set, Map } = require('immutable');
const createKDTree = require('static-kdtree');
const ndarray = require("ndarray")
const pool = require("ndarray-scratch")
const ops = require("ndarray-ops")



class App extends Component {

  state = {
    slider: [0, 100],
    data_url: "https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/nuk%2BQ2%2Bs.csv?alt=media&token=187d3eda-38d9-4d6b-be2e-c35ed91be3fa",
    regex: "",
    data: List([]),
    filteredData: List([]),
    exclude: List([]),
    timeFilteredData: List([]),
    embeds_url: "https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/comments_embeddings.npy?alt=media&token=87cd348c-f954-49b9-8731-689421435d8b",
    embeddings: [],
    kdTree: null,
    centroid: [],
    maxKDRadius: 0.1,
    tag: "",
    tagSelector: "",
    prepareDownload: false,
    nestedData: [{values: []}],
    nestedPercentData: [{values: []}],
    nestedAllTags: [],
    nestedAllTagsDates: {},
    timeRange: [],
    externalToolTip: "",
    tagModeEnabled: false,
    showCharts: false
  }

  handleSliderChange = (event, newValue) => {
    this.setState({
      slider: newValue
    });
  };

  downloadData = () => {
    tsv(this.state.data_url, (d, i) => {
      return Map({
        key: i,
        date: new Date(d.date),
        sentence: d.sentence,
        tags: Set(d.tags.split(",")),
        negtags: ("negtags" in d) ? Set(d.negtags.split(",")) : Set([])
      });
    }).then(download => {
              this.timeScale = scaleTime()
                  .domain(extent(download, d => d.get("date").getTime()))
                  .range([0, 100])
              //let filtered = this.timeFilter(download, this.state.slider)
              this.setState({data: List(download)});
    });

    if (this.state.embeds_url !== ""){
      fetch(this.state.embeds_url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          const data1D = fromArrayBuffer(arrayBuffer)
          const embeddings = ndarray(data1D.data, data1D.shape);
          const kdTree = createKDTree(embeddings)
          console.log(kdTree.length)
          console.log(kdTree.dimension)
          this.setState({kdTree: kdTree})
          this.setState({embeddings: embeddings})
          })
      /*text(this.state.embeds_url, "text/csv", f => csv.parseRows(f))
        .then(embeddings => {
          this.setState({kdTree: createKDTree(embeddings)})
          this.setState({embeddings: embeddings})
        });*/
    }
  }

  excludeTagNegtag = (data) => {
    let result = data
    if (this.state.tag.length > 0) {
      result = data.filter(d => {
        const res = !(d.get("tags").includes(this.state.tag) ||
        d.get("negtags").includes(this.state.tag))
        console.log(res)
        return res
      })
    }
    console.log(result)
    return result
  }

  allFilter = () => {
    let filtered = []
    if (this.state.regex.length > 0) {
      let re = new RegExp(this.state.regex, "i");
      filtered = this.state.data.filter(d => (re.test(d.get("sentence"))));
    } else {
      filtered = this.state.data
    }
    if (this.state.tagSelector.length > 0) {
      filtered = filtered.filter(d => d.get("tags").includes(this.state.tagSelector));
    }
    if (this.state.tagModeEnabled) {
      filtered = this.excludeTagNegtag(filtered)
    }
    this.setState({
      filteredData: filtered
    })
  };

  tag = () => {
    let data = this.state.data;
    let exclude = this.state.exclude;
    let filtered = this.state.filteredData.map(row => {
      if (!(exclude.includes(row.get("key")))) {
        row = row.update("tags", d => d.add(this.state.tag))
        data = data.set(row.get("key"), row)
        return row
      }
    })
    this.setState({
      data: data,
      filteredData: filtered
    })
  }

  removeRow = (index) => {
    if (this.state.tag !== "") {
      let data = this.state.data;
      let row = this.state.filteredData.get(index);
      row = row.update("negtags", d => d.add(this.state.tag))
      data = data.set(row.get("key"), row)
      this.setState({
        data: data
      })
    }
    this.setState({
      filteredData: this.state.filteredData.delete(index)
    })
  }

  timeFilter = (data, interval) => {
    let startTime = this.timeScale.invert(interval[0])
    let endTime = this.timeScale.invert(interval[1])
    return data.filter(d => (d.date.getTime() >= startTime &&
                             d.date.getTime() <= endTime))
  };

  nestData = () => {
    let flatData = []
    let data = this.state.data.toJS()

    //Denormalize data by tag
    data.forEach(d => d.tags.forEach(t => {
      d.tags = t
      flatData.push(d)
    }))

    //Select time unit
    let day = timeFormat("%U");//timeFormat("%Y-%m-%d");
    //Determine data time extent given time unit
    let dataExtent = extent(data, d => day(d.date));
    let timeRange = range(dataExtent[0], dataExtent[1]);
    let nestedAllTagsDates = nest().key(d => day(d.date))
                       .rollup(values => sum(values, d => +1))
                       .map(flatData);
    let nestedAllTags = timeRange.map(d => nestedAllTagsDates.get(d) || 0)
    let nested = nest().key(d => d.tags)
                       .key(d => day(d.date))
                       .rollup(values => sum(values, d => +1))
                       .map(flatData);

    //let timeRange = timeDays(dataExtent[0], dataExtent[1]).map(d => day(d));
    let zeroPadded = nested.keys()
                           .map(d => {
                             return {key: d,
                                     values: timeRange.map(t => nested.get(d).get(t) || 0)}})
    let zeroPaddedPercent = zeroPadded.map((d) => {
      return {
        key: d.key,
        values: d.values.map((t, i) => t/nestedAllTags[i]*100)
      }
    });

    this.setState({
      nestedData: zeroPadded,
      nestedPercentData: zeroPaddedPercent,
      nestedAllTags: nestedAllTags,
      nestedAllTagsDates: nestedAllTagsDates,
      timeRange: timeRange
    })
  }

  kdSearch = () => {
    const nearestPoints = []
    this.state.kdTree
      .rnn(this.state.centroid.data, this.state.maxKDRadius, point => {
        nearestPoints.push(point)
        return undefined;
      })
    console.log(nearestPoints)
    let nearestRows = List(nearestPoints.map(d => this.state.data.get(d)));
    if (this.state.tagModeEnabled) {
      nearestRows = this.excludeTagNegtag(nearestRows)
    }
    this.setState({filteredData: nearestRows})
  }

  ndMean = (data, indices) => {
    let result = pool.zeros([data.shape[1]], data.dtype);
    indices.forEach(d => {
      ops.addeq(result, data.pick(d))});
    ops.divseq(result, indices.length);
    return result
  };

  calculateCentroid = () => {
    const filteredIndices = this.state.filteredData.map(d => d.get("key"));
    const centroid = this.ndMean(this.state.embeddings, filteredIndices.toJS());
    this.setState({
      centroid: centroid
    });
  };

  handleSliderCommitted = (event, newValue) => {
    if(this.state.data.length > 0){
    this.setState({
      timeFilteredData: this.timeFilter(this.state.data, newValue)
    })}
  };

  handleDataUrlChange = (event) => {
    this.setState({
      data_url: event.target.value
    });
  };

  handleEmbedsUrlChange = (event) => {
    this.setState({
      embeds_url: event.target.value
    });
  };

  handleRegexTextChange = (event) => {
    this.setState({
      regex: event.target.value
    });
  };

  handleTagSelectorTextChange = (event) => {
    this.setState({
      tagSelector: event.target.value
    });
  };

  handleTagTextChange = (event) => {
    this.setState({
      tag: event.target.value
    });
  };

  handleFilterClick = () => {
    this.allFilter();
  };

  handleCalculateCentroidClick = () => {
    this.calculateCentroid();
  };

  handleTagClick = () => {
    this.tag();
  };

  handleRowRemoval = (index) => {
    this.removeRow(index);
  };

  handleGetDataClick = () => {
    this.setState({
      prepareDownload: true
    })
  };

  handleNestDataClick = () => {
    this.nestData();
  };

  handleDownloadDataClick = () => {
    this.downloadData()
  };

  handleRadiusChange = (event) => {
    this.setState({
      maxKDRadius: event.target.value
    });
  };

  handleTagModeChange = (event) => {
    this.setState({
      tagModeEnabled: event.target.checked
    });
  };

  handleNNSearchClick = () => {
    this.kdSearch();
  };

  handleShowCharts = () => {
    const charts = this.state.showCharts
    console.log(charts)
    this.setState({showCharts: !charts})
  }

  componentDidUpdate(prevProps, prevState) {
    // Don't forget to compare states
    if (prevState && prevState.prepareDownload) {
      this.setState({prepareDownload: false});
    }
  };

  render() {

    let exportDownload = null;
    if (this.state.prepareDownload) {
      exportDownload = (
        <CSVDownload data={this.state.data.toJS()}
                     separator={"\t"}
                     target="_blank" />);
    }
    let charts = null;
    if (this.state.showCharts) {
      charts =
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

    }

    return (
      <div className="App">
        <DownloadData
          data_url={this.state.data_url}
          embeds_url={this.state.embeds_url}
          handleDataUrlChange={this.handleDataUrlChange}
          handleEmbedsUrlChange={this.handleEmbedsUrlChange}
          handleDownloadDataClick={this.handleDownloadDataClick}/>
        <FilterData
          reges={this.state.regex}
          tagSelector={this.state.tagSelector}
          handleRegexTextChange={this.handleRegexTextChange}
          handleTagSelectorTextChange={this.handleTagSelectorTextChange}
          handleFilterClick={this.handleFilterClick}/>
        <Centroid
          maxKDRadius={this.state.maxKDRadius}
          handleCalculateCentroidClick={this.handleCalculateCentroidClick}
          handleRadiusChange={this.handleRadiusChange}
          handleNNSearchClick={this.handleNNSearchClick}/>
        <TagData
          tagModeEnabled={this.state.tagModeEnabled}
          tag={this.state.tag}
          handleTagTextChange={this.handleTagTextChange}
          handleTagClick={this.handleTagClick}
          handleTagModeChange={this.handleTagModeChange}/>
        <Button
          variant="contained"
          onClick={this.handleGetDataClick}>
          Download Modified Data
        </Button>
        {exportDownload}
        {/*<CSVLink data={this.state.data.toJS()} separator={"\t"}>
          Download me
        </CSVLink>*/}
        {/*<ChartWrapper />*/}
        <Button onClick={this.handleShowCharts}>Show charts</Button>
        {charts}
        <BigTable bigArray={this.state.filteredData}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sentence</TableCell>
                  <TableCell align="left">Tags</TableCell>
                  <TableCell align="left">Negtags</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.filteredData.map((row, index) => (
                  <TableRow
                    key={row.get("key")}
                    onClick={() => this.handleRowRemoval(index)}
                  >
                    <TableCell align="left">{row.get("sentence")}</TableCell>
                    <TableCell>{JSON.stringify(row.get("tags"))}</TableCell>
                    <TableCell>{JSON.stringify(row.get("negtags"))}</TableCell>
                    <TableCell align="left">
                      {row.get("date").getFullYear()}/
                      {row.get("date").getMonth()}/
                      {row.get("date").getDate()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BigTable>
      </div>
    );
  }
}

export default App;
