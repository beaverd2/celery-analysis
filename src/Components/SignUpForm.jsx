import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Input,
  Button,
  Divider,
  Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdEmail, MdLock, MdInfo } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { register } from '../utils/Auth';

const SignUpForm = ({ auth, setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const response = await register(email, password, firstName, lastName);
      history.push('/form');
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex minWidth="l" minHeight="l" flexDirection="column">
      <form action="submit" onSubmit={handleRegister}>
        <Stack spacing="3">
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon as={MdInfo} />} />
              <Input
                type="name"
                placeholder="First name"
                aria-label="First name"
                bg="gray.50"
                onChange={e => setFirstName(e.target.value)}
              ></Input>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon as={MdInfo} />} />
              <Input
                type="name"
                placeholder="Last name"
                aria-label="Last name"
                bg="gray.50"
                onChange={e => setLastName(e.target.value)}
              ></Input>
            </InputGroup>
          </FormControl>
          <Divider borderColor="gray.100" />
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon as={MdEmail} />} />
              <Input
                type="email"
                placeholder="Email"
                aria-label="Email"
                bg="gray.50"
                onChange={e => setEmail(e.target.value)}
              ></Input>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon as={MdLock} />} />
              <Input
                type="password"
                placeholder="Password"
                aria-label="Password"
                bg="gray.50"
                onChange={e => setPassword(e.target.value)}
              ></Input>
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" type="submit" boxShadow="sm">
            Sign up
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default SignUpForm;
