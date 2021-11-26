import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatIcon from "@material-ui/icons/Chat";
import { Box, Badge } from "@material-ui/core";
import AppSidebar from "../components/AppSideBar";
import ChatDetails from "../components/ChatDetails";
import { setAuthUser } from '../actions/AuthActions';
import { makeStyles } from "@material-ui/core/styles";
import { setSelectedChat } from '../actions/ChatActions';
import ChatListHeader from "../components/ChatListHeader";
import MeetingIcon from "@material-ui/icons/RecordVoiceOver";
import { getChats, getMessages } from '../actions/independentActions';

const user = {
    id: "3",
    name: "Jagadeesh Palaniappan",
    lastText: "You sent a photo • 1:05 PM",
    imgUrl:
        "https://avatars2.githubusercontent.com/u/24218022?s=460&u=7cc625db65a7effc54069e28432432bd1fc89c44&v=4",
    status: { read: true, responded: true, online: true }
};

const items = [
    {
        id: "chat",
        name: "Chat",
        route: "/chat",
        icon: (
            <Badge badgeContent={4} color="secondary">
                <ChatIcon />
            </Badge>
        )
    },
    { id: "meet", name: "Meeting", route: "/meet", icon: <MeetingIcon /> },
    {
        id: "user",
        name: "JagChat",
        icon: <Avatar alt={user.name} src={user.imgUrl} />,
        endItem: true,
        iconOnly: true
    }
];

const useStyles = makeStyles(theme => ({
    appContainer: {
        flexGrow: 1,
        display: "flex",
        height: "100vh"
    }
}));

function Chat(props: any) {
    const classes = useStyles();

    useEffect(() => {
        getAllChats();
    }, []);

    useEffect(() => {
        if (props.selectedChat)
            getAllMessages();
    }, [props.selectedChat]);

    const [selectedIdx] = useState(0);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    const handleClick = (e: any, item: any) => {
        props.setSelectedChat(item);
    };

    const getAllChats = () => {
        getChats().then((chats: any) => {
            setChats(chats);
        });
    }

    const getAllMessages = () => {
        if (!props.selectedChat)
            return
        getMessages(props.selectedChat.id).then((messages: any) => {
            setMessages(messages);
        });
    }

    return (
        <div className={classes.appContainer}>
            <AppSidebar
                items={items}
                selectedIdx={selectedIdx}
                onChange={() => console.log('test')}
            />
            <Box display="flex" flexGrow={1} style={{ overflowY: "hidden" }}>
                <Box
                    width="300px"
                    flexShrink={0}
                    bgcolor="background.paper"
                    style={{ overflowY: "auto" }}
                >
                    <ChatListHeader />
                    <ChatList
                        items={chats}
                        user={props.authUser}
                        onClick={handleClick}
                        selectedItem={props.selectedChat}
                    />
                </Box>
                <Box flexGrow={1}>
                    {props.selectedChat && (
                        <ChatDetails
                            messages={messages}
                            user={props.authUser}
                            selectedItem={props.selectedChat}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );
}

// map state to props
const mapStateToProps = (state: any) => {
    const { authUser, selectedChat } = state
    return { authUser: authUser.data, selectedChat: selectedChat.data };
};

export default connect(mapStateToProps, { setAuthUser, setSelectedChat })(Chat);