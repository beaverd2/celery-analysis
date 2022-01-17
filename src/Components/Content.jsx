import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductsList from '../pages/ProductsList';
import Product from '../pages/Product';
import Form from '../pages/Form';
import PageNotFound from '../pages/PageNotFound';
import Settings from '../pages/Settings';

const Content = ({ userData, setUserData, auth, setAuth }) => {
  console.log(userData);
  return (
    <Flex w="100%" flexDir="column">
      <Header userData={userData} setUserData={setUserData} />
      <Switch>
        <Route exact path="/">
          {userData.firstname ? (
            <ProductsList userData={userData} />
          ) : (
            <Form auth={auth} setAuth={setAuth} />
          )}
        </Route>
        <Route path="/product/:productId">
          {userData.firstname ? (
            <Product />
          ) : (
            <Form auth={auth} setAuth={setAuth} />
          )}
        </Route>
        <Route path="/settings">
          {userData.firstname ? (
            <Settings userData={userData} />
          ) : (
            <Form auth={auth} setAuth={setAuth} />
          )}
        </Route>
        <Route exact path="/form">
          {userData.firstname ? (
            <Redirect to="/" />
          ) : (
            <Form auth={auth} setAuth={setAuth} />
          )}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Flex>
  );
};

export default Content;
