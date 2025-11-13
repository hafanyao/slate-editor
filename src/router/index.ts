import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Editor from '../pages/editor';
import Demo from '../pages/demo/richtext';

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
    path: '/demo',
    element: React.createElement(Demo),
    errorElement: React.createElement(
      'div',
      null,
      'An error occurred on the about page'
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
