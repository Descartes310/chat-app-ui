import SendIcon from "@material-ui/icons/Send";
import { useState, useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Box, InputBase, IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    flex: "auto",
    borderRadius: 40,
    paddingLeft: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    margin: "0 8px",
    height: 36,
    fontSize: 13
  }
}));

const ChatBar = ({ onSend }) => {
  const styles = useStyles();
  const fileInput = useRef(null)

  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if(file) {
      onSend(null, file);
    }
  }, [file]);


  const openFileExplorer = () => {
    fileInput.current.click()
  };

  return (
    <Box display="flex" minHeight={70} alignItems="center" px={2}>
      <IconButton edge="start" color="inherit" onClick={() => openFileExplorer()}>
        <AttachFileIcon className={styles.icon} />
      </IconButton>

      <input
        id='file'
        type='file'
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={event => {
          setFile(event.target.files[0]);
        }}
        accept="image/png, image/gif, image/jpeg"
      />

      <InputBase
        value={text}
        className={styles.input}
        placeholder={"Type a message..."}
        onChange={(e) => setText(e.target.value)}
      />

      <IconButton edge="end" color="inherit" onClick={() => {
        if (text.trim().length > 0) {
          onSend(text, null);
          setText('');
        }
      }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBar;
