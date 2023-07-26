import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Overvieweditor = () => {

        const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
      );
      useEffect(() => {
   
      }, [editorState]);
    
   
    return ( <>
    <label htmlFor="exampleInputEmail1">Over View</label>
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
      
        />
      </div>
    
      <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      
    </> );
}
 
export default Overvieweditor;