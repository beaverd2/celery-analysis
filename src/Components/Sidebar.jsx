import { Button, Flex, Heading, Icon, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiSearchLine,
  RiHeartFill,
  RiHeartLine,
  RiSettings3Line,
  RiSettings3Fill,
} from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Flex mr="20" flexDir="column" h="100%" pl="5">
      <Flex pos="fixed" flexDir="column" pt="7" alignItems="center">
        <Heading size="lg" mb="10">
          <Link to="/">CA</Link>
        </Heading>

        <Link to="/">
          <Tooltip hasArrow label="Поиск" placement="right">
            <Button variant="ghost" py="8" mb="4">
              <Icon as={RiSearchLine} w="7" h="7" color="gray" />
            </Button>
          </Tooltip>
        </Link>
        <Link to="/">
          <Tooltip hasArrow label="Товары" placement="right">
            <Button variant="ghost" py="8" mb="4">
              <Icon
                as={location.pathname === '/' ? RiHeartFill : RiHeartLine}
                w="7"
                h="7"
                color={location.pathname === '/' ? 'black' : 'gray'}
              />
            </Button>
          </Tooltip>
        </Link>
        <Link to="/settings">
          <Tooltip hasArrow label="Настройки" placement="right">
            <Button variant="ghost" py="10">
              <Icon
                as={
                  location.pathname === '/settings'
                    ? RiSettings3Fill
                    : RiSettings3Line
                }
                w="7"
                h="7"
                color={location.pathname === '/settings' ? 'black' : 'gray'}
              />
            </Button>
          </Tooltip>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
