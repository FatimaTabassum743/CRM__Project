import * as React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import SideNavigation from "@cloudscape-design/components/side-navigation";


const Sidebar = () => {
  const [activeHref, setActiveHref] = React.useState("/app/dashboard");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleFollow = (event, href) => {
    if (!event.detail.external) {
      event.preventDefault();
      setActiveHref(href);
      navigate(href); // Navigate to the route programmatically
    }
  };

  return (
    
    <SideNavigation 
    
    className="shadow-2xl shadow-[#E9EBED66] "
      
      activeHref={activeHref}
      header={{ href: "#/", text: <span className=" font-extrabold text-[16px]">PTR Technologies</span> }}
      onFollow={event => handleFollow(event, event.detail.href)}
      items={[
        { type: "link", text: "Dashboard", href: "/app/dashboard" },
        { type: "link", text: "Notification", href: "/app/" },
        { type: "link", text: "Notes", href: "/app/" },
        { type: "link", text: "Tasks", href: "/app/" },
        { type: "link", text: "Emails", href: "/app/" },
        { type: "link", text: "Calender", href: "/app/" },
        {
          type: "section-group",
          title: <h5 className="text-[#7D838B] font-sans text-[15px]">Database</h5>,
          items: [
            {
              type: "link",
              text: "Analytics",
              href: "#/page2"
            },
            {
              type: "link",
              text: "Contacts",
              href: "/app/customers"
            },
            {
              type: "link",
              text: "Companies",
              href: "#/"
            }
          ]
        },

        { type: "divider" },
        {
          type: "link",
          text: "Notifications",
          href: "#/notifications",
      
        },
        {
          type: "link",
          text: "Integrations",
          href: "https://example.com",
          // external: true
        }
      ]}
    />
  );
};

export default Sidebar;
