import { makeStyles } from "@material-ui/core/styles";
import { Box, InputBase, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TagFaces from "@material-ui/icons/TagFaces";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";

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

const ChatBar = ({ concise }) => {
  const styles = useStyles();
  return (
    <Box display="flex" minHeight={70} alignItems="center" px={2}>
      <IconButton edge="start" color="inherit">
        <AttachFileIcon className={styles.icon} />
      </IconButton>

      <InputBase
        className={styles.input}
        placeholder={"Type a message..."}
        startAdornment={
          <InputAdornment position={"start"}>
            <IconButton edge="start" color="inherit">
              <TagFaces />
            </IconButton>
          </InputAdornment>
        }
      />

      <IconButton edge="end" color="inherit">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBar;
