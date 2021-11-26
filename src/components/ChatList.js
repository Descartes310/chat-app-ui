import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
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
  }
}));

const ChatListItem = ({ item, selectedItem, onClick, user }) => {
  const interlocutor = item.users.filter(u => u.id !== user.id)[0];
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={e => onClick(e, item)}
      selected={selectedItem ? selectedItem.id === item.id : false}
    >
      <ListItemAvatar>
        <Avatar alt={interlocutor.fullName} src={interlocutor.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={interlocutor.fullName}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        secondary={`Say Hi to ${interlocutor.fullName}`}
      />
    </ListItem>
  );
};

export default function ChatList({ items, selectedItem, onClick, user }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {items.map((item, idx) => (
        <ChatListItem
          key={idx}
          user={user}
          item={item}
          onClick={onClick}
          selectedItem={selectedItem}
        />
      ))}
    </List>
  );
}
