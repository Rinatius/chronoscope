import React, { Component, Fragment } from 'react';
import ChartWrapper from './ChartWrapper/ChartWrapper';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import {
  text,
  csv,
  tsv,
  scaleTime,
  extent,
  nest,
  timeFormat,
  sum,
  timeDays,
  range
} from 'd3';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BigTable from './BigTable/BigTable';
import { CSVDownload } from 'react-csv';
import { createConditionalNode, mean } from 'mathjs';
import { fromArrayBuffer } from 'numpy-parser';
import DownloadData from './Components/DownloadData/DownloadData';
import FilterData from './Components/FilterData/FilterData';
import Centroid from './Components/Centroid/Centroid';
import TagData from './Components/TagData/TagData';
import Charts from './Components/Charts/Charts';
import ModifiedData from './Components/ModifiedData/ModifiedData';

import * as tsnejs from '@jwalsh/tsnejs';
// import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { DeleteIcon, ExpandMoreIcon } from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import Pagination from '@material-ui/lab/Pagination';
import {
  AppBar,
  Toolbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';

// сиди

const { List, Set, Map } = require('immutable');
const createKDTree = require('static-kdtree');
const ndarray = require('ndarray');
const pool = require('ndarray-scratch');
const ops = require('ndarray-ops');
const unpack = require('ndarray-unpack');

class App extends Component {
  state = {
    slider: [0, 100],
    data_url:
      'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/nuk%2BQ2%2Bs.csv?alt=media&token=187d3eda-38d9-4d6b-be2e-c35ed91be3fa',
    data: List([]),
    filteredData: List([]),
    exclude: List([]),
    timeFilteredData: List([]),
    embeds_url:
      'https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/comments_embeddings.npy?alt=media&token=87cd348c-f954-49b9-8731-689421435d8b',
    embeddings: [],
    kdTree: null,
    centroid: [],
    maxKDRadius: 0.1,
    tag: '',
    tagSelector: '',
    prepareDownload: false,
    nestedData: [{ values: [] }],
    nestedPercentData: [{ values: [] }],
    nestedAllTags: [],
    nestedAllTagsDates: {},
    timeRange: [],
    externalToolTip: '',
    tagModeEnabled: false,
    showCharts: true,
    scatter3dData: [],
    scatter3dStatus: '',

    currentPage: 1,
    itemPerPage: 12
  };

  // Handle Pagination

  handlePageChange = (event, value) => {
    this.setState({
      currentPage: value
    });
  };

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
        tags: Set(d.tags.split(',')),
        negtags: 'negtags' in d ? Set(d.negtags.split(',')) : Set([])
      });
    }).then(download => {
      this.timeScale = scaleTime()
        .domain(extent(download, d => d.get('date').getTime()))
        .range([0, 100]);
      //let filtered = this.timeFilter(download, this.state.slider)
      this.setState({ data: List(download) });
    });

    if (this.state.embeds_url !== '') {
      fetch(this.state.embeds_url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          const data1D = fromArrayBuffer(arrayBuffer);
          const embeddings = ndarray(data1D.data, data1D.shape);
          const kdTree = createKDTree(embeddings);
          console.log(kdTree.length);
          console.log(kdTree.dimension);
          this.setState({ kdTree: kdTree });
          this.setState({ embeddings: embeddings });
        });
      /*text(this.state.embeds_url, "text/csv", f => csv.parseRows(f))
        .then(embeddings => {
          this.setState({kdTree: createKDTree(embeddings)})
          this.setState({embeddings: embeddings})
        });*/
    }
  };

  excludeTagNegtag = data => {
    let result = data;
    if (this.state.tag.length > 0) {
      result = data.filter(d => {
        const res = !(
          d.get('tags').includes(this.state.tag) ||
          d.get('negtags').includes(this.state.tag)
        );
        console.log(res);
        return res;
      });
    }
    console.log(result);
    return result;
  };

  allFilter = () => {
    let filtered = [];
    if (this.state.regex.length > 0) {
      let re = new RegExp(this.state.regex, 'i');
      filtered = this.state.data.filter(d => re.test(d.get('sentence')));
    } else {
      filtered = this.state.data;
    }
    if (this.state.tagSelector.length > 0) {
      filtered = filtered.filter(d =>
        d.get('tags').includes(this.state.tagSelector)
      );
    }
    if (this.state.tagModeEnabled) {
      filtered = this.excludeTagNegtag(filtered);
    }
    this.setState({
      filteredData: filtered
    });
  };

  tag = () => {
    let data = this.state.data;
    let exclude = this.state.exclude;
    let filtered = this.state.filteredData.map(row => {
      if (!exclude.includes(row.get('key'))) {
        row = row.update('tags', d => d.add(this.state.tag));
        data = data.set(row.get('key'), row);
        return row;
      }
    });
    this.setState({
      data: data,
      filteredData: filtered
    });
  };

  removeRow = index => {
    if (this.state.tag !== '') {
      let data = this.state.data;
      let row = this.state.filteredData.get(index);
      row = row.update('negtags', d => d.add(this.state.tag));
      data = data.set(row.get('key'), row);
      this.setState({
        data: data
      });
    }
    this.setState({
      filteredData: this.state.filteredData.delete(index)
    });
  };

  timeFilter = (data, interval) => {
    let startTime = this.timeScale.invert(interval[0]);
    let endTime = this.timeScale.invert(interval[1]);
    return data.filter(
      d => d.date.getTime() >= startTime && d.date.getTime() <= endTime
    );
  };

  nestData = () => {
    let flatData = [];
    let data = this.state.data.toJS();

    //Denormalize data by tag
    data.forEach(d =>
      d.tags.forEach(t => {
        d.tags = t;
        flatData.push(d);
      })
    );

    //Select time unit
    let day = timeFormat('%U'); //timeFormat("%Y-%m-%d");
    //Determine data time extent given time unit
    let dataExtent = extent(data, d => day(d.date));
    let timeRange = range(dataExtent[0], dataExtent[1]);
    let nestedAllTagsDates = nest()
      .key(d => day(d.date))
      .rollup(values => sum(values, d => +1))
      .map(flatData);
    let nestedAllTags = timeRange.map(d => nestedAllTagsDates.get(d) || 0);
    let nested = nest()
      .key(d => d.tags)
      .key(d => day(d.date))
      .rollup(values => sum(values, d => +1))
      .map(flatData);

    //let timeRange = timeDays(dataExtent[0], dataExtent[1]).map(d => day(d));
    let zeroPadded = nested.keys().map(d => {
      return { key: d, values: timeRange.map(t => nested.get(d).get(t) || 0) };
    });
    let zeroPaddedPercent = zeroPadded.map(d => {
      return {
        key: d.key,
        values: d.values.map((t, i) => (t / nestedAllTags[i]) * 100)
      };
    });

    this.setState({
      nestedData: zeroPadded,
      nestedPercentData: zeroPaddedPercent,
      nestedAllTags: nestedAllTags,
      nestedAllTagsDates: nestedAllTagsDates,
      timeRange: timeRange
    });
  };

  kdSearch = () => {
    const nearestPoints = [];
    this.state.kdTree.rnn(
      this.state.centroid.data,
      this.state.maxKDRadius,
      point => {
        nearestPoints.push(point);
        return undefined;
      }
    );
    console.log(nearestPoints);
    let nearestRows = List(nearestPoints.map(d => this.state.data.get(d)));
    if (this.state.tagModeEnabled) {
      nearestRows = this.excludeTagNegtag(nearestRows);
    }
    this.setState({ filteredData: nearestRows });
  };

  ndMean = (data, indices) => {
    let result = pool.zeros([data.shape[1]], data.dtype);
    indices.forEach(d => {
      ops.addeq(result, data.pick(d));
    });
    ops.divseq(result, indices.length);
    return result;
  };

  calculateCentroid = () => {
    const filteredIndices = this.state.filteredData.map(d => d.get('key'));
    const centroid = this.ndMean(this.state.embeddings, filteredIndices.toJS());
    this.setState({
      centroid: centroid
    });
  };

  runTSNE = () => {
    const opt = {};
    opt.epsilon = 10; // epsilon is learning rate (10 = default)
    opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
    opt.dim = 3; // dimensionality of the embedding (2 = default)

    let tsnePromise = new Promise((resolve, reject) => {
      this.setState({ scatter3dStatus: 'Initializing t-SNE...' });
      console.log('Initializing t-SNE...');
      const tsne = new tsnejs.tSNE(opt); // create a tSNE instance
      tsne.initDataRaw(unpack(this.state.embeddings));
      // tsne.initDataDist([[1.0, 0.1, 0.2], [0.1, 1.0, 0.3], [0.2, 0.1, 1.0]])
      this.setState({ scatter3dStatus: 't-SNE is ready' });
      console.log('t-SNE is ready');
      resolve(tsne);
    });
    tsnePromise.then(tsne => {
      for (let k = 0; k < 3; k++) {
        this.setState({ scatter3dStatus: 'Iter: ' + k });
        console.log('Iter: ' + k);
        tsne.step(); // every time you call this, solution gets better
        this.setState({ scatter3dData: tsne.getSolution() });
      }
    });
  };

  handleSliderCommitted = (event, newValue) => {
    if (this.state.data.length > 0) {
      this.setState({
        timeFilteredData: this.timeFilter(this.state.data, newValue)
      });
    }
  };

  handleDataUrlChange = event => {
    this.setState({
      data_url: event.target.value
    });
  };

  handleEmbedsUrlChange = event => {
    this.setState({
      embeds_url: event.target.value
    });
  };

  handleRegexTextChange = event => {
    this.setState({
      regex: event.target.value
    });
  };

  handleTagSelectorTextChange = event => {
    this.setState({
      tagSelector: event.target.value
    });
  };

  handleTagTextChange = event => {
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

  handleRowRemoval = index => {
    this.removeRow(index);
  };

  handleGetDataClick = () => {
    this.setState({
      prepareDownload: true
    });
  };

  handleNestDataClick = () => {
    this.nestData();
  };

  handleDownloadDataClick = () => {
    this.downloadData();
  };

  handleTSNEClick = () => {
    this.runTSNE();
  };

  handleRadiusChange = event => {
    this.setState({
      maxKDRadius: event.target.value
    });
  };

  handleTagModeChange = event => {
    this.setState({
      tagModeEnabled: event.target.checked
    });
  };

  handleNNSearchClick = () => {
    this.kdSearch();
  };

  handleShowCharts = () => {
    const charts = this.state.showCharts;
    this.setState({ showCharts: !charts });
  };

  handleExternalToolTip = dataIndex => {
    this.setState({ externalToolTip: dataIndex });
  };

  componentDidUpdate(prevProps, prevState) {
    // Don't forget to compare states
    if (prevState && prevState.prepareDownload) {
      this.setState({ prepareDownload: false });
    }
  }

  render() {
    let exportDownload = null;
    if (this.state.prepareDownload) {
      exportDownload = (
        <CSVDownload
          data={this.state.data.toJS()}
          separator={'\t'}
          target="_blank"
        />
      );
    }
    let charts = null;
    if (this.state.showCharts) {
      charts = (
        <Charts
          externalToolTip={this.state.externalToolTip}
          timeRange={this.state.timeRange}
          nestedData={this.state.nestedData}
          nestedAllTags={this.state.nestedAllTags}
          nestedAllTagsDates={this.state.nestedAllTagsDates}
          timeRange={this.state.timeRange}
          nestedPercentData={this.state.nestedPercentData}
          slider={this.state.slider}
          handleSliderChange={this.handleSliderChangeo}
          handleSliderCommitted={this.handleSliderCommitted}
          handleNestDataClick={this.handleNestDataClick}
          handleExternalToolTip={this.handleExternalToolTip}
          handleTSNEClick={this.handleTSNEClick}
          scatter3dData={this.state.scatter3dData}
          scatter3dStatus={this.state.scatter3dStatus}
        />
      );
    }
    // Display items in card
    const { currentPage, itemPerPage } = this.state;
    const indexOfLastPage = currentPage * itemPerPage;
    const indexOfFirstPage = indexOfLastPage - itemPerPage;

    const renderPages = this.state.filteredData
      .slice(indexOfFirstPage, indexOfLastPage)
      .map((row, index) => (
        <Grid item xs={12} md={4} lg={3}>
          <Card borderRadius="12" minWidth="120" variant="outlined" color="red">
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              subheader={JSON.stringify(row.get('tags'))}
            />
            <CardContent>
              <Typography
                style={{
                  maxHeight: 150,
                  overflow: 'scroll',
                  variant: 'body2',
                  component: 'paper'
                }}
              >
                {row.get('sentence')}
              </Typography>
            </CardContent>
            <Divider variant="middle" />

            <CardActions disableSpacing={false}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                align="justify"
                fullWidth="true"
              >
                Tag
                {/* {JSON.stringify(row.get('tags'))} */}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                align="justify"
                fullWidth="true"
              >
                NegTag
                {/* {JSON.stringify(row.get('negtags'))} */}
              </Button>
              {/* <IconButton
                    onClick={() => this.handleRowRemoval(index)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
            </CardActions>
          </Card>
        </Grid>
      ));

    // Displaying pagination ( сиди )
    const numItems = this.state.filteredData.count(pages => pages.get('key'));
    const pageCount = Math.ceil(numItems / itemPerPage);

    let pages = null;
    if (this.state.filteredData) {
      pages = (
        <Pagination
          count={pageCount}
          page={this.state.currentPage}
          onChange={this.handlePageChange.bind(this)}
          color="primary"
          showFirstButton
          showLastButton
          spacing={2}
        />
      );
    }

    return (
      <div className="App">
        <Fragment>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Typography variant="headline" color="inherit">
                Data on Covid-19 in Kyrgyzstan
              </Typography>
            </Toolbar>
          </AppBar>

          <DownloadData
            data_url={this.state.data_url}
            embeds_url={this.state.embeds_url}
            handleDataUrlChange={this.handleDataUrlChange}
            handleEmbedsUrlChange={this.handleEmbedsUrlChange}
            handleDownloadDataClick={this.handleDownloadDataClick}
          />
          <FilterData
            reges={this.state.regex}
            tagSelector={this.state.tagSelector}
            handleRegexTextChange={this.handleRegexTextChange}
            handleTagSelectorTextChange={this.handleTagSelectorTextChange}
            handleFilterClick={this.handleFilterClick}
          />
          <Centroid
            maxKDRadius={this.state.maxKDRadius}
            handleCalculateCentroidClick={this.handleCalculateCentroidClick}
            handleRadiusChange={this.handleRadiusChange}
            handleNNSearchClick={this.handleNNSearchClick}
          />
          <TagData
            tagModeEnabled={this.state.tagModeEnabled}
            tag={this.state.tag}
            handleTagTextChange={this.handleTagTextChange}
            handleTagClick={this.handleTagClick}
            handleTagModeChange={this.handleTagModeChange}
          />
          <ModifiedData handleGetDataClick={this.state.handleGetDataClick} />

          {exportDownload}
          {/*<CSVLink data={this.state.data.toJS()} separator={"\t"}>
          Download me
        </CSVLink>*/}
          {/*<ChartWrapper />*/}

          <Button onClick={this.handleShowCharts}>Show charts</Button>
          {charts}

          <Grid
            flexGrow="1"
            container="fluid"
            spacing={1}
            bigArray={this.state.filteredData}
          >
            {renderPages}
          </Grid>
          <Divider />
          <br></br>
          <Typography
            component="div"
            style={{ height: 100, width: '100%', position: 'relative' }}
          >
            {pages}
          </Typography>
          <br></br>
        </Fragment>
      </div>
    );
  }
}

export default App;
