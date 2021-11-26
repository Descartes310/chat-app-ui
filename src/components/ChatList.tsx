import UserAvatar from "./UserAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "inherit"
  },
  inline: {
    display: "inline"
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '5%'
  }
}));

const ChatListItem = ({ item, selectedItem, onClick, user, isUser }: any) => {
  const interlocutor = !isUser ? item.users.filter(u => u.id !== user.id)[0] : item;
  return (
    <ListItem
      button
      alignItems="flex-start"
      onClick={() => onClick(item, isUser)}
      selected={selectedItem ? selectedItem.id === item.id : false}
    >
      <ListItemAvatar>
        <UserAvatar name={interlocutor.fullName} avatar={interlocutor.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={interlocutor.fullName}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        secondary={isUser ? `Say Hi to ${interlocutor.fullName}` : `Start a chat with ${interlocutor.fullName}`}
      />
    </ListItem>
  );
};

export default function ChatList({ items, selectedItem, onClick, user, users }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {items.length > 0 && (
        <>
          <p className={classes.title}>Chats</p>
          {items.map((item, index) => (
            <ChatListItem
              key={index}
              user={user}
              item={item}
              onClick={onClick}
              selectedItem={selectedItem}
            />
          ))}
        </>
      )}
      {users.length > 0 && (
        <>
          <p className={classes.title}>Contacts</p>
          {users.map((item, index) => (
            <ChatListItem
              isUser
              key={index}
              user={user}
              item={item}
              onClick={onClick}
              selectedItem={selectedItem}
            />
          ))}
        </>
      )}
    </List>
  );
}
