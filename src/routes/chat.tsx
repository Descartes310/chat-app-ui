import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatIcon from "@material-ui/icons/Chat";
import { SOCKET_URL } from '../urls/backendUrl';
import AppSidebar from "../components/AppSideBar";
import ChatDetails from "../components/ChatDetails";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { setSelectedChat } from '../actions/ChatActions';
import ChatListHeader from "../components/ChatListHeader";
import { setAuthUser, logout } from '../actions/AuthActions';
import { getChats, getMessages, getUsers } from '../actions/independentActions';

const useStyles = makeStyles(theme => ({
    appContainer: {
        flexGrow: 1,
        display: "flex",
        height: "100vh"
    }
}));

function Chat(props: any) {
    const classes = useStyles();

    const items = [
        {
            id: "chat",
            name: "Chat",
            route: "/chat",
            icon: <ChatIcon />
        },
        {
            icon: <ExitToApp style={{ fontSize: 30 }} onClick={() => props.logout()}/>,
            endItem: true,
            iconOnly: true
        }
    ];    

    useEffect(() => {
        getAllChats();
        getAllUsers();
    }, []);

    useEffect(() => {
        if (props.selectedChat)
            getAllMessages();
    }, [props.selectedChat]);

    const [selectedIdx] = useState(0);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState<any>([]);

    const handleClick = (item: any, isUser: boolean) => {
        if(isUser) {
            item = {
                id: 0,
                users: [item]
            }
        }
        props.setSelectedChat(item);
    };

    const getAllChats = () => {
        getChats().then((chats: any) => {
            setChats(chats);
        });
    }

    const getAllUsers = () => {
        getUsers().then((users: any) => {
            setUsers(users.filter(u => u.id !== props.authUser.id));
        });
    }

    const getAllMessages = () => {
        if (!props.selectedChat)
            return
        getMessages(props.selectedChat.id).then((messages: any) => {
            setMessages(messages);
        });
    }

    const onMessageReceived = (message: any) => {
        //Checking if user need to get the new message
        if (message.chat.users.map(u => u.id).includes(props.authUser.id)) {
            setMessages([...messages, message]);
            console.log('New GOOD Message Received!!', message);
            //Update chat items
            getAllChats();
            getAllUsers();
        } else {
            console.log('New BAD Message Received!!', message);
        }
    }

    return (
        <div className={classes.appContainer}>
            <SockJsClient
                debug={true}
                url={SOCKET_URL}
                topics={['/topic/group']}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
            />
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
                        users={users}
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
        </div >
    );
}

// map state to props
const mapStateToProps = (state: any) => {
    const { authUser, selectedChat } = state
    return { authUser: authUser.data, selectedChat: selectedChat.data };
};

export default connect(mapStateToProps, { setAuthUser, setSelectedChat, logout })(Chat);