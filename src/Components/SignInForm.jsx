import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { login } from '../utils/Auth';

const SignInForm = ({ auth, setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.access_token);
      setAuth(true);
      console.log(response.data);
      history.push('/');
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex minWidth="l" minHeight="l" flexDirection="column">
      <form action="submit" onSubmit={handleLogin}>
        <Stack spacing="3">
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon as={MdEmail} />} />
              <Input
                type="email"
                placeholder="Email"
                aria-label="Email"
                bg="gray.50"
                value={email}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Input>
            </InputGroup>
          </FormControl>
          <Button type="submit" boxShadow="sm" colorScheme="blue">
            Sign in
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default SignInForm;
