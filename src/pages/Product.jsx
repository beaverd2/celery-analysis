import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Container,
  Button,
  Heading,
  Avatar,
  Icon,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  RiHeartLine,
  RiHeartFill,
  RiChat1Line,
  RiStarLine,
  RiStarFill,
  RiExternalLinkLine,
  RiAddLine,
  RiSubtractLine,
} from 'react-icons/ri';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import api from '../utils/api';
import utc from 'dayjs/plugin/utc';
dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

const Product = props => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [product, setProduct] = useState({});
  const [productStats, setProductStats] = useState([]);
  const [productReviews, setProductReviews] = useState({});
  const [productSummary, setProductSummary] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const { productId } = useParams();

  const history = useHistory();

  const fetchData = async () => {
    setIsError(false);
    setIsFetching(true);
    let now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let weekAgo = dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss');

    const productApi = `/products/${productId}`;
    const productStatsApi = `/statistics?product=${productId}`;
    const productSummaryApi = `/summary?product=${productId}&from=${weekAgo}&to=${now}`;
    const productReviewsApi = `/reviews?product=${productId}&page=1&limit=3`;
    try {
      const product = await api.get(productApi);
      const productStats = await api.get(productStatsApi);
      const productSummary = await api.get(productSummaryApi);
      const productReviews = await api.get(productReviewsApi);
      setProduct(product.data.product);
      setProductStats(productStats.data.statistics);
      setProductSummary(productSummary.data.summary);
      setProductReviews(productReviews.data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    localStorage.getItem('token') && fetchData();
  }, [productId]);

  const getMoreProductReviews = async () => {
    const response = await api.get(
      `/reviews?product=${productId}&page=${productReviews.page + 1}&limit=3`
    );
    let productData = response.data;
    setProductReviews({
      page: productReviews.page + 1,
      limit: 3,
      count: productReviews.count,
      reviews: [...productReviews.reviews, ...productData.reviews],
    });
  };

  console.log(product);
  console.log(productReviews);
  console.log(productStats);
  console.log(productSummary);
  return (
    <Box bgColor="gray.50" borderRadius="xl" px="10" boxShadow="sm">
      {isError && <Text>{isError.message}</Text>}
      {/* {isFetching && <Text>loading</Text>} */}
      {!isFetching && !isError && (
        <Container maxWidth="container.xl">
          <Flex flexDir="column" alignItems="center">
            <Flex
              my="4"
              bg="white"
              flexDirection="column"
              p="4"
              rounded="xl"
              boxShadow="md"
              width="100%"
            >
              <Flex justifyContent="space-between">
                <Heading size="lg" mb="4">
                  {product.name}
                </Heading>
                <Text ml="2">
                  <Text as="span" fontWeight="semibold" pr="2">
                    Артикул:
                  </Text>
                  {product.article}
                </Text>
              </Flex>
              <Flex flexDir="column">
                <Flex flexDir="row" alignItems="center" mb="2">
                  <Button
                    mr="4"
                    leftIcon={<Icon as={RiHeartFill} w="6" h="6" />}
                    variant="ghost"
                    px="1"
                  >
                    <Text>Отслеживать</Text>
                  </Button>

                  <Flex alignItems="center" mr="4">
                    <Icon mr="1" as={RiChat1Line} w="6" h="6" />
                    <Text>{product.review_count && product.review_count}</Text>
                  </Flex>
                  <Flex alignItems="center" mr="4">
                    <Icon mr="1" as={RiStarLine} w="6" h="6" />
                    <Text>{product.rating && product.rating}</Text>
                  </Flex>
                  <Button
                    mr="4"
                    leftIcon={<Icon as={RiExternalLinkLine} w="6" h="6" />}
                    variant="ghost"
                    px="1"
                    as="a"
                    href={product.url}
                    target="_blank"
                  >
                    <Text>Перейти</Text>
                  </Button>
                </Flex>
                <Text mb="4" mr="4">
                  <Text as="span" fontWeight="semibold" pr="2">
                    Маркетплейс:
                  </Text>
                  {product.shop_id === 2 ? 'Wildberries' : 'OZON'}
                </Text>
                <Text mb="4">
                  <Text as="span" fontWeight="semibold" pr="2">
                    Отслеживается от:
                  </Text>
                  {dayjs(product.created_at).utcOffset(6).format('D MMMM YYYY')}
                </Text>
              </Flex>
              <Flex flexDir="column" alignItems="center">
                <Text
                  lineHeight="tall"
                  noOfLines={isTruncated ? '2' : '0'}
                  alignSelf="flex-start"
                >
                  <Text as="span" fontWeight="semibold" pr="2">
                    Описание:
                  </Text>
                  {product.description && product.description}
                </Text>
                <Text
                  alignSelf="flex-start"
                  display={isTruncated ? '' : 'none'}
                  onClick={() => setIsTruncated(!isTruncated)}
                  color="gray.500"
                  cursor="pointer"
                  _hover={{
                    color: 'black',
                  }}
                >
                  Развернуть описание...
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text mt="3" fontWeight="bold" fontSize="2xl">
                  <Text as="span" fontWeight="semibold" pr="2" fontSize="md">
                    Стоимость:
                  </Text>
                  {product.price &&
                    product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '₽'}
                </Text>
                <Text mt="3" fontSize="1xl">
                  <Text as="span" fontWeight="semibold" pr="2" fontSize="md">
                    Продавец:
                  </Text>
                  {product.vendor && product.vendor}
                </Text>
              </Flex>
            </Flex>

            <Flex
              my="4"
              bg="white"
              flexDirection="column"
              alignSelf="center"
              p="4"
              rounded="xl"
              boxShadow="md"
              maxHeight="lg"
              width="100%"
            >
              <Flex justifyContent="space-between">
                <Heading fontSize="3xl" mb="2">
                  Сводка по товару
                </Heading>
                <Select maxW="28" variant="filled">
                  <option value="option1">Неделя</option>
                  <option value="option2">Месяц</option>
                </Select>
              </Flex>

              <Flex py="4" flexDir="row">
                <Flex
                  flex="1 1"
                  flexDir="column"
                  bg="gray.100"
                  rounded="xl"
                  p="4"
                  boxShadow="md"
                  mr="4"
                >
                  <Text alignSelf="flex-start" color="gray" mb="3">
                    Стоимость
                  </Text>
                  <Flex alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={['2xl', '2xl', '2xl', '4xl']}
                      mr="4"
                    >
                      {product.price &&
                        product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '₽'}
                    </Text>
                    {product.price && (
                      <Flex
                        alignItems="center"
                        bg={
                          productSummary.price_difference >= 0
                            ? 'green.100'
                            : 'red.100'
                        }
                        px="3"
                        py="1"
                        rounded="lg"
                      >
                        <Icon
                          as={
                            productSummary.price_difference >= 0
                              ? RiAddLine
                              : RiSubtractLine
                          }
                          color={
                            productSummary.price_difference >= 0
                              ? 'green'
                              : 'red'
                          }
                        />
                        <Text
                          fontWeight="bold"
                          color={
                            productSummary.price_difference >= 0
                              ? 'green'
                              : 'red'
                          }
                        >
                          {productSummary.price_difference
                            ? Math.abs(productSummary.price_difference)
                            : '0'}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>

                <Flex
                  flex="1 1"
                  flexDir="column"
                  bg="gray.100"
                  rounded="xl"
                  p="4"
                  boxShadow="md"
                  mr="4"
                >
                  <Text alignSelf="flex-start" color="gray" mb="3">
                    Рейтинг
                  </Text>
                  <Flex alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={['2xl', '2xl', '2xl', '4xl']}
                      mr="4"
                    >
                      {product.rating && product.rating}
                    </Text>
                    <Flex
                      alignItems="center"
                      bg={
                        productSummary.rating_difference >= 0
                          ? 'green.100'
                          : 'red.100'
                      }
                      px="3"
                      py="1"
                      rounded="lg"
                    >
                      <Icon
                        as={
                          productSummary.rating_difference >= 0
                            ? RiAddLine
                            : RiSubtractLine
                        }
                        color={
                          productSummary.rating_difference >= 0
                            ? 'green'
                            : 'red'
                        }
                      />
                      <Text
                        fontWeight="bold"
                        color={
                          productSummary.rating_difference >= 0
                            ? 'green'
                            : 'red'
                        }
                      >
                        {productSummary.rating_difference
                          ? Math.abs(productSummary.rating_difference)
                          : '0'}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  flex="1 1"
                  flexDir="column"
                  bg="gray.100"
                  rounded="xl"
                  p="4"
                  boxShadow="md"
                  mr="4"
                >
                  <Text alignSelf="flex-start" color="gray" mb="3">
                    Комментарии
                  </Text>
                  <Flex alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={['2xl', '2xl', '2xl', '4xl']}
                      mr="4"
                    >
                      {productReviews.count && productReviews.count}
                    </Text>
                    <Flex
                      alignItems="center"
                      bg={
                        productSummary.review_count_difference >= 0
                          ? 'green.100'
                          : 'red.100'
                      }
                      px="3"
                      py="1"
                      rounded="lg"
                    >
                      <Icon
                        as={
                          productSummary.review_count_difference >= 0
                            ? RiAddLine
                            : RiSubtractLine
                        }
                        color={
                          productSummary.review_count_difference >= 0
                            ? 'green'
                            : 'red'
                        }
                      />
                      <Text
                        fontWeight="bold"
                        color={
                          productSummary.review_count_difference >= 0
                            ? 'green'
                            : 'red'
                        }
                      >
                        {productSummary.review_count_difference
                          ? Math.abs(productSummary.review_count_difference)
                          : '0'}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  flex="1 1"
                  flexDir="column"
                  bg="gray.100"
                  rounded="xl"
                  p="4"
                  boxShadow="md"
                  mr="4"
                >
                  <Text alignSelf="flex-start" color="gray" mb="3">
                    Был в наличии
                  </Text>
                  <Flex alignItems="center">
                    <Text
                      fontWeight="bold"
                      fontSize={['2xl', '2xl', '2xl', '4xl']}
                      mr="4"
                    >
                      {productSummary.availability_time > 120
                        ? dayjs
                            .duration(
                              productSummary.availability_time,
                              'seconds'
                            )
                            .locale('ru')
                            .humanize()
                        : ''}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              my="4"
              bg="white"
              flexDirection="column"
              alignSelf="center"
              p="4"
              rounded="xl"
              boxShadow="md"
              maxHeight="lg"
              width="100%"
            >
              <Heading fontSize="3xl" mb="2">
                Статистика товара
              </Heading>
              <Flex overflowY="auto" flexDir="column">
                <Table py="4" variant="striped">
                  <Thead position="sticky" top="0" bg="white">
                    <Tr>
                      <Th>Дата</Th>
                      <Th>Цена</Th>
                      <Th>Рейтинг</Th>
                      <Th>Комментарии</Th>
                      <Th>Наличие </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {productStats &&
                      productStats.map(stat => {
                        return (
                          <Tr key={stat.id}>
                            <Td>
                              {dayjs(stat.created_at)
                                .utcOffset(6)
                                .format('D MMM H:mm')}
                            </Td>
                            <Td>{stat.price ? stat.price + '₽' : ''}</Td>
                            <Td>{stat.rating}</Td>
                            <Td>{stat.review_count}</Td>
                            <Td>
                              {stat.availability ? 'В наличии' : 'Отсутствует'}
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
            <Flex
              maxWidth="container.xl"
              width="100%"
              my="4"
              bg="white"
              flexDirection="column"
              alignSelf="center"
              p="4"
              rounded="xl"
              boxShadow="md"
            >
              <Heading fontSize="3xl" mb="2">
                Отзывы
              </Heading>
              {productReviews.count > 0 &&
                productReviews.reviews.map(review => {
                  return (
                    <Flex key={review.id} flexDirection="column">
                      <Flex py="4">
                        <Flex flexDirection="column">
                          <Flex>
                            <Avatar mr="2" name={review.user} />
                            <Flex flexDirection="column">
                              <Flex>
                                <Text fontWeight="bold" fontSize="lg" mr="2">
                                  {review.user}
                                </Text>
                                <Text
                                  fontWeight="light"
                                  color="gray.400"
                                  fontSize="sm"
                                >
                                  {dayjs(review.created_at)
                                    .utcOffset(6)
                                    .format('D MMM H:mm')}
                                </Text>
                              </Flex>
                              <Flex>
                                {[...Array(5)]
                                  .fill(1, 0, review.mark)
                                  .map(star => {
                                    if (star === 1) {
                                      return (
                                        <Icon
                                          key={Math.random()}
                                          as={RiStarFill}
                                          w={6}
                                          h={6}
                                        />
                                      );
                                    } else {
                                      return (
                                        <Icon
                                          key={Math.random()}
                                          as={RiStarLine}
                                          w={6}
                                          h={6}
                                        />
                                      );
                                    }
                                  })}
                              </Flex>
                            </Flex>
                          </Flex>
                          {review.comment && (
                            <Flex py="1">
                              <Text>
                                <Text as="span" fontWeight="semibold" pr="2">
                                  Комментарий:
                                </Text>
                                {review.comment}
                              </Text>
                            </Flex>
                          )}
                        </Flex>
                      </Flex>
                      <Divider />
                    </Flex>
                  );
                })}
              {productReviews.reviews && (
                <Button
                  onClick={() => getMoreProductReviews()}
                  size="sm"
                  variant="outline"
                  rightIcon={<Icon as={FiChevronDown} />}
                  alignSelf="center"
                  mt="2"
                  display={
                    productReviews.reviews &&
                    productReviews.count > productReviews.reviews.length
                      ? 'block'
                      : 'none'
                  }
                >
                  Показать еще
                </Button>
              )}
            </Flex>
          </Flex>
        </Container>
      )}
    </Box>
  );
};

export default Product;
