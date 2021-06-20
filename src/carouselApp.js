'use strict';
// import ReactDOM from 'react-dom'


const pics = [
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/0.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/1.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/2.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/3.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/4.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/5.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/6.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/7.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/8.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/9.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/10.png?raw=true',
  'https://github.com/leeshko/react-game/blob/react-game/src/images/cards/11.png?raw=true'
];

class CarouselApp extends React.Component {

  constructor(props) {
    super(props);
    this.imgNode = React.createRef();
    this.pressLeft = this.pressLeft.bind(this);
    this.pressRight = this.pressRight.bind(this);
    this.startPosition = 0;
    this.state = {
      scrollLeft: true,
      scrollright: false
    };
  }


  pressLeft() {
    if (this.startPosition >= pics.length * 300) {
      console.log(pics.length * 300, this.startPosition)
      this.startPosition -= 300;
      const nodes = this.imgNode.current.childNodes;
      nodes.forEach(element => {
        element.style = `transform: translateX(${this.startPosition}px)`;
      });
    }
    return;
  }

  pressRight() {
    if (this.startPosition !== 0) {

      this.startPosition += 300;
      const nodes = this.imgNode.current.childNodes;
      nodes.forEach(element => {
        element.style = `transform: translateX(${this.startPosition}px)`;
      });
    }
    return;
  }


  render() {
    return (
      <div className='slider' >

        <div className='items' ref={this.imgNode}>
          {pics.map((element, index) => {
            return (
              <div className='singlePic' key={index} >

                <img src={element} alt="" />
              </div>
            )
          })}

        </div>
        <button className='btn prev'
          onClick={this.pressLeft}>
          left
        </button>

        <button className='btn next'
          onClick={this.pressRight}>
          right
        </button>
      </div>

    )
  }
}
let domContainer = document.querySelector('#carousel');
ReactDOM.render(<CarouselApp />, domContainer);