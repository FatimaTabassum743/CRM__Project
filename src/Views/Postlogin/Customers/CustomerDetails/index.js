import React from 'react';
import {
  Tabs,

  Header,

  SpaceBetween,

  Button,
} from '@cloudscape-design/components';
import Grid from '@cloudscape-design/components/grid';
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import Notes from '../CustomerDetails/CustomerDetailsComponents/Notes';
import Activity from '../CustomerDetails/CustomerDetailsComponents/Activity';
import CustDashboard from '../CustomerDetails/CustomerDetailsComponents/CustomerDashboard';
import AboutLead from '../CustomerDetails/CustomerDetailsComponents/AboutLead';

const CustomTabs = () => {
  return (
    <>
     <Header className='mb-5'
      
            actions={
              <SpaceBetween alignItems='center' direction='horizontal' size='xs'>
                <Button  variant='primary'>Convert To Deal</Button>
              </SpaceBetween>
            }
            variant='h4'
          >
          <BreadcrumbGroup
    items={[
      { text: "Lead", href: "/app/customers" },
     
      {
        text: "John",
        href: "#components/breadcrumb-group"
      }
    ]}
    ariaLabel="Breadcrumbs"
    headerVariant="divider"
    borders="horizontal"
    
  />
  </Header>

        <hr></hr>  
   
   <Grid
     gridDefinition={[
      { colspan: { default: 12, xxs: 9 } },
      { colspan: { default: 12, xxs: 3 } }
    ]}>

   <Tabs
  

   
   variant='borderless'
       
        tabs={[
          {
            label: 'Dashboard',
            id: 'first',
            content: <CustDashboard />,
          },
          {
            label: 'Activity',
            id: 'second',
            content: <Activity />,
          },
          {
            label: 'Emails',
            id: '2',
            content: 'Second tab content area',
          },
          {
            label: 'Calls',
            id: '3',
            content: 'Second tab content area',
          },
          {
            label: 'Task',
            id: '4',
            content: 'Second tab content area',
          },
          {
            label: 'Notes',
            id: '5',
            content: <Notes/>,
          },
        ]}
      />
      <AboutLead/>
      </Grid>

    </>
  );
};

export default CustomTabs;
