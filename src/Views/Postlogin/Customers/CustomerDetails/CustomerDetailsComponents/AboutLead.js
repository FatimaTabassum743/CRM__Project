import React, { useState } from "react";

import { Box, SpaceBetween, ExpandableSection} from '@cloudscape-design/components';
import displaypic from "../../../../../assets/img/display pic.png";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Grid } from "@cloudscape-design/components";

import { IoCopyOutline } from "react-icons/io5";

const AboutLead = () => {
  const [tags, setTags] = useState([
    { label: "Lead", color: "#F2F8FD" },
    { label: "Verified", color: "#F2FCF3" },
    { label: "React", color: "#FADAD4" },
  ]);
  const [newTag, setNewTag] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const addTag = () => {
    if (newTag.trim() !== "") {
      const colors = ["#F2F8FD", "#F2FCF3", "#FADAD4"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setTags([...tags, { label: newTag, color: randomColor }]);
      setNewTag("");
      setIsAddingTag(false);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  return (
    <Box variant="div" className="drawer-example sticky border-[1px] border-[#E9EBED]">
  

      
          < div className="pl-3">
            <p className="mb-2 text-sm font-extrabold mt-2">About This Lead</p>
            <div className="flex gap-2 items-center">
              <img src={displaypic} alt="lead" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold text-xs">John Cena</p>
                <div className="flex gap-1 mt-2">
                  <span className="flex items-center px-[3px] rounded-sm bg-[#F8F8F8] gap-1">
                    <FiPhoneCall size={10}/>
                    <p className="text-xs font-normal">Call</p>
                  </span>
                  <span className="flex items-center px-[3px] rounded-sm bg-[#F8F8F8] gap-1">
                    <MdOutlineMailOutline size={12} />
                    <p className="text-xs font-normal">Email</p>
                  </span>
                  <span className="flex items-center px-[3px] rounded-sm bg-[#F8F8F8] gap-1">
                    <IoCopyOutline size={12} />
                    <p className="text-xs font-normal">Copy</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1">
            <Grid
      gridDefinition={[{ colspan: 2 }, { colspan: 10 }]}
      disableGutters
      
    >
      <div className="font-semibold text-xs mt-5">Tags:</div>
      <div className="grid grid-cols-2 mt-1 gap-1 p-1 mr-8">
               
               {tags.map((tag, index) => (
                 <div
                   key={index}
                   className="flex justify-center p-[3px] text-xs rounded-sm items-center gap-[2px]"
                   style={{ backgroundColor: tag.color }}
                 >
                   <p className="text-xs ">{tag.label}</p>
                   <span className=" text-[#013605] " onClick={() => removeTag(index)}>
                     <AiOutlineClose  size={10}/>
                   </span>
                 </div>
               ))}
               {!isAddingTag && (
                 <span
                   className="flex items-center justify-center gap-[5px]  bg-[#F4F4F4] text-xs rounded cursor-pointer"
                   onClick={() => setIsAddingTag(true)}
                 >
                   <AiOutlinePlus size={8} />
                   <p> New Tag</p>
                 </span>
               )}
             </div>
             {isAddingTag && (
               <input
                 type="text"
                 value={newTag}
                 onChange={(e) => setNewTag(e.target.value)}
                 onKeyPress={handleKeyPress}
                 placeholder="New tag"
                 className="mt-2 p-1 border rounded text-xs"
                 autoFocus
               />
             )}
          
    </Grid>
    


    </div>


    </div>
    <hr></hr>
        
      
 
<Box padding={10} margin={2}>
  <SpaceBetween direction="vertical" size="s">
    <ExpandableSection variant="h6" headerText="Personal Information" defaultExpanded className="pl-5 mt-2">
      <div className="space-y-2 mt-1">
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Name</div>
          <div className="text-[#000716] text-xs">John Doe</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Age</div>
          <div className="text-[#000716] text-xs">30</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Location</div>
          <div className="text-[#000716] text-xs">New York, USA</div>
        </div>
      </div>
    </ExpandableSection>
    <hr></hr>

    
    <ExpandableSection variant="h6" headerText="Professional Information"className="pl-5">
      <div className="space-y-2 mt-1">
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Occupation</div>
          <div className="text-[#000716] text-xs">Software Engineer</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Company</div>
          <div className="text-[#000716] text-xs">Tech Corp</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-[#5F6B7A] text-xs">Experience</div>
          <div className="text-[#000716] text-xs">5 years</div>
        </div>
      </div>
    </ExpandableSection>
    <hr></hr>

    
    <ExpandableSection variant="h6" headerText="Social Information" className="mb-2 pl-5">
  <div className="space-y-2 mt-1">
    <div className="grid grid-cols-2">
      <div className="text-[#5F6B7A] text-xs">Gmail</div>
      <div className="text-[#000716] text-xs">johndoe@gmail</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="text-[#5F6B7A] text-xs">LinkedIn</div>
      <div className="text-[#000716] text-xs">linkedin.com/i/john</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="text-[#5F6B7A] text-xs">GitHub</div>
      <div className="text-[#000716] text-xs">github.com/john</div>
    </div>
  </div>
</ExpandableSection>
<hr></hr>

    
  </SpaceBetween>
</Box>

      
    </Box>
  );
};

export default AboutLead;
