import { Button, Container, Header, PieChart, ButtonDropdown } from '@cloudscape-design/components'
import { Box } from '@mui/material'
import React, { useState } from 'react'

const data = {
  fruits: [
    { title: "Apples", value: 20, lastUpdate: "Jul 10, 2024" },
    { title: "Bananas", value: 15, lastUpdate: "Jul 9, 2024" },
    { title: "Oranges", value: 25, lastUpdate: "Jul 8, 2024" },
  ],
  vegetables: [
    { title: "Carrots", value: 10, lastUpdate: "Jul 10, 2024" },
    { title: "Broccoli", value: 5, lastUpdate: "Jul 9, 2024" },
    { title: "Potatoes", value: 20, lastUpdate: "Jul 8, 2024" },
  ],
  leafyVegetables: [
    { title: "Spinach", value: 30, lastUpdate: "Jul 10, 2024" },
    { title: "Lettuce", value: 25, lastUpdate: "Jul 9, 2024" },
    { title: "Kale", value: 15, lastUpdate: "Jul 8, 2024" },
  ],
  all: [
    { title: "Apples", value: 20, lastUpdate: "Jul 10, 2024" },
    { title: "Bananas", value: 15, lastUpdate: "Jul 9, 2024" },
    { title: "Oranges", value: 25, lastUpdate: "Jul 8, 2024" },
    { title: "Carrots", value: 10, lastUpdate: "Jul 10, 2024" },
    { title: "Broccoli", value: 5, lastUpdate: "Jul 9, 2024" },
    { title: "Potatoes", value: 20, lastUpdate: "Jul 8, 2024" },
    { title: "Spinach", value: 30, lastUpdate: "Jul 10, 2024" },
    { title: "Lettuce", value: 25, lastUpdate: "Jul 9, 2024" },
    { title: "Kale", value: 15, lastUpdate: "Jul 8, 2024" },
  ]
}

const FrequentbghtItems = () => {
  const [category, setCategory] = useState('all')

  const handleCategoryChange = (event) => {
    setCategory(event.detail.id)
  }

  const filteredData = data[category]

  return (
    <Container variant="borderless"
      className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
      header={<Header variant='h3' className='font-extrabold'>
        Frequently Bought Items
      
      <ButtonDropdown
      
        items={[
          { text: "All Categories", id: "all" },
          { text: "Fruits", id: "fruits" },
          { text: "Vegetables", id: "vegetables" },
          { text: "Leafy Vegetables", id: "leafyVegetables" }
        ]}
        onItemClick={handleCategoryChange}
        className='float-end text-center ml-11 mt-1'
        selectedOption={{ text: "All Categories", id: "all" }}
        variant='inline-link'
      >
        All
      </ButtonDropdown>
      </Header>}>

      <PieChart
        data={filteredData}
        detailPopoverContent={(datum, sum) => [
          { key: "Resource count", value: datum.value },
          {
            key: "Percentage",
            value: `${((datum.value / sum) * 100).toFixed(
              0
            )}%`
          },
          { key: "Last update on", value: datum.lastUpdate }
        ]}
        segmentDescription={(datum, sum) =>
          `${datum.value} Times, ${(
            (datum.value / sum) *
            100
          ).toFixed(0)}%`
        }
        hideLegend
        hideFilter
        ariaDescription="Pie chart showing how many items have been bought in each category."
        ariaLabel="Pie chart"
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

export default FrequentbghtItems
