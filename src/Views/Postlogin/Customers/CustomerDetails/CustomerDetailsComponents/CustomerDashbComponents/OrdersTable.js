import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import { fetchOrders } from "Redux-Store/Orders/OrdersThunk";
import "../../../../../../assets/Styles/Header.css";
import status from "Redux-Store/Constants";

const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
};

const Orderstable = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders.ordersData);
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteringText, setFilteringText] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {

      setOrders(ordersData.data?.data.finish_products || []);
    
  }, [ordersData]);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(filteringText.toLowerCase()) ||
      order.customer.toLowerCase().includes(filteringText.toLowerCase()) ||
      order.date.toLowerCase().includes(filteringText.toLowerCase()) ||
      order.status.toLowerCase().includes(filteringText.toLowerCase()) ||
      order.total.toLowerCase().includes(filteringText.toLowerCase())
  );



  return (
    <Table
    variant="borderless"
       className="shadow-md rounded-xl border-[1px] border-[#E4E4E4]"
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => item.orderId,
      }}
      columnDefinitions={[
        
        {
          id: "orderId",
          header: "Order ID",
          cell: (item) => <Link href="#">{highlightText(item.orderId, filteringText)}</Link>,
          sortingField: "orderId",
          isRowHeader: true,
        },
        {
          id: "customer",
          header: "Customer",
          cell: (item) => highlightText(item.customer, filteringText),
          sortingField: "customer",
        },
        {
          id: "date",
          header: "Date",
          cell: (item) => highlightText(item.date, filteringText),
          sortingField: "date",
        },
        {
          id: "status",
          header: "Status",
          cell: (item) => highlightText(item.status, filteringText),
          sortingField: "status",
        },
        {
          id: "total",
          header: "Total",
          cell: (item) => highlightText(item.total, filteringText),
          sortingField: "total",
        },
        // {
        //   id: "items",
        //   header: "Items",
        //   cell: (item) => (
        //     <div className="items-container">
        //       {item.items.slice(0, 4).map((image, index) => (
        //         <img key={index} src={image} alt={`Item ${index + 1}`} className="item-image" />
        //       ))}
        //       {item.items.length > 4 && (
        //         <span className="more-items rounded-full bg-slate-100 p-1">+{item.items.length - 4}</span>
        //       )}
        //     </div>
        //   ),
        // },
        {
          id: "action",
          header: "",
          cell: (item) => (
            <ButtonDropdown
              items={[
                { id: "view", text: "View" },
                { id: "edit", text: "Edit" },
                { id: "delete", text: "Delete" },
              ]}
              ariaLabel="Control instance"
              expandToViewport
              expandableGroups
              variant="icon"
             
            />
          ),
        },
      ]}
      columnDisplay={[
        { id: "orderId", visible: true },
        { id: "customer", visible: true },
        { id: "date", visible: true },
        { id: "status", visible: true },
        { id: "total", visible: true },
        { id: "items", visible: true },
        { id: "action", visible: true },
      ]}
      enableKeyboardNavigation
      items={filteredOrders}
      loadingText="Loading orders"
      selectionType="multi"
      trackBy="orderId"
      empty={
        ordersData.status === status.IN_PROGRESS ? (
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>Loading...</b>
            </SpaceBetween>
          </Box>
        ) : (
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No orders</b>
              <Button>Create order</Button>
            </SpaceBetween>
          </Box>
        )
      }
      filter={
        <TextFilter
        className="pl-3"
          filteringPlaceholder="Find orders"
          filteringText={filteringText}
          onChange={(e) => setFilteringText(e.detail.filteringText)}
        />
      }
      header={
        <Header className="pl-3 pt-4" variant="h3">
          All Orders
        </Header>
      }
   
    
      
      highlightedRow={filteringText && filteredOrders.length ? filteredOrders[0].orderId : null}
    />
  );
};

export default Orderstable;

