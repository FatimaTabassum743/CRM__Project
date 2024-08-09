import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  Icon,
  Box,
} from "@cloudscape-design/components";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineMailOutline, MdOutlineAddShoppingCart } from "react-icons/md";
import { VscCallOutgoing, VscReply, VscDebugStart } from "react-icons/vsc";
import { LuReplyAll } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
import { IoArrowForwardSharp } from "react-icons/io5";
import managerpic from "../../../../../assets/img/profile-img.jpg";
import leadpic from "../../../../../assets/img/display pic.png";

const Activity = () => {
  // Use useMemo to memoize the timeline items, preventing unnecessary re-renders
  const timelineItems = useMemo(
    () => [
      {
        dot: <Icon name="user-profile" />,
        children: (
          <Container
            variant="borderless"
            className="flex justify-between w-full"
          >
            <Box variant="span" className="flex gap-2">
              <Box variant="h5" className="font-semibold">
                Akber Ahmed Khan
              </Box>
              <Box variant="p" className="text-[#5F6B7A]">
                created this lead
              </Box>
            </Box>
            <Box variant="span" className="text-[#5F6B7A]">
              2 days ago
            </Box>
          </Container>
        ),
      },
      {
        dot: <MdOutlineMailOutline className="text-xl" />,
        children: (
          <Container
            variant="borderless"
            className="bg-gray-100 w-full p-4 flex justify-between rounded-md"
          >
            <Box variant="div" className="flex gap-3">
              <img
                src={leadpic}
                alt="person"
                className="w-10 h-10 rounded-full"
              />
              <Box variant="div">
                <Box variant="span" className="flex gap-2">
                  <h5 className="font-semibold">John Cena</h5>
                  <Box variant="p" className="text-[#5F6B7A]">
                    2 days ago
                  </Box>
                </Box>
                <Box variant="p" className="text-[#5F6B7A]">
                  To: akber.ahmed.khan@gmail.com
                </Box>
                <Box variant="p" className="text-[#5F6B7A]">
                  Cc: justanotherperson@gmail.com
                </Box>
                <Box variant="p">Hello Mr Akbar,</Box>
                <Box variant="p" className="mt-3 mb-3">
                  I am really interested in your business. Can you schedule a
                  meeting and provide us with a demo on 2nd July at 10:00 AM
                  (PST)?
                </Box>
                <Box variant="p">Kind Regards,</Box>
                <Box variant="p">WWE Fighter,</Box>
                <Box variant="p">John Cena.</Box>
              </Box>
            </Box>
            <Box variant="div" className="flex gap-2">
              <VscReply className="text-xl" />
              <LuReplyAll className="text-xl" />
            </Box>
          </Container>
        ),
      },
      {
        dot: <VscCallOutgoing className="text-xl" />,
        children: (
          <Container
            variant="borderless"
            className="bg-gray-100 w-full p-4 flex justify-between rounded-md"
          >
            <Box variant="div">
              <Box variant="span" className="flex gap-2">
                <h5 className="font-semibold">Outbound Call</h5>
                <Box variant="p" className="text-[#5F6B7A]">
                  69 minutes ago
                </Box>
              </Box>
              <Box variant="div" className="flex gap-2 items-center">
                <CiClock2 className="text-xl" />
                <Box variant="p" className="text-[#5F6B7A]">
                  1 hour 21 seconds
                </Box>
              </Box>
              <Box variant="div" className="flex gap-5 items-center mt-2">
                <Box variant="div" className="flex gap-3 items-center">
                  <img
                    src={managerpic}
                    alt="person"
                    className="w-10 h-10 rounded-full"
                  />
                  <Box variant="span">
                    <h4 className="font-semibold">Akber Ahmed Khan</h4>
                    <Box variant="p" className="text-[#5F6B7A]">
                      978754856437
                    </Box>
                  </Box>
                </Box>
                <IoArrowForwardSharp className="text-xl" />
                <Box variant="div" className="flex gap-3 items-center">
                  <img
                    src={leadpic}
                    alt="person"
                    className="w-10 h-10 rounded-full"
                  />
                  <Box variant="span">
                    <h4 className="font-semibold">John cena</h4>
                    <Box variant="p" className="text-[#5F6B7A]">
                      978754856437
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box variant="div" className="flex gap-1 items-center">
              <VscDebugStart className="text-xl" />
              <Box variant="p">Play Recording</Box>
            </Box>
          </Container>
        ),
      },
      {
        dot: <FaRegComment className="text-xl" />,
        children: (
          <Container variant="borderless" className="flex flex-col w-full">
            <Box variant="div" className="flex justify-between w-full">
              <Box variant="span" className="flex gap-2">
                <h6 className="font-semibold">Akber Ahmed Khan</h6>
                <Box variant="p" className="text-[#5F6B7A]">
                  Added a comment
                </Box>
              </Box>
              <Box variant="span" className="text-[#5F6B7A]">
                30 minutes ago
              </Box>
            </Box>
            <Box
              variant="div"
              className="bg-gray-100 p-4 rounded-md mt-2 gap-4"
            >
              <Box variant="span">
                <h5 className="font-semibold">@Sohail Ali Khan</h5>
                <Box variant="p">
                  Could you please schedule a meeting with John Cena for next
                  Friday at 10:00 AM? Ensure to send out the meeting invitation
                  and any necessary details. Thanks.
                </Box>
              </Box>
            </Box>
          </Container>
        ),
      },
      {
        dot: <MdOutlineAddShoppingCart className="text-xl" />,
        children: (
          <Container variant="borderless" className="w-full">
            <Box variant="div" className="flex justify-between w-full">
              <Box variant="span" className="flex gap-2">
                <h6 className="font-semibold">john </h6>
                <Box variant="p" className="text-[#5F6B7A]">
                  Added 9 items in cart
                </Box>
              </Box>
              <Box variant="span" className="text-[#5F6B7A]">
                30 minutes ago
              </Box>
            </Box>
            <Box variant="div" className="bg-gray-100 p-4 rounded-md mt-2">
              <Box variant="p" className="mb-2">
                Send them a reminder to check out
              </Box>
              <SpaceBetween direction="horizontal" size="s">
                <Button variant="primary">Send Now</Button>
                <Button href="#" variant="link" iconName="settings">
                  View settings
                </Button>
              </SpaceBetween>
            </Box>
          </Container>
        ),
      },
    ],
    []
  );

  // Create a reference to the timeline container
  const timelineRef = useRef(null);
  // State to store the height of the timeline
  const [timelineHeight, setTimelineHeight] = useState(0);

  // Use useEffect to calculate the height of the timeline line after the component mounts
  useEffect(() => {
    if (timelineRef.current) {
      const lastItem = timelineRef.current.lastChild;
      if (lastItem) {
        setTimelineHeight(lastItem.offsetTop + lastItem.offsetHeight / 2 - 45);
      }
    }
  }, [timelineItems]);

  return (
    <Container
      variant="borderless"
      className="border-[1px] border-[#E9EBED] rounded-lg"
    >
      <Header
        actions={
          <SpaceBetween alignItems="center" direction="horizontal" size="xs">
            <Button iconName="add-plus" variant="primary">
              Add Activity
            </Button>
          </SpaceBetween>
        }
        variant="h3"
        className="mb-5"
      >
        Activities
      </Header>
      <div className="relative pl-8" ref={timelineRef}>
        <div
          className="absolute border-l-2 border-gray-200 left-4 transform -translate-x-1/2"
          style={{ height: timelineHeight }}
        ></div>
        {timelineItems.map((item, index) => (
          <div key={index} className="timeline-item flex items-start mb-8">
            <div className="timeline-dot bg-white border-2 border-gray-300 rounded-full p-1 -ml-8 flex items-center justify-center z-10">
              {item.dot}
            </div>
            <div className="timeline-content  rounded-md  w-full ml-8">
              {item.children}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Activity;
