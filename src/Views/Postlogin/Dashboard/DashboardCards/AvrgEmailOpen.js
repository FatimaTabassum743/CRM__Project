import React from 'react';
import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import { Container, Header } from '@cloudscape-design/components';

const AvrgEmailOpen = () => {
  const emailOpenRateData = [
    { month: 'January', rate: 40.0 },
    { month: 'February', rate: 70.5 },
    { month: 'March', rate: 50.3 },
    { month: 'April', rate: 40.4 },
    { month: 'May', rate: 80.9 },
  ];

  const barData = emailOpenRateData.map((data, index) => ({
    x: new Date(2024, index, 1), // Constructing a date object for each month
    y: data.rate,
  }));

  return (
    <Container variant="borderless"
      header={
        <Header>
          <>
            <h4 className='font-extrabold text-sm'>Average Email Open Rate</h4>
            <span style={{ color: '#0958D9', fontSize: '18px', fontWeight: 'bolder', lineHeight: 1.3 }} className='font-extrabold'>
              69.99%
            </span> 
            <span className='bg-[#EEF5F0]  text-[#589E67] rounded-lg p-1 text-[10px]'>10% </span>
            <p className='font-extralight text-xs'>Average Open Rate</p>
          </>
        </Header>
      }
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
    >
      <BarChart
        series={[
          {
            title: "Average Email Open Rate",
            type: "bar",
            data: barData,
            valueFormatter: e =>
              e.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + '%'
          },
          {
            title: "Threshold",
            type: "threshold",
            y: 70, // Example threshold value
            valueFormatter: e =>
              e.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + '%'
          }
        ]}
        xDomain={barData.map(data => data.x)}
        yDomain={[0, 100]} // Adjust according to your data range
        i18nStrings={{
          xTickFormatter: e =>
            e
              .toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
              .split(",")
              .join("\n"),
          yTickFormatter: e => e.toFixed(2) + '%'
        }}
        ariaLabel="Average Email Open Rate"
        fitHeight
        height={300}
        hideFilter
        stackedBars
        xTitle="Months"
        yTitle="Open Rate (%)"
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
  );
}

export default AvrgEmailOpen;
