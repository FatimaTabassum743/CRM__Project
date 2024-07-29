import React from 'react';
import {
  Box,
  ColumnLayout,
  Popover,
  TextContent,
} from '@cloudscape-design/components';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import '../../../assets/Styles/Header.css';
import ContentLayout from '@cloudscape-design/components/content-layout';
import TopCustomerTable from './DashboardCards/TopCustTable';
import SalesOrigin from './DashboardCards/SalesOrigin';
import DailyRevenue from './DashboardCards/DailyRevenue';
import AvrgEmailOpen from './DashboardCards/AvrgEmailOpen';
import Calendar from '@cloudscape-design/components/calendar';

const Dashboard = () => {
  const [isPopoverVisible, setPopoverVisible] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState(getCurrentMonthYear());
  const date = new Date();

  const month = date.toLocaleString('default', { month: 'long' });

  function getCurrentMonthYear(date = new Date()) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const handleButtonClick = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const handleCalendarChange = ({ detail }) => {
    const selectedDate = new Date(detail.value);
    setSelectedMonth(getCurrentMonthYear(selectedDate));
    setPopoverVisible(false); // Close the popover
  };

  return (
    <>
      <ContentLayout
        headerVariant="high-contrast"
        header={
          <Header
            actions={
              <SpaceBetween alignItems="center" direction="horizontal" size="xs">
                <div>
                  <Popover
                    triggerType="custom"
                    content={
                      <Calendar
                        onChange={handleCalendarChange}
                        value={null}
                         // Initially set to null
                           granularity="month"
                      />
                    }
                  >
                    <Button onClick={handleButtonClick} variant="primary">
                      {selectedMonth.startsWith(month) ? 'This Month' : selectedMonth}
                    </Button>
                  </Popover>
                </div>
              </SpaceBetween>










            }
            variant="h1"
          >
            Dashboard
          </Header>
        }
      >


      <SpaceBetween direction="vertical" size="s">
    <Container className='border-gray-100 shadow-md ml-0
    '>
      
    <ColumnLayout columns={5} variant='default' minColumnWidth={170}>
    <div>
      <Box variant="awsui-key-label">Total Emails Sent</Box>
   <span style={{color:'#0958D9' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
    1330+
    </span>
    </div>
    <div >
      <Box variant="awsui-key-label">Total Contacts</Box>
       <span style={{color:'#5F6B7A' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}> 1260+ </span>
    </div>
    <div>
      <Box variant="awsui-key-label">Ongoing Tasks</Box>
 <span style={{color:'#D91515' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
      09
    </span>
    </div>
    <div>
      <Box variant="awsui-key-label">New Customers</Box>
      <span style={{color:'#29AD32' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
      230
      </span>
    </div>
  
    <div>
      <Box variant="awsui-key-label">Closed Requests</Box>
      <span style={{color:'#0958D9' , fontSize:40 ,fontWeight:'bolder', lineHeight:1.3}}>
      14
      </span>
    </div>
  </ColumnLayout>
  </Container>
  <Grid
      gridDefinition={[
        { colspan: { default: 3, xxs: 8 } },
        { colspan: { default: 9, xxs: 4 } }
      ]}
    >

      <AvrgEmailOpen/>
   
    <Container variant="borderless"
       className="shadow-md rounded-xl border-[1px] border-[#E4E4E4] h-full"
    header={
      <Header
        variant="h3"
      
      >
        Upcoming Agenda
      </Header>
    }
  >
      <SpaceBetween direction='vertical' size='s'>
    <TextContent >
   <span className='bg-[#FBF4EC] text-[#D28E3D] p-1'>11:00 - 12:00 Feb 2, 2019</span>
    <h5>Meeting With</h5>
   <p className='text-[#727272]'>This Monthly Progress Agenda</p>
    </TextContent>
    <TextContent>
    <span className='bg-[#EDF2FE] text-[#4976F4] p-1'>11:00 - 12:00 Feb 2, 2019</span>
    <h5>Meeting With</h5>
    <p className='text-[#727272]'>This Monthly Progress Agenda</p>
    </TextContent>
    <TextContent>
    <span className='bg-[#F4EDF7] text-[#954BAF] p-1'>11:00 - 12:00 Feb 2, 2019</span>
    <h5>Meeting With</h5>
    <p className='text-[#727272]'>This Monthly Progress Agenda</p>
    </TextContent>
   
    <TextContent>
    <span className='bg-[#F7EDED] text-[#AF4B4B] p-1'>11:00 - 12:00 Feb 2, 2019</span>
    <h5>Meeting With</h5>
    <p className='text-[#727272]'>This Monthly Progress Agenda</p>
    </TextContent>
    <TextContent>
    <span className='bg-[#F7EDED] text-[#AF4B4B] p-1'>11:00 - 12:00 Feb 2, 2019</span>
    <h5>Meeting With</h5>
    <p className='text-[#727272]'>This Monthly Progress Agenda</p>
    </TextContent>
    </SpaceBetween>
  

  </Container>
    </Grid>
    <TopCustomerTable/>
      <Grid
      gridDefinition={[
        { colspan: { default: 12, xxs: 6 } },
        { colspan: { default: 12, xxs: 6 } }
      ]}
    >

      <SalesOrigin/>
     <DailyRevenue/>
    </Grid>
    </SpaceBetween>
     </ContentLayout>
  
  </>

  )
}

export default Dashboard