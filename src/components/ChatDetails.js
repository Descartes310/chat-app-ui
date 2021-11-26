import { Box } from "@material-ui/core";
import ChatDetailsHeader from "./ChatDetailsHeader";
import ChatConversation from "./ChatConversation";
import ChatDetailsFooter from "./ChatDetailsFooter";

const chatUser = {
    id: "3",
    name: "Jagadeesh Palaniappan",
    lastText: "You sent a photo • 1:05 PM",
    imgUrl:
        "https://avatars2.githubusercontent.com/u/2826368?s=460&u=fa549158be45516110cbf9f0306eb28e5fd42e9e&v=4",
    status: { read: true, responded: true, online: true }
};

function ChatDetails(props) {
    return (
        <Box display="flex" flexDirection="column" height="100%">
            <ChatDetailsHeader user={chatUser} />
            <Box p={3} height="100%" style={{ overflowY: "auto" }}>
                <ChatConversation />
            </Box>
            <ChatDetailsFooter />
        </Box>
    );
}

export default ChatDetails;