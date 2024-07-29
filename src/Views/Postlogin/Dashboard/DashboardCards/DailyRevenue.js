import React from 'react';
import LineChart from "@cloudscape-design/components/line-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import { Container, Header, Link } from '@cloudscape-design/components';

const DailyRevenue = () => {
  return (
    <Container 
      variant="borderless"
      header={
        <Header variant='h3' className='font-extrabold'> Daily Revenue</Header>
      }
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full">
      <LineChart
        series={[
          {
            title: "Revenue",
            type: "line",
            data: [
              { x: "Mon", y: 58020 },
              { x: "Tue", y: 102402 },
              { x: "Wed", y: 104920 },
              { x: "Thu", y: 94031 },
              { x: "Fri", y: 125021 },
              { x: "Sat", y: 159219 },
              { x: "Sun", y: 193082 }
            ],
            valueFormatter: function o(e) {
              return Math.abs(e) >= 1e9
                ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
                : Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
            }
          }
        ]}
        xDomain={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        yDomain={[0, 200000]}
        i18nStrings={{
          xTickFormatter: e => e,
          yTickFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          }
        }}
        detailPopoverSeriesContent={({ series, x, y }) => ({
          key: (
            <Link external={true} href="#">
              {series.title}
            </Link>
          )
        })}
        ariaLabel="Single data series line chart"
        detailPopoverSize="small"
        height={300}
        xScaleType="categorical"
        xTitle="Days Of the Week"
        yTitle="Revenue"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />
    </Container>
  )
}

export default DailyRevenue;
