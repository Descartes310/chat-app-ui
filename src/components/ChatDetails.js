import { Box } from "@material-ui/core";
import ChatConversation from "./ChatConversation";
import ChatDetailsHeader from "./ChatDetailsHeader";
import ChatDetailsFooter from "./ChatDetailsFooter";
import { sendMessages } from "../actions/independentActions";

function ChatDetails({ selectedItem = {}, user, messages = [] }) {

    const onSendMessages = (content, file) => {
        let data = {};
        console.log(file)

        if(file) {
            data.file = file;
        } else {
            data.content = content;
        }

        sendMessages(selectedItem.id, data, { fileData: ['file'], multipart: true });
    }

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <ChatDetailsHeader chat={selectedItem} user={user} />
            <Box p={3} height="100%" style={{ overflowY: "auto" }}>
                <ChatConversation interlocutor={selectedItem.users.filter(u => u.id !== user.id)[0]} user={user} messages={messages} />
            </Box>
            <ChatDetailsFooter onSend={(text, file) => onSendMessages(text, file)} />
        </Box>
    );
}

export default ChatDetails;