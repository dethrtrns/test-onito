import { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Container,
  Flex,
  ScrollArea,
  Overlay,
  createStyles,
  Box,
  Tabs,
  Kbd,
} from "@mantine/core";
import Link from "next/link.js";
import {
  IconArrowsLeftRight,
  IconClick,
  IconUserSearch,
} from "@tabler/icons-react";
import FormPage from "@/components/FormPage";
import RegistrationForm from "@/components/RegistrationForm";
import BgMorph from "../components//BgMorph.jsx";
import Datatables from "@/components/Datatables.jsx";
import UserTable from "@/components/UserTable.jsx";

const inter = Inter({ subsets: ["latin"] });

const useStyles = createStyles((theme) => ({
  glassmorphism: {
    backgroundColor: "rgba( 255,255,255, 0.5)",
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.5)",
  },
  tabs: {
    backgroundColor: "rgba( 255,255,255, 0.5)",
    backdropFilter: "blur(10px)",

    webkitBackdropFilter: "blur(10px)",
    // borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.5)",
    borderBottom: "none",
    ":hover": {
      background: "none",
    },
  },
  logo: {
    backgroundColor: "rgba( 255,255,255, 0.2)",
    backdropFilter: "blur(2px)",

    webkitBackdropFilter: "blur(2px)",
    // borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.3)",
    zIndex: -1000,
  },
  overlay: {
    backgroundColor: "rgba( 255,255,255, 0.5)",
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.5)",
  },
}));

export default function Home() {
  const [userTable, setUserTable] = useState(true);
  const [activeTab, setActiveTab] = useState("elegant");
  const { classes, cx, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Head>
        <title>Onito Test-Task</title>
        <meta
          name='description'
          content='this is a test task for react developer position'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <Container
        fluid
        p={0}
        m={0}
        w={"100vw"}
        mih={"100vh"}
        sx={
          activeTab === "elegant" && {
            background:
              "url(https://www.onito.io/assets/img/brochure/doctors-group.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }
        }>
        {activeTab === "elegant" && (
          <BgMorph
            bgColor={"none"}
            primaryColor1={"rgba(190,76,70,0.7)"}
            primaryColor2={"rgba(221,145,32,0.7)"}
            secondaryColor1={"rgba(249,190,11,0.7)"}
            secondaryColor2={"rgba(179,105,156,0.7)"}
            //Onito Color Palette->
            //c1='rgb(190,76,70)' or '#be4c46'
            //c2='rgb(249,190,11)' or '#f9be0b'
            //c3='rgb(221,145,32)' or '#dd9120'
            //c4='rgb(179,105,156)' or '#b3699c'
          />
        )}

        <Overlay opacity={0.1}>
          <Box
            w={"100vw"}
            className={classes.logo}>
            <img src='https://www.onito.io/assets/img/onito-onlyname-logo-removebg.png' />
          </Box>
          <Tabs
            variant='outline'
            inverted
            color='grape'
            loop
            radius={0}
            value={activeTab}
            onTabChange={setActiveTab}>
            <Tabs.List
              sx={{
                borderBottom: "0px",
                background:
                  activeTab === "required" ? "rgba(0,0,0,0.6)" : "none",
              }}
              position='apart'
              grow>
              <Tabs.Tab
                c={activeTab === "required" ? "black" : "white"}
                fw={600}
                fz={20}
                sx={{
                  flex: 1,
                  flexGrow: 2,
                  borderBottom: "0px",
                  ":hover": {
                    color: "rgba(190,76,70,0.7)",
                  },
                }}
                icon={<IconArrowsLeftRight />}
                className={activeTab === "required" ? classes.logo : ""}
                value='required'>
                <Kbd
                  // w={50}
                  mr={"xs"}
                  opacity={0.7}
                  size='xl'>
                  {"<-"}
                </Kbd>
                Required for the Test-task
              </Tabs.Tab>
              <Tabs.Tab
                c={"white"}
                fw={600}
                fz={20}
                bg={activeTab === "required" ? "rgba(190,76,70,0.5)" : ""}
                sx={{
                  borderBottom: "0px",
                  ":hover": {
                    color: "violet",
                    backgroundColor: "rgba(190,76,70,0.8)",
                  },
                }}
                rightSection={<IconArrowsLeftRight />}
                className={activeTab === "elegant" ? classes.logo : ""}
                value='elegant'>
                More Elegant Approach
                <Kbd
                  ml={"xs"}
                  opacity={0.7}
                  size='xl'>
                  {"->"}
                </Kbd>
              </Tabs.Tab>
            </Tabs.List>

            {/* <Tabs.Panel value='required'>First panel</Tabs.Panel>
            <Tabs.Panel value='elegant'>Second panel</Tabs.Panel> */}
          </Tabs>
          <Flex
            py={"10vh"}
            justify={"center"}
            align={"center"}></Flex>
          <Modal
            classNames={{
              content: classes.overlay,
              // overlay: classes.overlay,
              // body: classes.overlay,
              // header: classes.overlay,
              // inner: classes.overlay,
            }}
            size={"100vw"}
            yOffset='2vh'
            xOffset='4vw'
            overlayProps={{
              opacity: 0,
              blur: 0,
            }}
            withCloseButton={false}
            transitionProps={{ transition: "fade", duration: 800 }}
            opened={opened}
            onClose={close}
            scrollAreaComponent={ScrollArea.Autosize}>
            {userTable && <UserTable onClose={close} />}
            {!userTable &&
              (activeTab === "required" ? (
                <FormPage onClose={close} />
              ) : (
                <RegistrationForm onClose={close} />
              ))}
          </Modal>

          <Flex
            direction={"column"}
            w={"100vw"}
            h={"40%"}
            justify={"space-between"}
            align={"center"}>
            {activeTab === "required" && (
              <h2>Built Using react-form-hook and DataTables library</h2>
            )}
            <Button
              // compact
              className={activeTab === "elegant" && classes.glassmorphism}
              rightIcon={activeTab === "elegant" && <IconClick />}
              size='xl'
              color='dark'
              radius={0}
              variant='outline'
              onClick={() => {
                setUserTable(false);
                open();
              }}>
              REGISTER NOW
            </Button>
            <Button
              component={activeTab === "required" && Link}
              href={"/datatables"}
              target='_blank'
              className={activeTab === "elegant" && classes.glassmorphism}
              rightIcon={activeTab === "elegant" && <IconUserSearch />}
              size='xl'
              color='dark'
              radius={0}
              onClick={() => {
                if (activeTab === "elegant") {
                  setUserTable(true);
                  open();
                }
              }}
              variant='outline'>
              View Our Users
            </Button>
          </Flex>
        </Overlay>
      </Container>
    </>
  );
}
