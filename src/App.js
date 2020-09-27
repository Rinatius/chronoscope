import React, { Component } from 'react';
import './App.css';
import { text, csv, tsv, scaleTime, extent, nest, timeFormat, sum, timeDays, range } from 'd3';
import { Button, Grid, TextField, CircularProgress } from '@material-ui/core';

import { CSVDownload } from "react-csv";
import { fromArrayBuffer } from "numpy-parser";
import Centroid from './Components/Centroid/Centroid'
import TagData from './Components/TagData/TagData'
import Charts from './Components/Charts/Charts'
import Dropzone from './Components/UploadFile/Dropzone'
import ImgGrid from "./Components/ImgGrid/ImgGrid";
import getImgsFromImg from './lukoshko/api'


const { List, Set, Map, fromJS } = require('immutable');
const createKDTree = require('static-kdtree');
const ndarray = require("ndarray")
const pool = require("ndarray-scratch")
const ops = require("ndarray-ops")


const KEY_COL = "key"
const DATE_COL = "created_at"
const CONTENT_COL = "sentence"
const ACCOUNT_COL = "account"
const USERNAME_COL = "username"
const TAGS_COL = "tags"
const NEGTAGS_COL = "negtags"


class App extends Component {

  state = {
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
    showCharts: false,
    file: null,
    snackbarOpen: false,
    initialImage: null,
    APIRadius: 0.93,
    spinner: false
  }

