// Importing required packages
import React, { useEffect, useState } from 'react'
import { LoremIpsum } from 'lorem-ipsum'

const DrawerComponent = ({ Blocks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [blockDocument, setBlockDocument] = useState(Blocks);

  useEffect(() => {
    if (isOpen) {
      setContent(document.getElementById('artisan-frame').contentDocument.documentElement.outerHTML);
    }
  }, [isOpen]);

  return (
    <div>
      <div id="drawer" className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${isOpen ? '' : 'hidden'}`}>
        <div className="absolute top-0 left-0 w-96 h-full bg-white overflow-auto">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <div id="drawer-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <iframe id="artisan-frame" srcDoc={blockDocument} className="w-full h-screen m-0" onClick={() => setIsOpen(true)} />
    </div>
  );
}

export default DrawerComponent;
