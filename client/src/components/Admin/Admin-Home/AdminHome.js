import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  HomeTwoTone,
  AssignmentTwoTone,
  FeedbackTwoTone,
  PeopleTwoTone,
  BookTwoTone,
} from "@material-ui/icons";
import {
  Button,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import "./Admin.scss";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const AdminHome = () => {
  document.title = "Admin";
  const classes = useStyles();
  const history = useHistory();

  // Nav Menu Items
  const navItems = [
    {
      text: "Home",
      icon: <HomeTwoTone />,
      onClick: () => history.push("/admin"),
    },
    {
      text: "Users",
      icon: <PeopleTwoTone />,
      onClick: () => history.push("/admin/users"),
    },
    {
      text: "Surveys",
      icon: <AssignmentTwoTone />,
      onClick: () => history.push("/admin/surveys"),
    },
    {
      text: "Complaints",
      icon: <BookTwoTone />,
      onClick: () => history.push("/admin/complaints"),
    },
    {
      text: "Feedbacks",
      icon: <FeedbackTwoTone />,
      onClick: () => history.push("/admin/feedbacks"),
    },
  ];

  const handleLogout = () => {
    Cookie.remove("accessToken");
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" id="app-bar" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Admin Panel
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        id="drawer"
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {navItems.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <div key={index}>
                <ListItem button onClick={onClick} id="list-item">
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Drawer>
      <div className={classes.content}></div>
    </div>
  );
};
export default AdminHome;
