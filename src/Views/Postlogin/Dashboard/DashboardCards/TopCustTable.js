import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Link from "@cloudscape-design/components/link";
import Modal from "@cloudscape-design/components/modal";
import { useNavigate } from 'react-router-dom';
import { IoCallOutline, IoMailOpen } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "Redux-Store/Customers/CustomersThunk";
import defaultimg from "../../../../assets/img/default-pro.png";
import { ButtonDropdown } from "@cloudscape-design/components";
import "../../../../assets/Styles/Header.css";
import debounce from 'lodash/debounce'; // Make sure lodash is installed

const TopCustomer = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [items, setItems] = useState(customers.data?.customers || []);
  const [filteredItems, setFilteredItems] = useState(items);
  const [filteringText, setFilteringText] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    const fetchedItems = customers.data?.customers || [];
    setItems(fetchedItems.slice(0, 5));
  }, [customers]);

  useEffect(() => {
    setFilteredItems(
      filteringText === ""
        ? items
        : items.filter(item =>
            Object.values(item).some(
              value =>
                typeof value === "string" &&
                value.toLowerCase().includes(filteringText.toLowerCase())
            )
          )
    );
  }, [filteringText, items]);

  const handleClick = (item) => {
    switch (item.detail.id) {
      case "view":
        handleView();
        break;
      case "delete":
        handleDelete();
        break;
      default:
        break;
    }
  };

  const handleDelete = (item) => {
    setDeleteItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setFilteredItems(filteredItems.filter(i => i.name !== deleteItem.name));
    setIsDeleteModalOpen(false);
    setDeleteItem(null);
  };

  const navigate = useNavigate();
  const handleView = () => {
    navigate("/app/customerDetails");
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  // Debounced function to handle column width changes
  const handleColumnWidthsChange = debounce((newWidths) => {
    setColumnWidths(newWidths);
    console.log("Column widths updated:", newWidths);
  }, 100);

  return (
    <div>
      <Table
       contentDensity="compact"

        textAlign="center"
        variant="borderless"
        className="p-2 shadow-md rounded-xl border-[1px] border-[#E4E4E4]"
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        columnDefinitions={[
          {
            id: "name",
            header: "Name",
            cell: e => (
              <div className="flex gap-1 items-center">
                <img
                  src={e.imageUrl || defaultimg}
                  alt={e.name}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                <Link variant="secondary" href="/app/customerDetails">
                  {highlightText(e.name, filteringText)}
                </Link>
              </div>
            )
          },
          {
            id: "organization",
            header: "Organization",
            cell: e => highlightText(e.organization, filteringText),
            sortingField: "organization",
          },
          {
            id: "status",
            header: "Status",
            cell: e => highlightText(e.status, filteringText),
            sortingField: "status",
          },
          {
            id: "email",
            header: "Email",
            cell: e => highlightText(e.email, filteringText),
            sortingField: "email",
          },
          {
            id: "assignTo",
            header: "Assign to",
            cell: e => highlightText(e.assignTo, filteringText),
          },
          {
            id: "address",
            header: "Address",
            cell: e => highlightText(e.address, filteringText),
          },
          {
            id: "mobileNo",
            header: "Mobile No",
            cell: e => highlightText(e.mobileNo, filteringText),
            sortingField: "mobileNo"
          },
          {
            id: "actions",
            header: <div className="text-center">Actions</div>,
            cell: e => (
              <div className="flex gap-2">
                <button
                  href="#"
                  variant="inline-link"
                  className="border-2 text-sm flex items-center justify-center gap-1 border-black rounded-md pl-2 pr-2 text-black"
                >
                  <IoCallOutline /> Call
                </button>
                <button
                  href="#"
                  variant="inline-link"
                  className="border-2 text-sm flex items-center justify-center gap-1 border-black rounded-md pl-2 pr-2 text-black"
                >
                  <IoMailOpen /> Mail
                </button>
                {/* <ButtonDropdown
                  items={[
                    { id: "view", text: "View" },
                    { id: "delete", text: "Delete" },
                  ]}
                  ariaLabel="Control instance"
                  expandToViewport
                  expandableGroups
                  variant="icon"
                  onItemClick={handleClick}
                /> */}
              </div>
            ),
          },
        ]}
        columnDisplay={[
          { id: "name", visible: true },
          { id: "organization", visible: true },
          { id: "status", visible: true },
          { id: "email", visible: true },
          { id: "assignTo", visible: true },
          { id: "address", visible: true },
          { id: "mobileNo", visible: true },
          { id: "actions", visible: true },
        ]}
        items={filteredItems}
        loadingText="Loading resources"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: "s" }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
        header={
          <div className="flex justify-between items-center">
            <span className="text-[#000716] font-extrabold">Top Customers</span>
            <div className="flex gap-2">
              <TextFilter
                filteringPlaceholder="Search"
                className="w-56"
                filteringText={filteringText}
                onChange={({ detail }) => setFilteringText(detail.filteringText)}
              />
              <Button variant="inline-link" iconName="add-plus">Filter</Button>
            </div>
          </div>
        }
        footer={
          <div className="flex justify-center">
            <Link variant="secondary" href="/app/Customers" className="text-center">
              View All
            </Link>
          </div>
        }
        onColumnWidthsChange={handleColumnWidthsChange}  // Register the debounced callback
      />
      {/* Delete Confirmation Modal */}
      <Modal
        onDismiss={() => setIsDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        closeAriaLabel="Close modal"
        size="small"
        header="Confirm Deletion"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setIsDeleteModalOpen(false)} variant="link">Cancel</Button>
            <Button onClick={confirmDelete} variant="danger">Delete</Button>
          </SpaceBetween>
        }
      >
        {deleteItem && (
          <Box>
            <p>Are you sure you want to delete {deleteItem.name}?</p>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default TopCustomer;
