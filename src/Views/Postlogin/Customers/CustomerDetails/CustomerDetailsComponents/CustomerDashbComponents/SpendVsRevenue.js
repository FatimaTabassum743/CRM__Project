
import { Box, Button, Container, Header, PieChart } from '@cloudscape-design/components';
import React from 'react';

const SpendVsRevenue = () => {
  const data = [
    { title: "Spend", percentage: 60, value: 6089},
    { title: "Revenue", percentage: 40, value: 4078 }
  ];

  return (
    <Container
      variant="borderless"
      header={
        <Header variant='h3' className='font-extrabold'>Spend Vs Revenue</Header>
      }
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
    >
      <PieChart
        data={data}
        visibleSegments={data}
        segmentDescription={(datum, sum) =>
          `${datum.value} units, ${((datum.value / sum) * 100).toFixed(0)}%`
        }
        ariaDescription="Donut chart showing spend vs revenue data."
        ariaLabel="Donut chart"
        fitHeight
        hideLegend
        hideFilter
        innerMetricDescription="total units"
        innerMetricValue={data.reduce((acc, curr) => acc + curr.value, 0)}
        size="large"
        variant="donut"
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

export default SpendVsRevenue;
