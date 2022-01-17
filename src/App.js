import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, Flex, Text } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import { checkAuth } from './utils/Auth';
import axios from 'axios';
import api from './utils/api';

function App() {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setIsFetching(true);
      try {
        let response = await checkAuth();
        let user = response.data.user;
        setUserData(user);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsFetching(false);
      }
    };
    localStorage.getItem('token') && getUser();
    // !localStorage.getItem('token') && setIsFetching(false);
  }, []);

  const theme = extendTheme({
    components: {
      Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
    },
  });

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex h="100vh" flexDir="row" maxW="2000" mx="auto">
          <Sidebar />
          {isError && <Text>{isError.message}</Text>}
          {!isFetching && userData && (
            <Content
              userData={userData}
              setUserData={setUserData}
              auth={auth}
              setAuth={setAuth}
            />
          )}
        </Flex>
      </ChakraProvider>
    </Router>
  );
}

export default App;
