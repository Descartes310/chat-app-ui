import { useState } from 'react';
import SendIcon from "@material-ui/icons/Send";
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

  const [text, setText] = useState('');

  const styles = useStyles();
  return (
    <Box display="flex" minHeight={70} alignItems="center" px={2}>
      <IconButton edge="start" color="inherit">
        <AttachFileIcon className={styles.icon} />
      </IconButton>

      <InputBase
        value={text}
        className={styles.input}
        placeholder={"Type a message..."}
        onChange={(e) => setText(e.target.value)}
      />

      <IconButton edge="end" color="inherit" onClick={() => {
        if (text.trim().length > 0) {
          onSend(text);
          setText('');
        }
      }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBar;
