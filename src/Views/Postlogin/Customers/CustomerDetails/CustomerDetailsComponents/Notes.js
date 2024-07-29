import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  ButtonDropdown,

  Modal
} from '@cloudscape-design/components';
import '@cloudscape-design/global-styles/index.css';
import Tiles from "@cloudscape-design/components/tiles";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { FaCalendarAlt } from 'react-icons/fa';
import { RiVipCrownFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";

const Notes = () => {
  // State variables
  const [text, setText] = useState('');
  const [tiles, setTiles] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [tileToDelete, setTileToDelete] = useState(null);

  // Ref for ReactQuill editor
  const quill = useRef();

  // Callback to handle image insertion
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }
          ],
          [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ],
        handlers: {
          image: imageHandler
        }
      }
    }),
    [imageHandler]
  );

  // Quill formats configuration
  const formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  // Function to strip HTML tags from text
  const stripHtml = (html) => {
    let temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = html;
    return temporaryDiv.textContent || temporaryDiv.innerText || "";
  };

  // Handle text change in the editor
  const handleProcedureContentChange = (content) => {
    setText(content);
    const plainText = stripHtml(content);
    setIsButtonDisabled(plainText.trim().length === 0);
  };

  // Handle add button click
  const handleAddClick = () => {
    if (text.trim().length > 0) {
      const newTile = {
        description: text,
        value: `item${tiles.length + 1}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      };
      setTiles([...tiles, newTile]);
      setText('');
      setIsButtonDisabled(true);
    }
  };

  // Handle edit button click
  const handleEditClick = (index) => {
    const tileToEdit = tiles[index];
    setText(tileToEdit.description);
    setSelectedTile(tileToEdit);
    setTiles(tiles.filter((_, i) => i !== index));
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    setTiles(tiles.filter((_, i) => i !== tileToDelete));
    setTileToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleClick = (item, index) => {
    switch (item.detail.id) {
      case "edit":
        handleEditClick(index);
        break;
      case "delete":
        setTileToDelete(index);
        setIsDeleteModalVisible(true);
        break;
      default:
        break;
    }
  };

  // Render tile menu with edit and delete options
  const renderTileMenu = (index) => (
    <ButtonDropdown
      items={[
        { id: "edit", text: "Edit" },
        { id: "delete", text: "Delete" }
      ]}
      ariaLabel="Tile menu"
      variant="inline-icon"
      onItemClick={(item) => handleClick(item, index)}
    />
  );

  return (
    <Container
    variant='borderless'
    className='border-[1px] border-[#E9EBED] rounded-lg'>
      <SpaceBetween size="s" direction='vertical'>
        <Header
          actions={
            <SpaceBetween alignItems='center' direction='horizontal' size='xs'>
            </SpaceBetween>
          }
          variant='h3'
        >
          New Note
        </Header>

        <ReactQuill
          ref={(el) => (quill.current = el)}
          theme="snow"
          value={text}
          placeholder="Note Description"
          onChange={handleProcedureContentChange}
          style={{ height: "220px", borderRadius: 50, marginBottom: "50px" }}
         
          modules={modules}
          formats={formats}
        />

        <Button variant='normal' onClick={handleAddClick} disabled={isButtonDisabled} className='float-end'>Add Note</Button>
        <h3 className='text-sm font-extrabold'>Recent Notes</h3>

        <Tiles
          
          columns={1}
          onChange={({ detail }) => setSelectedTile(detail.value)}
          value={selectedTile}
          items={tiles.map((tile, index) => ({
            ...tile,
            // label: <h3 className='text-sm font-semibold'>Insert Note Title Here</h3>,
            description: (
              <div className='w-[51vw]'>
                
                  <div className=' flex justify-between'>
                    <div className=' text-[#525866] text-sm w-[42vw]' dangerouslySetInnerHTML={{ __html: tile.description }} />
                    
                    <div className='flex gap-[2px] content-center'>
                      <FaCalendarAlt />
                      <span className='text-[#525866]'>{tile.date}</span>
                      <span>{renderTileMenu(index)}</span>
                    </div>
                  </div>
                  <div className='flex  justify-between items-center'>
            
                    <div className='flex gap-2 mt-[2px]'>
                      <span className='rounded-full bg-[#FFDAC2] gap-1 px-2 py-[3px] flex items-center'>
                      <RiVipCrownFill /><p className='text-xs'>VIP Client </p> 
                      </span>
                      <span className='rounded-full bg-[#C2D6FF] gap-1 px-2  py-[3px]  flex items-center '>
                      <BsLightningChargeFill />
                      <p className='text-xs'>Urgent </p> 
                      </span>
                    </div>
                    <span className='flex text-[#868C98]'>
                      <p>Added By:</p>
                      <h4 className='font-semibold ml-1'>Akber Khan</h4>
                    </span>
                    
                  </div>
                  
               
              
             
              </div>
            ),
          }))}
        />

        <Modal
          onDismiss={() => setIsDeleteModalVisible(false)}
          visible={isDeleteModalVisible}
          closeAriaLabel="Close modal"
          header="Confirm Deletion"
          size='small'
          footer={
            <SpaceBetween direction="horizontal" size="s">
              <Button onClick={() => setIsDeleteModalVisible(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleDeleteClick}>Delete</Button>
            </SpaceBetween>
          }
        >
          Are you sure you want to delete this note?
        </Modal>
      </SpaceBetween>
    </Container>
  );
};

export default Notes;
