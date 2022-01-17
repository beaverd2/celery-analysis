import React from 'react';
import {
  Flex,
  Text,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const Header = ({ userData, setUserData }) => {
  let history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/form');
    setUserData({});
  };

  const handleSettings = () => {
    history.push('/settings');
  };

  console.log(userData);
  return (
    <Flex py="5" alignItems="center" justifyContent="flex-end" px="5">
      {userData.firstname ? (
        <Menu>
          <MenuButton
            as={Flex}
            p="2"
            cursor="pointer"
            _hover={{
              background: 'gray.100',
              rounded: 'lg',
            }}
          >
            <Flex alignItems="center">
              <Avatar
                name={userData.firstname + ' ' + userData.lastname}
                mr="1"
              />
              <Text mx="1" fontWeight="medium">
                {userData.firstname ? userData.firstname : 'no profile'}
              </Text>
              <Text fontWeight="medium">{userData.lastname}</Text>
              <Icon as={FiChevronDown} w={6} h={6} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSettings}>Настройки</MenuItem>
            <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button colorScheme="blue" m="4" onClick={() => history.push('/form')}>
          Войти
        </Button>
      )}
    </Flex>
  );
};

export default Header;
