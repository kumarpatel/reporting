import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route,
} from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './App.global.css';
import logo from './electron.svg';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { Chart } from 'react-charts';
import ReactApexChart from 'apexcharts';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import { readString } from 'react-papaparse';

import { Alert } from '@material-ui/lab';
import ResizableBox from './ResizableBox';
import useDemoConfig from './useDemoConfig';
import { RowingSharp } from '@material-ui/icons';
import { format, formatDistance, formatDistanceStrict } from 'date-fns';
const remote = window.require('electron').remote;

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 'unset',
  },
  light: {
    // 'background-image':
    //   'radial-gradient(circle, #dae2e6, #c8d1d5, #b6bfc4, #a5afb3, #949ea3)',

    'background-image':
      'radial-gradient(circle, #f2f4f5, #edeff1, #e9ebed, #e5e6e9, #e1e1e5)',
  },
  dark: {
    background: 'rgb(72, 84, 97)',
    background:
      'radial-gradient(circle,rgba(72, 84, 97, 1) 0%,rgba(40, 49, 59, 1) 100%)',
  },
  chartContainer: {
    height: '500px',
    padding: '40px',
    // border: '2px solid yellow',
  },
  paper: {
    background: 'transparent',
    padding: 0,
    textAlign: 'center',
    color: (props) => (props.darkMode ? 'white' : 'black'),
    // backgroundColor: 'white',
  },
  divTextColor: {
    color: (props) => (props.darkMode ? 'white' : 'black'),
  },
  darkIcon: {
    color: 'white',
  },
  lightIcon: {
    color: 'yellow',
  },
  line: {
    strokeWidth: '1',
    fill: 'white',
  },
  tick: {
    fontSize: 10,
    fontFamily: 'sans-serif',
    color: 'red',
  },
}));

