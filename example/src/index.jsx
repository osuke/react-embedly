import React from 'react';
import ReactDOM from 'react-dom';
import Embedly from '../../lib/index.js';
ReactDOM.render(
  <Embedly url="https://facebook.github.io/react/" apiKey="ff6dc30026d7471787fd22c4bc23eef6" />,
  document.getElementById('content')
);
