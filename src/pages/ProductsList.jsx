import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Image,
  Container,
  useBreakpointValue,
  Icon,
  Tooltip,
  Tag,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import ozon from '../img/ozon.png';
import wb from '../img/wb.png';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import api from '../utils/api';
dayjs.locale('ru');
dayjs.extend(utc);

const ProductsList = () => {
  const history = useHistory();

  function handleClick(id) {
    history.push(`/product/${id}`);
    window.scrollTo(0, 0);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const [tag, setTag] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [activeShop, setActiveShop] = useState('all');
  const [force, forceUpdate] = useState(true);
  const [isError, setIsError] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/products', { tag, url: url, is_active: true });
      setTag('');
      setUrl('');
      setActiveShop('all');
      forceUpdate(!force);
      onClose();
    } catch (error) {
      setIsError(isError);
    }
  };

  const handleFilter = shopId => {
    if (shopId) {
      setProducts(data.filter(product => product.shop_id === shopId));
      setActiveShop(shopId);
    } else {
      setProducts(data);
      setActiveShop('all');
    }
  };

  const handleSearch = name => {
    setProducts(
      products.filter(product =>
        product.name !== null
          ? product.name.toLowerCase().includes(name.toLowerCase())
          : null
      )
    );
    if (!name) {
      setProducts(data.filter(product => product.shop_id === activeShop));
      if (activeShop === 'all') {
        setProducts(data);
      }
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await api.get('/products');
        let products = response.data.products;
        if (products) {
          console.log(products);
          setData(products);
          setProducts(products);
          setActiveShop('all');
        }
      } catch (error) {
        setIsError(error);
      }
    };
    localStorage.getItem('token') && getProducts();
  }, [force]);
  console.log(activeShop);

  const tableSize = useBreakpointValue({ md: 'sm', lg: 'md' });
  return (
    <Flex
      flexDir="column"
      bgColor="gray.50"
      borderRadius="xl"
      px="5"
      boxShadow="sm"
    >
      <Container maxWidth="container.xl" minHeight="89vh">
        <Flex flexDir="column">
          <Heading as="h2" size="2xl" pt="5" mb="5">
            ?????????????????????????? ????????????
          </Heading>
          {isError && <Text>{isError.message}</Text>}
          {data && (
            <Flex py="4" flexDirection="row" justifyContent="flex-start">
              <Flex
                onClick={() => handleFilter()}
                minWidth="15vw"
                bg="white"
                rounded="xl"
                boxShadow="md"
                p="2"
                flexDirection="row"
                alignItems="center"
                bgColor={activeShop === 'all' ? 'gray.200' : 'white'}
                mr="5"
                cursor="pointer"
                _hover={{
                  background: 'gray.200',
                }}
              >
                <Icon
                  as={FaBoxOpen}
                  boxSize="70px"
                  bg="white"
                  p="2"
                  rounded="full"
                />
                <Flex flexDir="column">
                  <Text mx="5" fontSize="4xl" fontWeight="bold">
                    {data.length}
                  </Text>
                  <Text color="gray" fontWeight="semibold">
                    ?????????????? ??????????
                  </Text>
                </Flex>
              </Flex>
              <Flex
                onClick={() => handleFilter(2)}
                minWidth="15vw"
                rounded="xl"
                boxShadow="md"
                p="2"
                flexDirection="row"
                alignItems="center"
                bgColor={activeShop === 2 ? 'pink.200' : 'white'}
                mr="5"
                cursor="pointer"
                _hover={{
                  background: 'pink.200',
                }}
              >
                <Image
                  src={wb}
                  boxSize="70px"
                  bg="white"
                  p="2"
                  rounded="full"
                />
                <Flex flexDir="column">
                  <Text mx="5" fontSize="4xl" fontWeight="bold">
                    {data.filter(product => product.shop_id === 2).length}
                  </Text>
                  <Text color="gray" fontWeight="semibold">
                    ???????????? wildberries
                  </Text>
                </Flex>
              </Flex>
              <Flex
                onClick={() => handleFilter(1)}
                minWidth="15vw"
                bg="white"
                rounded="xl"
                boxShadow="md"
                p="2"
                flexDirection="row"
                alignItems="center"
                mr="5"
                cursor="pointer"
                bgColor={activeShop === 1 ? 'blue.200' : 'white'}
                _hover={{
                  background: 'blue.200',
                }}
              >
                <Image
                  src={ozon}
                  boxSize="70px"
                  bg="white"
                  p="2"
                  rounded="full"
                />
                <Flex flexDir="column">
                  <Text mx="5" fontSize="4xl" fontWeight="bold">
                    {data.filter(product => product.shop_id === 1).length}
                  </Text>
                  <Text color="gray" fontWeight="semibold">
                    ???????????? ozon
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex py="6" justifyContent="space-between">
          <InputGroup maxWidth="sm">
            <Input
              type="text"
              placeholder="?????????? ??????????????"
              onChange={e => handleSearch(e.target.value)}
              bgColor="white"
            />
            <InputRightElement
              pointerEvents="none"
              children={<FiSearch color="gray.400" />}
            />
          </InputGroup>
          <Button variant="solid" onClick={onOpen} colorScheme="blue">
            ??????????????????????
          </Button>
        </Flex>
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>?????????????????????? ?????????? ??????????</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <form action="submit" onSubmit={submit}>
                <FormControl>
                  <FormLabel>??????</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="??????"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>url</FormLabel>
                  <Flex>
                    <Input
                      placeholder="url"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                    />
                  </Flex>
                </FormControl>
                <Flex mt="8" justifyContent="flex-end">
                  <Button colorScheme="blue" mr={3} type="submit">
                    ??????????????????????
                  </Button>
                  <Button onClick={onClose}>????????????</Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Flex bg="white" rounded="xl" boxShadow="md" mb="4" overflowY="auto">
          <Table size={tableSize} variant="simple">
            <Thead>
              <Tr>
                <Th>????????????????</Th>
                <Th>??????????????????????</Th>
                <Th>????????</Th>
                <Th>??????????????</Th>
                <Th>????????????</Th>
                <Th>?????????????????? ????????????????????</Th>
                <Th>???????? ????????????????????</Th>
                <Th>??????</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products &&
                products.map(data => {
                  return (
                    <Tr
                      key={data.id}
                      _hover={{
                        background: 'gray.100',
                        cursor: 'pointer',
                      }}
                      color={data.name ? null : 'gray'}
                      onClick={data.name ? () => handleClick(data.id) : null}
                    >
                      <Td>
                        <Tooltip label={data.name ? data.name : null}>
                          <Text maxW="48" isTruncated>
                            {data.name ? data.name : '??????'}
                          </Text>
                        </Tooltip>
                      </Td>
                      <Td>{data.shop_id === 1 ? 'OZON' : 'Wildberries'}</Td>
                      <Td>{data.price ? data.price + '???' : '??????'}</Td>
                      <Td>{data.rating ? data.rating : '??????'}</Td>
                      <Td>
                        <Tag
                          variant="outline"
                          colorScheme={data.availability ? 'gray' : 'red'}
                        >
                          <Text whiteSpace="nowrap">
                            {data.availability ? '?? ??????????????' : '??????????????????????'}
                          </Text>
                        </Tag>
                      </Td>
                      <Td>
                        <Text>
                          {dayjs(data.updated_at)
                            .utcOffset(6)
                            .format('D MMM H:mm')}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {dayjs(data.created_at)
                            .utcOffset(6)
                            .format('D MMM H:mm')}
                        </Text>
                      </Td>
                      <Td>{data.tag ? data.tag : '??????'}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Flex>
      </Container>
    </Flex>
  );
};

export default ProductsList;
