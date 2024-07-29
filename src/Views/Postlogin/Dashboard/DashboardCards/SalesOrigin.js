import React from 'react';
import PieChart from "@cloudscape-design/components/pie-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import { Container, Header } from '@cloudscape-design/components';

const SalesOrigin = () => {
    // Dummy data
    const data = [
        { title: "Store 1", percentage: 30, value: 3000 },
        { title: "Store 2", percentage: 25, value: 2500 },
        { title: "Store 3", percentage: 20, value: 2000 },
        { title: "Ecommerce", percentage: 15, value: 1500 },
        { title: "WhatsApp Commerce", percentage: 10, value: 1000 }
    ];
    
    // Total units
    const totalUnits = "10k";
    
    return (
        <Container
            header={
                <Header variant='h3' className='font-extrabold'>Sales Origin</Header>
            }
            variant="borderless"
            className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
        >
            <PieChart
                yTitle="Sales Origin"
                data={data}
                visibleSegments={data}
                segmentDescription={(datum, sum) =>
                    `${datum.value} units, ${(
                        (datum.value / sum) *
                        100
                    ).toFixed(0)}%`
                }
                ariaDescription="Donut chart showing e-commerce sales data."
                ariaLabel="Donut chart"
                innerMetricDescription="Total units"
                innerMetricValue={totalUnits}
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

export default SalesOrigin;
