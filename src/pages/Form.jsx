import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import React from 'react';
import SignUpForm from '../Components/SignUpForm';
import SignInForm from '../Components/SignInForm';

const Form = ({ auth, setAuth }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      bgColor="gray.50"
      borderRadius="xl"
      px="5"
      boxShadow="sm"
      minHeight="88vh"
    >
      <Flex
        boxShadow="sm"
        rounded="lg"
        minWidth="lg"
        minHeight="l"
        flexDirection="column"
        bg="white"
        p="4"
        rounded="xl"
        boxShadow="lg"
        mt="-32"
      >
        <Tabs isFitted m="4">
          <TabList>
            <Tab _focus={{ boxShadow: 'none' }}>Sign in</Tab>
            <Tab _focus={{ boxShadow: 'none' }}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignInForm auth={auth} setAuth={setAuth} />
            </TabPanel>
            <TabPanel>
              <SignUpForm auth={auth} setAuth={setAuth} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default Form;
