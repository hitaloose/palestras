import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  createTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { CssBaseline, AppBar, Box, IconButton, Toolbar } from "@mui/material";
import type { AppProps } from "next/app";
import MenuIcon from "@mui/icons-material/Menu";
import FaceIcon from "@mui/icons-material/Face";
import ArticleIcon from "@mui/icons-material/Article";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../lib/db";
import "./global.css";
import { Loading } from "../components/Loading";
import migration from "../lib/migration";
import { loadDatabases } from "../lib/db";

export default function (props: AppProps) {
  const { Component, pageProps } = props;

  const { push } = useRouter();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [runningMigrations, setRunningMigrations] = useState(true);

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpened(false);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  const handleOradorMenuClick = useCallback(() => {
    push("/orador");
    handleCloseDrawer();
  }, [push, handleCloseDrawer]);

  const handleDiscursoMenuClick = useCallback(() => {
    push("/discurso");
    handleCloseDrawer();
  }, [push, handleCloseDrawer]);

  const handlePalestraMenuClick = useCallback(() => {
    push("/palestra");
    handleCloseDrawer();
  }, [push, handleCloseDrawer]);

  const handleBackupMenuClick = useCallback(() => {
    push("/backup");
    handleCloseDrawer();
  }, [push, handleCloseDrawer]);

  const handleDidMount = useCallback(async () => {
    try {
      await loadDatabases();
      await migration();
    } catch (error) {
      console.log("erro ao rodar migrations", error);
    } finally {
      setRunningMigrations(false);
    }
  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  if (runningMigrations) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <ToastContainer />

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleOpenDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </AppBar>
        </Box>

        <Drawer open={drawerOpened} onClose={handleCloseDrawer}>
          <List sx={{ minWidth: "300px" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOradorMenuClick}>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="Oradores" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleDiscursoMenuClick}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Discursos" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handlePalestraMenuClick}>
                <ListItemIcon>
                  <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText primary="Palestras" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleBackupMenuClick}>
                <ListItemIcon>
                  <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText primary="Backup" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box sx={{ margin: 1, height: "calc(100% - 72px)" }}>
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}
