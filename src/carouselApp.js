'use strict';
import {s} from './style.module.css';

const CarouselApp = () => {

  return (
    <div className={s.slider}>  <h1>3333</h1> </div>
    
  )
}

let domContainer = document.querySelector('#carousel');
ReactDOM.render(<CarouselApp />, domContainer);