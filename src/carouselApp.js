'use strict';

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

let startPosition = 0;
let swipeStartPoint = null;
let swipeEndPoint = null;

class CarouselApp extends React.Component {
  imgNode = React.createRef();
  miniPic = React.createRef();
  sliderWidth = 400;
  state = {
    activeIndex: 0
  }

  pressLeft = () => {
    if (startPosition * -1 <= (pics.length - 2) * this.sliderWidth) {
      startPosition -= this.sliderWidth;
      this.moveAllPics(startPosition);
    }
    this.highlightMiniPic();
  }

  pressRight = () => {
    if (startPosition !== 0) {
      startPosition += this.sliderWidth;
      this.moveAllPics(startPosition);
    }
    this.highlightMiniPic();
  }

  moveAllPics = (position) => {
    const nodes = this.imgNode.current.childNodes;
    nodes.forEach(element => {
      element.style = `transform: translateX(${position}px)`;
    });
  }

  highlightMiniPic = () => {
    let index = startPosition / (this.sliderWidth * -1);
    this.setState({ activeIndex: index });
  }

  selectMiniPics = (e) => {
    startPosition = -this.sliderWidth * (pics.indexOf(e.target.currentSrc));
    this.moveAllPics(startPosition);
    this.setState({ activeIndex: pics.indexOf(e.target.src) });
  }

  addFirstTouchCoord = (event) => {
    swipeStartPoint = event.touches[0].clientX;
  }

  addLastTouchCoord = (event) => {
    swipeEndPoint = event.changedTouches[0].clientX;
    this.swipe();
  }

  swipe = () => {
    if (swipeStartPoint + 50 < swipeEndPoint) {
      this.pressRight();
    }
    if (swipeStartPoint - 50 > swipeEndPoint) {
      this.pressLeft();
    }
  }

  render() {
    return (
      <div className='slider'
        onTouchStart={(e) => this.addFirstTouchCoord(e)}
        onTouchEnd={(e) => this.addLastTouchCoord(e)}
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
            this.selectMiniPics(e);
          }}
        >
          {pics.map((e, index) => {
            return (
              <img key={index} className={this.state.activeIndex !== index ? 'miniPic' : 'miniPic active'} src={e}></img>
            )
          })}
        </div>
      </div>
    )
  }
}

let domContainer = document.querySelector('#carousel');
ReactDOM.render(<CarouselApp />, domContainer);