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

import { Chart } from 'react-charts';

import ResizableBox from './ResizableBox';
import useDemoConfig from './useDemoConfig';

export default function App() {
  const mockData2 = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          {
            primary: new Date('2021-03-18T00:00:00.000Z'),
            secondary: '2',
          },
          {
            primary: new Date('2021-03-19T00:00:00.000Z'),
            secondary: '73',
          },
          {
            primary: new Date('2021-03-20T00:00:00.000Z'),
            secondary: '79',
          },
        ],
      },
      {
        label: 'Series 2',
        data: [
          {
            primary: new Date('2021-03-18T00:00:00.000Z'),
            secondary: '0',
          },
          {
            primary: new Date('2021-03-19T00:00:00.000Z'),
            secondary: '50',
          },
          {
            primary: new Date('2021-03-20T00:00:00.000Z'),
            secondary: '20',
          },
        ],
      },
    ],
    []
  );
  const [data, setData] = useState([]);
  const [chartHeight, setChartHeight] = useState(500);
  const [chartWidth, setChartWidth] = useState('80%');

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'time',
        position: 'bottom',
        styles: { color: 'white', border: '1px solid yellow' },
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      {
        type: 'linear',
        position: 'left',
      },
    ],
    []
  );
  useEffect(() => {
    if (data.length == 0) {
      return;
    }
    setTimeout(() => {
      console.log('test');
      // setChartHeight(501);
      setChartWidth('100%');
    }, 1);
  }, [data]);
  return (
    <>
      <div style={{ height: chartHeight, width: chartWidth }}>
        <Chart data={data} series={series} axes={axes} tooltip dark={false} />
      </div>
      <button
        onClick={() => {
          setData(mockData2);
        }}
      >
        Click me
      </button>
    </>
  );
}

// export default function App() {
//   return (
//     <Router>
//       <RouterSwitch>
//         <Route path="/" component={Hello} />
//       </RouterSwitch>
//     </Router>
//   );
// }
