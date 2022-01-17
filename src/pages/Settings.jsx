import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Input,
  Button,
} from '@chakra-ui/react';
import { MdLock } from 'react-icons/md';
import api from '../utils/api';

const Settings = ({ userData }) => {
  console.log(userData);
  const [firstName, setFirstName] = useState(userData.firstname);
  const [lastName, setLastName] = useState(userData.lastname);
  const [email, setEmail] = useState(userData.email);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const updatePassword = async e => {
    e.preventDefault();
    try {
      let response = await api.patch('/users/change_password', {
        password: newPassword,
      });
      setNewPassword(null);
    } catch (error) {
      console.log(error);
    }
  };

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
        minWidth="lg"
        minHeight="l"
        flexDirection="column"
        bg="white"
        p="4"
        rounded="xl"
        boxShadow="lg"
        mt="-32"
      >
        <Flex minWidth="l" minHeight="l" flexDirection="column">
          <form action="submit" onSubmit={updatePassword}>
            <Stack spacing="3">
              <FormControl>
                <FormLabel fontWeight="bold">Фамилия</FormLabel>
                <InputGroup>
                  <Input
                    isDisabled
                    value={firstName}
                    type="name"
                    placeholder="Фамилия"
                    aria-label="Фамилия"
                    bg="gray.50"
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Имя</FormLabel>
                <InputGroup>
                  <Input
                    isDisabled
                    value={lastName}
                    type="name"
                    placeholder="Имя"
                    aria-label="Имя"
                    bg="gray.50"
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Email</FormLabel>
                <InputGroup>
                  <Input
                    isDisabled
                    value={email}
                    type="email"
                    placeholder="email"
                    aria-label="email"
                    bg="gray.50"
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Старый пароль</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={MdLock} />} />
                  <Input
                    isDisabled
                    type="password"
                    placeholder="пароль"
                    aria-label="пароль"
                    bg="gray.50"
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Новый пароль</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={MdLock} />} />
                  <Input
                    // value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="пароль"
                    aria-label="пароль"
                    bg="gray.50"
                  ></Input>
                </InputGroup>
              </FormControl>
              <Button type="submit" boxShadow="sm" colorScheme="blue">
                Сохранить
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Settings;
