import { ChakraProvider, theme } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chat from "../pages/pages/Chat";
import Login from "./components/Login";

export default function App() {
  const [isReady, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  //This method is used to change to true when Login information is ready
  const handleLoginValue = (value) => {
    setReady(value);
  };

  //This method is used to get all the information from Login
  const getLoginInformation = (infoObject)=> {

    console.log("Info Object")
    console.log(infoObject)

    setUserInfo(infoObject)

  }

  return (

      <ChakraProvider theme={theme}>
        {/*{isReady ? <Chat userInfo={userInfo}/> : <Login onValueChange={handleLoginValue} getLoginInformation={getLoginInformation}/>}*/}
      </ChakraProvider>

  );
}
