import {  Button, Container, Grid, Header, SpaceBetween } from '@cloudscape-design/components';

import React from 'react';
import { BsGraphUp } from "react-icons/bs";
import { PiMoneyWavyThin } from "react-icons/pi";
import { LuPackageX } from "react-icons/lu";
import { RiExchangeBoxLine } from "react-icons/ri";

import Orderstable from './CustomerDashbComponents/OrdersTable';
import OrderHistory from './CustomerDashbComponents/OrderHistory';
import FrequentbghtItems from './CustomerDashbComponents/FrequentbghtItems';
import SpendVsRevenue from './CustomerDashbComponents/SpendVsRevenue';

const CustDashboard = () => {




  return (
    <Container  variant="borderless"
       className=" rounded-xl border-[1px] border-[#E9EBED]">
      <SpaceBetween direction="vertical" size="s">
        <Header
          actions={
            <SpaceBetween alignItems='center' direction='horizontal' size='xs'>
              <Button iconName='add-plus' variant='primary'>Dashboard</Button>
            </SpaceBetween>
          }
          variant='h3'
        >
          Dashboard
        </Header>

        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 3 } },
            { colspan: { default: 12, xxs: 3 } },
            { colspan: { default: 12, xxs: 3 } },
            { colspan: { default: 12, xxs: 3 } }
          ]}
        >
          <div  className='flex justify-center shadow-md border border-1 border-gray-200 gap-1 pt-3 pr-2 pb-3 pl-2 rounded-xl'>
            <div className='bg-[#CBF5E5] rounded-full h-10 w-10 flex justify-center p-3  '><BsGraphUp /></div>
            <div>
              <h4  className='text-xs font-bold'>Total Spending</h4>
              <h3 className='font-semibold text-xl'>235</h3>
            </div>
          </div>
          <div  className='flex justify-center shadow-md border border-1 border-gray-200 gap-1 pt-3 pr-2 pb-3 pl-2 rounded-xl'>
            <div className='bg-[#F9C2FF] rounded-full h-10 w-10 flex justify-center p-3  '><PiMoneyWavyThin /></div>
            <div>
              <h4  className='text-xs font-bold'>Total Revenue</h4>
              <h3 className='font-semibold text-xl'>235</h3>
            </div>
          </div>
          <div  className='flex justify-center shadow-md border border-1 border-gray-200 gap-1 pt-3 pr-2 pb-3 pl-2 rounded-xl'>
            <div className='bg-[#F8C9D2] rounded-full h-10 w-10 flex justify-center p-3  '><LuPackageX /></div>
            <div>
              <h4  className='text-xs font-bold'>Order Cancel</h4>
              <h3 className='font-semibold text-xl'>235</h3>
            </div>
          </div>
          <div  className='flex justify-center shadow-md border border-1 border-gray-200 gap-1 pt-3 pr-2 pb-3 pl-2 rounded-xl'>
            <div className='bg-[#FBDFB1] rounded-full h-10 w-10 flex justify-center p-3  '><RiExchangeBoxLine /></div>
            <div>
              <h4  className='text-xs font-bold'>Order Exchange</h4>
              <h3 className='font-semibold text-xl'>235</h3>
            </div>
          </div>
        </Grid>


         <OrderHistory/>
  

        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xxs: 6 } }
          ]}
        >

          <SpendVsRevenue/>
      

           <FrequentbghtItems/>
        
        </Grid>

       <Orderstable/>
      </SpaceBetween>
    </Container>
  );
};

export default CustDashboard;
