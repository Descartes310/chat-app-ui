import Chat from "./Chat";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  date: {
    fontWeight: 500,
    color: "rgba(0,0,0,0.4)",
    margin: "12px 0",
    fontSize: 12,
    textAlign: "center"
  }
}));

const ChatConversation = ({ user, interlocutor, messages = [] }) => {
  const styles = useStyles();
  return (
    <Box p={"16px 30px 12px 10px"}>
      {
        messages.map(message => (
          <Chat
            side={message.sender.id === user.id ? "right" : "left"}
            avatar={message.sender.id === user.id ? user.avatar : interlocutor.avatar}
            messages={[message]}
          />
        ))
      }
      {/* <Typography className={styles.date}>FRI 1:46 PM</Typography> */}
    </Box>
  );
};

export default ChatConversation;