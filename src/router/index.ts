import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Editor from '../pages/editor';

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Home),
    errorElement: React.createElement(
      'div',
      null,
      'An error occurred on the home page'
    ),
  },
  {
    path: '/editor',
    element: React.createElement(Editor),
    errorElement: React.createElement(
      'div',
      null,
      'An error occurred in the editor'
    ),
  },
  {
    path: '/about',
    element: React.createElement(About),
    errorElement: React.createElement(
      'div',
      null,
      'An error occurred on the about page'
    ),
  },
]);

export default router;
