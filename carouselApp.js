'use strict';

import { s } from './style.module.css';

var CarouselApp = function CarouselApp() {

  return React.createElement(
    'div',
    { className: s.slider },
    '  ',
    React.createElement(
      'h1',
      null,
      '3333'
    ),
    ' '
  );
};

var domContainer = document.querySelector('#carousel');
ReactDOM.render(React.createElement(CarouselApp, null), domContainer);