export const Hello = () => {
  const testData = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          {
            primary: new Date('2021-03-20T12:00:00.000Z'),
            secondary: '1',
          },
          {
            primary: new Date('2021-03-21T12:00:00.000Z'),
            secondary: '0',
          },
          {
            primary: new Date('2021-03-22T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-23T12:00:00.000Z'),
            secondary: '0',
          },
          {
            primary: new Date('2021-03-24T12:00:00.000Z'),
            secondary: '4',
          },
          {
            primary: new Date('2021-03-25T12:00:00.000Z'),
            secondary: '3',
          },
          {
            primary: new Date('2021-03-26T12:00:00.000Z'),
            secondary: '1',
          },
          {
            primary: new Date('2021-03-27T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-28T12:00:00.000Z'),
            secondary: '0',
          },
          {
            primary: new Date('2021-03-29T12:00:00.000Z'),
            secondary: '0',
          },
        ],
      },
      {
        label: 'Series 2',
        data: [
          {
            primary: new Date('2021-03-20T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-21T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-22T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-23T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-24T12:00:00.000Z'),
            secondary: '1',
          },
          {
            primary: new Date('2021-03-25T12:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-26T12:00:00.000Z'),
            secondary: '3',
          },
          {
            primary: new Date('2021-03-27T12:00:00.000Z'),
            secondary: '3',
          },
          {
            primary: new Date('2021-03-28T12:00:00.000Z'),
            secondary: '1',
          },
          {
            primary: new Date('2021-03-29T12:00:00.000Z'),
            secondary: '2',
          },
        ],
      },
    ],
    []
  );
  const testData1 = React.useMemo(
    () => [
      {
        label: 'CC',
        data: [
          {
            secondary: '5',
            primary: new Date('2021-03-21T19:34:15.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:16.000Z'),
          },
          {
            secondary: '2',
            primary: new Date('2021-03-21T19:34:17.000Z'),
          },
          {
            secondary: '4',
            primary: new Date('2021-03-21T19:34:18.000Z'),
          },
          {
            secondary: '5',
            primary: new Date('2021-03-21T19:34:19.000Z'),
          },
          {
            secondary: '2',
            primary: new Date('2021-03-21T19:34:20.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:21.000Z'),
          },
          {
            secondary: '5',
            primary: new Date('2021-03-21T19:34:22.000Z'),
          },
        ],
      },
      {
        label: 'OC',
        data: [
          {
            secondary: '1',
            primary: new Date('2021-03-21T19:34:15.000Z'),
          },
          {
            secondary: '1',
            primary: new Date('2021-03-21T19:34:16.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:17.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:18.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:19.000Z'),
          },
          {
            secondary: '3',
            primary: new Date('2021-03-21T19:34:20.000Z'),
          },
          {
            secondary: '1',
            primary: new Date('2021-03-21T19:34:21.000Z'),
          },
          {
            secondary: '0',
            primary: new Date('2021-03-21T19:34:22.000Z'),
          },
        ],
      },
    ],
    []
  );

  const [logfiles, setLogfiles] = useState([]);
  const [chartHeight, setChartHeight] = useState('1px');
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles(darkMode);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [logoRotation, setLogoRotation] = useState('');
  const [{ primaryCursorValue, secondaryCursorValue }, setState] = useState({
    primaryCursorValue: null,
    secondaryCursorValue: null,
  });

  const memoChartData = useMemo(() => data, [data]);
  const primaryCursor = useMemo(
    () => ({
      value: primaryCursorValue,
    }),
    [primaryCursorValue]
  );

  const secondaryCursor = useMemo(
    () => ({
      value: secondaryCursorValue,
    }),
    [secondaryCursorValue]
  );

  const onFocus = useCallback((datum) => {
    setState({
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null,
    });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].type !== 'text/csv') {
      console.log('not csv');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    } else {
      setError(false);
    }

    setLogfiles(acceptedFiles);

    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    // reader.onloadend = () => console.log('onloadend');
    // reader.onloadstart = () => console.log('onloadstart');
    // reader.onprogress = () => console.log('onprogress ');
    reader.onload = () => {
      const binaryStr = reader.result;
      let chartDataObj = {};
      const parsedData = readString(binaryStr, {
        // preview: 3,
        skipEmptyLines: 'greedy',
        header: true,
      });

      Object.keys(parsedData.data[0]).map((header) => {
        chartDataObj[header] = {};
        chartDataObj[header]['label'] = header;
        chartDataObj[header]['data'] = [];
      });
      console.log({ parsedData });

      // let CCTime = new Date('2021-03-20T12:00:00.000Z');
      // let OCTime = new Date('2021-03-20T12:00:00.000Z');
      const fromDate = parsedData.data[0]['Time'];
      parsedData.data.map((row) => {
        Object.keys(row).map((header) => {
          let newDate;
          // if (header == 'CC') {
          //   newDate = new Date(CCTime.setHours(CCTime.getHours() + 24));
          // } else if (header == 'OC') {
          //   newDate = new Date(OCTime.setHours(OCTime.getHours() + 24));
          // }

          console.log(
            formatDistanceStrict(new Date(fromDate), new Date(row['Time']))
          );
          chartDataObj[header]['data'].push({
            // primary: newDate,
            primary: formatDistanceStrict(
              new Date(fromDate),
              new Date(row['Time'])
            ),
            secondary: row[header].toString(),
            // primary: new Date(row['Time']),
          });
        });
      });

      let chartData = [];
      Object.keys(chartDataObj).map((header) => {
        if (header == 'CC' || header == 'OC') {
          chartData.push({
            label: header,
            data: chartDataObj[header].data,
          });
        }
      });

      console.log(chartData);
      setData(chartData);
    };
    reader.readAsText(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    if (isDragActive) {
      setLogoRotation('rotate');
    } else {
      setLogoRotation('');
    }
  }, [isDragActive]);

  const series = React.useCallback((s, i) => {
    let type = 'line';
    if (s.label == 'OC') {
      type = 'bubble';
    }
    return { type, showPoints: true };
  }, []);

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'ordinal',
        position: 'bottom',
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      {
        type: 'linear',
        position: 'left',
        // stacked: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (memoChartData.length == 0) {
      return;
    }
    setTimeout(() => {
      setChartHeight('0px');
    }, 1);
  }, [memoChartData]);

  console.log('memoChartData');
  console.log(memoChartData);
  console.log('memoChartData');
  return (
    <Grid
      container
      spacing={3}
      className={`${classes.root} ${darkMode ? classes.dark : classes.light}`}
    >
      <Grid item xs={12}>
        <Paper
          elevation={0}
          className={`${classes.paper} ${classes.chartContainer}`}
          style={{
            // height: chartHeight,
            // flex: 2,
            // flex: 2,
            // border: '5px solid blue',
            // maxHeight: chartHeight,
            margin: chartHeight,
          }}
        >
          <Chart
            data={memoChartData}
            series={series}
            axes={axes}
            tooltip
            dark={darkMode}
          />
        </Paper>
      </Grid>
      {/* <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid> */}
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Switch
              checkedIcon={
                <div
                  style={{
                    marginTop: '-2px',
                    backgroundColor: 'grey',
                    borderRadius: 50,
                    height: '24px',
                    width: '24px',
                  }}
                >
                  {' '}
                  <Brightness5Icon
                    fontSize="small"
                    className={darkMode ? classes.darkIcon : classes.lightIcon}
                  />
                </div>
              }
              icon={
                <div
                  style={{
                    marginTop: '-2px',
                    backgroundColor: '#22224A',
                    borderRadius: 50,
                    height: '24px',
                    width: '24px',
                  }}
                >
                  <Brightness3Icon
                    fontSize="small"
                    className={darkMode ? classes.darkIcon : classes.lightIcon}
                  />
                </div>
              }
              checked={!darkMode}
              onChange={() => {
                setDarkMode(!darkMode);
              }}
              size="medium"
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
          </div>
          <div
            style={{ color: darkMode ? 'white' : 'black' }}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              style={{
                display: 'block',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
            />
            <img src={logo} className={`App-logo ${logoRotation}`} alt="logo" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop your log file here, or click to select files</p>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          className={classes.paper}
          style={{ color: darkMode ? 'white' : 'black' }}
        >
          x: {primaryCursorValue && primaryCursorValue.toString()}
        </Paper>
        <Paper
          className={classes.paper}
          style={{ color: darkMode ? 'white' : 'black' }}
        >
          y: {secondaryCursorValue && secondaryCursorValue}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          className={classes.paper}
          style={{ color: darkMode ? 'white' : 'black' }}
        >
          xs=3
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          className={classes.paper}
          style={{ color: darkMode ? 'white' : 'black' }}
        >
          xs=3
        </Paper>
      </Grid>
      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">Wrong File Type. Upload CSV log file.</Alert>
        </Snackbar>
      )}
    </Grid>
  );
};

export default function App() {
  return (
    <Router>
      <RouterSwitch>
        <Route path="/" component={Hello} />
      </RouterSwitch>
    </Router>
  );
}
