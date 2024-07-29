import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";

import Pagination from "@cloudscape-design/components/pagination";
import Link from "@cloudscape-design/components/link";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Modal from "@cloudscape-design/components/modal";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "Redux-Store/Customers/CustomersThunk";
import defaultimg from "../../../assets/img/default-pro.png";
import status from "Redux-Store/Constants";
import { BsTrash } from "react-icons/bs";
const CustomTable = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const [items, setItems] = useState(customers.data?.customers || []);
  const [filteredItems, setFilteredItems] = useState(items);
  const [filteringText, setFilteringText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Fetch customers data when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Update items when customers data changes
  useEffect(() => {
    setItems(customers.data?.customers || []);
  }, [customers]);

  // Filter items based on the filtering text of searchbar
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

  // Handle pagination change
  const handlePageChange = ({ detail }) => {
    setCurrentPageIndex(detail.currentPageIndex);
  };

  // Get current page data
  const currentPageData = filteredItems.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  // Handle edit action
  const handleEdit = (item) => {
    setCurrentUser(item);
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDelete = (item) => {
    setDeleteItem(item);
    setIsDeleteModalOpen(true); // Open the deletion confirmation modal
  };

  // Confirm delete action
  const confirmDelete = () => {
    setFilteredItems(filteredItems.filter(i => i.name !== deleteItem.name));
    setIsDeleteModalOpen(false); // Close the deletion confirmation modal after deletion
    setDeleteItem(null);
  };

  // Handle navigation to the customer details page
  const navigate = useNavigate();
  const handleView = () => {
    navigate("/app/customerDetails");
  };

  // Validate form fields
  const validateFields = (user) => {
    const errors = {};
    if (!user.name) errors.name = "Name is required";
    if (!user.organization) errors.organization = "Organization is required";
    if (!user.status) errors.status = "Status is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errors.email = "Invalid email format";
    if (user.mobileNo.length !== 10 || !/^\d+$/.test(user.mobileNo)) errors.mobileNo = "Mobile No must be 10 digits";
    if (!user.assignTo) errors.assignTo = "Assign To is required";
    if (!user.address) errors.address = "Address is required";
    if (!user.imageUrl) errors.imageUrl = "Image is required";
    return errors;
  };

  // Handle save action for the form
  const handleSave = () => {
    const errors = validateFields(currentUser);
    if (Object.keys(errors).length === 0) {
      if (currentUser.isNew) {
        setFilteredItems([...filteredItems, { ...currentUser, isNew: false }]);
      } else {
        setFilteredItems(filteredItems.map(i => (i.name === currentUser.name ? currentUser : i)));
      }
      setIsModalOpen(false);
      setCurrentUser(null);
    } else {
      setValidationErrors(errors);
    }
  };

  // Handle file change for image upload
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Highlight text based on filtering text
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

  return (
    <div>
      {/* Button to add new user */}
    
      <Table
        
        variant="borderless"
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        columnDefinitions={[
          {
            id: "name",
            header: "Name",
            cell: e => (
              <div className="flex gap-1 items-center">
                <img src={e.imageUrl || defaultimg} alt={e.name} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                <Link variant="secondary" href="/app/customerDetails">{highlightText(e.name, filteringText)}</Link>
              </div>
            ),
            sortingField: "name",
            isRowHeader: true,
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
          },
          {
            id: "actions",
            header: "Actions",
            cell: e => (
              <div className="flex items-center space-x-1">
                <div className="cursor-pointer" onClick={() => handleEdit(e)}><FaEdit /></div>
                <div className="cursor-pointer" onClick={() => handleDelete(e)}><FaTrash /></div>
                <div className="cursor-pointer" onClick={() => handleView()}><IoEyeOutline /></div>
              </div>
            ),
          },
        ]}
        columnDisplay={[
          { id: "image", visible: true },
          { id: "name", visible: true },
          { id: "organization", visible: true },
          { id: "status", visible: true },
          { id: "email", visible: true },
          { id: "assignTo", visible: true },
          { id: "address", visible: true },
          { id: "mobileNo", visible: true },
          { id: "actions", visible: true },
        ]}
        items={currentPageData}
        loadingText="Loading resources"
        empty={
          customers.status===status.IN_PROGRESS?(
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>Loading...</b>
            </SpaceBetween>
          </Box>
        ) :(
          <Box textAlign="center" color="inherit">
            <b>No Customer</b>
            <Box padding={{ bottom: "s" }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        )
        }
        filter={
          <div className="flex justify-between items-center">
          <TextFilter
            filteringPlaceholder="Find resources"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
          />
          <Button variant="link"   iconName="add-plus">Filter</Button>
          </div>
        }
        header={
          <div className="flex justify-between items-center ">
          <span variant="h2" className="text-xl font-extrabold">
            Contacts
          </span>
            <SpaceBetween alignItems="end" direction="vertical">
            <Button className="mb-3" variant="primary" iconName="add-plus" onClick={() => {
              setCurrentUser({
                name: "",
                organization: "",
                status: "",
                email: "",
                assignTo: "",
                address: "",
                mobileNo: "",
                imageUrl: defaultimg,
                isNew: true
              });
              setIsModalOpen(true);
            }}>Add Customer</Button>
          </SpaceBetween>
          </div>
        
        }
        
        footer={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={handlePageChange}
            pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
            }}
            className="float-end"
          />
        }
      />
      {/* Add and Edit customer Modal  */}
<Modal
  onDismiss={() => setIsModalOpen(false)}
  visible={isModalOpen}
  closeAriaLabel="Close modal"
  size="medium"
  header={currentUser && currentUser.isNew ? "Add New User" : "Edit User"}
  footer={
    <SpaceBetween direction="horizontal" size="xs">
      <Button onClick={() => setIsModalOpen(false)} variant="link">Cancel</Button>
      <Button onClick={handleSave} variant="primary">Save</Button>
    </SpaceBetween>
  }
>
  {currentUser && (
    <form>
  <FormField
  errorText={validationErrors.imageUrl}
>
  <div className="flex items-center space-x-3">
    <img
      src={currentUser.imageUrl || defaultimg}
      alt="Profile"
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
    <label htmlFor="upload-image" className="cursor-pointer">
      <input
        type="file"
        id="upload-image"
        className="hidden"
        onChange={(e) =>
          handleFileChange(e, (url) =>
            setCurrentUser({ ...currentUser, imageUrl: url })
          )
        }
      />
     <div className={`flex justify-center items-center gap-1 border-2 border-[#0972D3] text-[#0972D3] rounded-md p-2  ${currentUser.imageUrl !== defaultimg ? 'cursor-not-allowed opacity-90' : ''}`}>
        <span>
          {currentUser.imageUrl === defaultimg ? "Upload Image" : "Change Image"}
        </span>
        <span>
          <FiUpload />
        </span>
      </div>
    </label>
    {currentUser.imageUrl !== defaultimg && (
      <div
       className="border-2 cursor-pointer border-[#0972D3] p-2 rounded-md"
        onClick={() =>
          setCurrentUser({ ...currentUser, imageUrl: defaultimg })
        }
       
        disabled={false}
         // Enable delete button when not using default image
      >
        <BsTrash/>
      </div>
    )}
 
  </div>
</FormField>

      <FormField
        label="Name"
        errorText={validationErrors.name}
      >
        <Input
          value={currentUser.name}
          onChange={(e) => {
            const newName = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              name: newName,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              name: !newName.trim() ? "Name is required" : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Organization"
        errorText={validationErrors.organization}
      >
        <Input
          value={currentUser.organization}
          onChange={(e) => {
            const newOrganization = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              organization: newOrganization,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              organization: !newOrganization.trim() ? "Organization is required" : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Status"
        errorText={validationErrors.status}
      >
        <Input
          value={currentUser.status}
          onChange={(e) => {
            const newStatus = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              status: newStatus,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              status: !newStatus.trim() ? "Status is required" : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Email"
        errorText={validationErrors.email}
      >
        <Input
          value={currentUser.email}
          onChange={(e) => {
            const newEmail = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              email: newEmail,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              email: !newEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
                ? "Invalid email format"
                : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Assign To"
        errorText={validationErrors.assignTo}
      >
        <Input
          value={currentUser.assignTo}
          onChange={(e) => {
            const newAssignTo = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              assignTo: newAssignTo,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              assignTo: !newAssignTo.trim() ? "Assign To is required" : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Address"
        errorText={validationErrors.address}
      >
        <Input
          value={currentUser.address}
          onChange={(e) => {
            const newAddress = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              address: newAddress,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              address: !newAddress.trim() ? "Address is required" : "",
            }));
          }}
        />
      </FormField>
      <FormField
        label="Mobile No"
        errorText={validationErrors.mobileNo}
      >
        <Input
          value={currentUser.mobileNo}
          onChange={(e) => {
            const newMobileNo = e.detail.value;
            setCurrentUser((prevUser) => ({
              ...prevUser,
              mobileNo: newMobileNo,
            }));
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              mobileNo: newMobileNo.length !== 10 || !/^\d+$/.test(newMobileNo)
                ? "Mobile No must be 10 digits"
                : "",
            }));
          }}
        />
      </FormField>
    </form>
  )}
</Modal>

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

export default CustomTable;