  downloadData = () => {
    let check = true
    tsv(this.state.data_url, (d, i) => {
      const res = Map({
        key: (KEY_COL in d) ? parseInt(d[KEY_COL]) : i,
        date: new Date(d[DATE_COL]),
        content: d[CONTENT_COL],
        account: d[ACCOUNT_COL],
        username: d[USERNAME_COL],
        tags: (TAGS_COL in d) ? Set(d[TAGS_COL].split(",")) : Set([]),
        negtags: (NEGTAGS_COL in d) ? Set(d[NEGTAGS_COL].split(",")) : Set([])
      });
      // if (i !== parseInt(d[KEY_COL]) && check) {
      //   console.log("Disorder starts", d)
      //   console.log("Disorder starts index", i)
      //   check = false
      // }
      return res;
    }).then(download => {
              this.timeScale = scaleTime()
                  .domain(extent(download, d => d.get("date").getTime()))
                  .range([0, 100])
              console.log("Array Length", download.length)
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

  allFilter = (data=null) => {
    let dataToFilter = data
    if (!dataToFilter) {
      dataToFilter = this.state.data
    }
    let filtered
    if (this.state.regex.length > 0) {
      let re = new RegExp(this.state.regex, "i");
      filtered = dataToFilter.filter(d => (re.test(d.get("content"))));
    } else {
      filtered = dataToFilter
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

  tagAll = (action) => {
    if (this.state.tag !== "") {
      let data = this.state.data;
      this.state.filteredData.forEach((d, i) => {
        d = this.getUpdatedTags(action,
            this.state.filteredData.get(i),
            this.state.tag)
        data = data.set(d.get("key"), d)
      })
      this.setState({data: data})
      this.allFilter(this.state.filteredData.map(d => data.get(d.get("key"))))
    } else {
      alert('Fill TAG field')
    }
  }

  tagRow = (action, index) => {
    if (this.state.tag !== "") {
      let data = this.state.data;
      const row = this.getUpdatedTags(action,
          this.state.filteredData.get(index),
          this.state.tag)
      data = data.set(row.get("key"), row)

      this.setState({
        data: data
      })
      this.setState({
        filteredData: data
      })
      this.setState({
        filteredData: this.state.filteredData.delete(index)
      })
    } else {
      alert('Fill TAG field')
    }
  }

  getUpdatedTags = (action, row, tag) => {
    if (action === 'tag') {
      row = row.update("tags", d => d.add(tag))
      row = row.update("negtags", d => d.delete(tag))
    } else if (action === 'negtag') {
      row = row.update("negtags", d => d.add(tag))
      row = row.update("tags", d => d.delete(tag))
    }
    return row;
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

  handleTagClick = (action) => {
    this.tagAll(action);
  };

  handleRowRemoval = (action, index) => {
    this.tagRow(action, index);
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

  handleExternalToolTip = (dataIndex) => {
    this.setState({externalToolTip: dataIndex})
  }


  // Photo methods start

  handleFileChange = (file) => {
    console.log(file)
    this.setState({file: file})
  }

  handleSnackbarClick = () => {
    this.setState({snackbarOpen: true})
  };

  setInitial = (initialImage) => {
    this.setState({initialImage: initialImage})
  };

  handleAPIRadiusChange = (event) => {
    this.setState({APIRadius: event.target.value})
  };

  handlePostData = async () => {
    if (!this.state.file) {
      alert("No file to upload")
      return 0
    }
    this.setState({spinner: true})
    console.log("Sending data")
    const data = await getImgsFromImg(this.state.file, this.state.APIRadius)
    this.setState({data: data})
    this.allFilter()
    this.setState({spinner: false})
  }

  // Photo methods end

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
      charts = <Charts
        externalToolTip={this.state.externalToolTip}
        timeRange={this.state.timeRange}
        nestedData={this.state.nestedData}
        nestedAllTags={this.state.nestedAllTags}
        nestedAllTagsDates={this.state.nestedAllTagsDates}
        timeRange={this.state.timeRange}
        nestedPercentData={this.state.nestedPercentData}
        slider={this.state.slider}
        handleSliderChange={this.handleSliderChange}
        handleSliderCommitted={this.handleSliderCommitted}
        handleNestDataClick={this.handleNestDataClick}
        handleExternalToolTip={this.handleExternalToolTip}
      />
    }

    return (
        <div className="App">

          <Grid container direction="column" alignItems="center" justify="center">
            <Grid container justify="center">
              <Dropzone handleChange={this.handleFileChange}
                        handleClick={this.handleSnackbarClick}
                        setImage={this.setInitial}/>
            </Grid>
            <Grid container justify="center">
              {this.state.initialImage ?
                  <img src={this.state.initialImage} alt="initial_image" style={{height: 300}}/>
                  :
                  null
              }
            </Grid>
            <Grid container justify="center">
              <TextField variant="outlined"
                         id="radius"
                         size="small"
                         label="Radius"
                         value={this.state.APIRadius}
                         onChange={this.handleAPIRadiusChange}/>
              <Button variant="contained"
                      size="small"
                      onClick={() => this.handlePostData()}>Send Data</Button>
              <div>
                {this.state.spinner ?
                    <CircularProgress size={32} style={{color: 'grey'}}/>
                    :
                    null
                }
              </div>
            </Grid>
          </Grid>

          {/*<Centroid*/}
          {/*    maxKDRadius={this.state.maxKDRadius}*/}
          {/*    handleCalculateCentroidClick={this.handleCalculateCentroidClick}*/}
          {/*    handleRadiusChange={this.handleRadiusChange}*/}
          {/*    handleNNSearchClick={this.handleNNSearchClick}/>*/}
          <TagData
              tagModeEnabled={this.state.tagModeEnabled}
              tag={this.state.tag}
              handleTagTextChange={this.handleTagTextChange}
              handleTagClick={this.handleTagClick}
              handleTagModeChange={this.handleTagModeChange}/>
          {/*<Button*/}
          {/*    variant="contained"*/}
          {/*    onClick={this.handleGetDataClick}>*/}
          {/*  Download Modified Data*/}
          {/*</Button>*/}
          {/*{exportDownload}*/}
          <Button onClick={this.handleShowCharts}>Show charts</Button>
          {charts}

          <ImgGrid data={this.state.filteredData} tagClick={this.handleRowRemoval}/>
        </div>
    );
  }
}

export default App;
