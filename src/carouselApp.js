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
    this.miniPic = React.createRef();
    this.pressLeft = this.pressLeft.bind(this);
    this.pressRight = this.pressRight.bind(this);
    this.moveAllPics = this.moveAllPics.bind(this);
    this.moveMiniPics = this.moveMiniPics.bind(this);
    this.addLastTouchCoord = this.addLastTouchCoord.bind(this);
    this.swipe = this.swipe.bind(this);
    this.state = {
      startPosition: 0,
      swipeStartPoint: null,
      swipeEndPoint: null
    };
  }

  pressLeft() {
    if (this.state.startPosition * -1 <= (pics.length - 2) * 400) {
      this.setState({ startPosition: this.state.startPosition -= 400 });
      this.moveAllPics(this.state.startPosition);
    }
  }

  pressRight() {
    if (this.state.startPosition !== 0) {
      this.setState({ startPosition: this.state.startPosition += 400 });
      this.moveAllPics(this.state.startPosition);
    }
  }

  moveAllPics(position) {
    const nodes = this.imgNode.current.childNodes;
    nodes.forEach(element => {
      element.style = `transform: translateX(${position}px)`;
    });
  }

  moveMiniPics(e) {
    this.miniPic.current.childNodes.forEach(e => e.firstChild.className = 'miniPic');
    this.setState({ startPosition: -400 * (pics.indexOf(e.target.currentSrc)) });
    this.miniPic.current.childNodes[pics.indexOf(e.target.currentSrc)].firstChild.className = 'miniPic active';
  }

  componentDidUpdate() {
    this.moveAllPics(this.state.startPosition);
    this.swipe();
  }

  addFirstTouchCoord(event) {
    console.log(event.touches[0].clientX);
    this.setState({ swipeStartPoint: event.touches[0].clientX });
  }

  addLastTouchCoord(event) {
    this.setState({ swipeEndPoint: event.touches[0].clientX });
  }

  swipe() {
    console.log(this.state)
    if (this.state.swipeStartPoint + 50 < this.state.swipeEndPoint) {
      this.pressRight();
    }
    if (this.state.swipeStartPoint - 50 > this.state.swipeEndPoint) {
      this.pressLeft();
    }
  }

  render() {
    return (
      <div className='slider'
        onTouchStart={(e) => this.addFirstTouchCoord(e)}
        onTouchMove={(e) => this.addLastTouchCoord(e)}
      >
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
          onClick={this.pressRight}>
          left
        </button>

        <button className='btn next'
          onClick={this.pressLeft}>
          right
        </button>
        <div className='preview'
          ref={this.miniPic}
          onClick={(e) => {
            this.moveMiniPics(e);
          }}>
          {pics.map((e, index) => {
            return (
              <div key={index}>
                <img className='miniPic' src={e}></img>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


let domContainer = document.querySelector('#carousel');
ReactDOM.render(<CarouselApp />, domContainer);