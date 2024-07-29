import { Box, Button, Container, Header, LineChart, Link } from '@cloudscape-design/components';
import React from 'react';

const OrderHistory = () => {
  return (
    <Container
      variant="borderless"
      header={
        <Header variant='h3' className='font-extrabold'>Order History</Header>
      }
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
    >
      <LineChart
        series={[
          {
            title: "Monthly Spend",
            type: "line",
            data: [
              { x: new Date('2024-01-01'), y: 12000 },
              { x: new Date('2024-02-01'), y: 15000 },
              { x: new Date('2024-03-01'), y: 18000 },
              { x: new Date('2024-04-01'), y: 20000 },
              { x: new Date('2024-05-01'), y: 25000 },
              { x: new Date('2024-06-01'), y: 22000 },
              { x: new Date('2024-07-01'), y: 27000 },
              { x: new Date('2024-08-01'), y: 30000 },
              { x: new Date('2024-09-01'), y: 32000 },
              { x: new Date('2024-10-01'), y: 35000 },
              { x: new Date('2024-11-01'), y: 33000 },
              { x: new Date('2024-12-01'), y: 36000 }
            ],
            valueFormatter: function o(e) {
              return Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
            }
          }
        ]}
        xDomain={[
          new Date('2024-01-01'),
          new Date('2024-12-31')
        ]}
        yDomain={[0, 40000]}
        i18nStrings={{
          xTickFormatter: e =>
            e
              .toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
              }),
          yTickFormatter: function o(e) {
            return Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          }
        }}
        detailPopoverSeriesContent={({ series, x, y }) => ({
          key: (
            <Link external="true" href="#">
              {series.title}
            </Link>
          ),
          value: series.valueFormatter(y)
        })}
        ariaLabel="Monthly spend line chart"
        detailPopoverSize="small"
        height={300}
        xScaleType="time"
        xTitle="Months"
        yTitle="Spend"
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
};

export default OrderHistory;
