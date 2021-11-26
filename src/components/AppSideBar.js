import { Tabs, Tab } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    // width: "100%",
    minWidth: 65
  },
  tabsContainer: {
    height: "100%"
  },
  tabsIndicator: {
    backgroundColor: theme.palette.background.paper
    // backgroundColor: "inherit"
  },
  btmStartTab: {
    marginTop: "auto"
  }
}));

const CustomTab = withStyles(theme => ({
  root: {
    minWidth: 65,
    minHeight: 65,
    fontSize: "0.1rem",
    "&:hover": {
      // color: "#1890ff",
      // opacity: 1
    },
    "&$selected": {
      // color: "#1890ff",
      // fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      // color: "#1890ff"
    }
  },
  selected: {
    // color: "red"
    backgroundColor: theme.palette.primary[800]
  }
}))(props => <Tab {...props} />);

const AppSidebar = ({ items, selectedIdx, onChange }) => {
  const classes = useStyles();

  return (
    <Tabs
      orientation="vertical"
      value={selectedIdx}
      onChange={onChange}
      aria-label="Vertical tabs example"
      classes={{
        root: classes.tabs,
        flexContainer: classes.tabsContainer,
        indicator: classes.tabsIndicator
      }}
    >
      {items.map(item => (
        <CustomTab
          key={item.id}
          icon={item.icon}
          label={!item.iconOnly && item.name}
          classes={item.endItem && { root: classes.btmStartTab }}
        />
      ))}
    </Tabs>
  );
};

export default AppSidebar;
