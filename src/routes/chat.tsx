import { useState } from "react";
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ChatList from "../components/ChatList";
import ChatIcon from "@material-ui/icons/Chat";
import { Box, Badge } from "@material-ui/core";
import AppSidebar from "../components/AppSideBar";
import ChatDetails from "../components/ChatDetails";
import { setAuthUser } from '../actions/AuthActions';
import { makeStyles } from "@material-ui/core/styles";
import ChatListHeader from "../components/ChatListHeader";
import MeetingIcon from "@material-ui/icons/RecordVoiceOver";

const users = [
    {
        id: "1",
        name: "Sundaramoorthi SNS",
        lastText: "You sent a photo • 1:05 PM",
        imgUrl: "https://i.pravatar.cc/300?img=100",
        status: { read: true, responded: true, online: true }
    },
    {
        id: "2",
        name: "Rathna Rajendran",
        lastText: "Where r u? • 1:54 PM",
        imgUrl: "https://i.pravatar.cc/300?img=100",
        status: { read: true, responded: true, online: true }
    },
    {
        id: "3",
        name: "Jagadeesh Palaniappan",
        lastText: "You sent a photo • 1:05 PM",
        imgUrl:
            "https://avatars2.githubusercontent.com/u/2826368?s=460&u=fa549158be45516110cbf9f0306eb28e5fd42e9e&v=4",
        status: { read: true, responded: true, online: true }
    },
    {
        id: "4",
        name: "Sangeeth P",
        lastText: "You sent a photo • 1:05 PM",
        imgUrl: "https://i.pravatar.cc/300?img=100",
        status: { read: true, responded: true, online: true }
    },
    {
        id: "5",
        name: "Manikavasagam",
        lastText: "You sent a photo • 1:05 PM",
        imgUrl: "https://i.pravatar.cc/300?img=100",
        status: { read: true, responded: true, online: true }
    },
    {
        id: "6",
        name: "Moheith",
        lastText: "He sent a photo • 1:05 PM",
        imgUrl: "https://i.pravatar.cc/300?img=100",
        status: { read: true, responded: true, online: true }
    }
];

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

    const [selectedIdx] = useState(0);
    const [selectedItem, setSelectedItem] = useState(false);
    const handleClick = (e: any, item: any) => {
        console.log("handleClick: item:", item);
        setSelectedItem(item);
    };

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
                        items={users}
                        selectedItem={selectedItem}
                        onClick={handleClick}
                    />
                </Box>
                <Box flexGrow={1}>
                    <ChatDetails />
                </Box>
            </Box>
        </div>
    );
}

// map state to props
const mapStateToProps = (state: any) => {
    const { authUser } = state
    return { authUser: authUser.data };
};

export default connect(mapStateToProps, { setAuthUser })(Chat);