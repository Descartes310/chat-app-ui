import Chat from "./Chat";
import Box from "@material-ui/core/Box";
import { useRef, useEffect } from "react";

const ChatConversation = ({ user, interlocutor, messages = [] }: any) => {
  var box: any = useRef(null);

  //scroll to bottom when new message comes
  useEffect(() => {
    if (messages.length > 0)
      box.current.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

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
      <div ref={box} />
    </Box>
  );
};

export default ChatConversation;