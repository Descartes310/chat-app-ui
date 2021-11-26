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

const ChatListItem = ({ item, selectedItem, onClick }) => {
  console.log("ChatListItem: selectedItem:", selectedItem);
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={e => onClick(e, item)}
      selected={selectedItem.id === item.id}
    >
      <ListItemAvatar>
        <Avatar alt={item.name} src={item.imgUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={item.lastText}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        // classes={{ primary: styles.primary, secondary: styles.secondary }}
      />
    </ListItem>
  );
};

export default function ChatList({ items, selectedItem, onClick }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {items.map((item, idx) => (
        <ChatListItem
          key={idx}
          item={item}
          selectedItem={selectedItem}
          onClick={onClick}
        />
      ))}
    </List>
  );
}
