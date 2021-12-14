import React from "react";
import * as styles from "./MemoryGame.module.css";
class MemoryGame extends React.Component {
  state = {
    time: 0,
    moves: 0,
    id: null,
    messageGameOver: "",
    gameOverHandler: 4,
    results: "",
    turns: "",
    cardImages: [
      {
        src: "https://i.pinimg.com/474x/53/db/fd/53dbfd304766b5858ee6e139646713c7.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        id: 1,
        matched: false,
      },
      {
        src: "https://i.pinimg.com/474x/9e/c4/55/9ec45567fb8144fc46ee1e6cca21977e.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        id: 2,
        matched: false,
      },
      {
        src: "https://i.pinimg.com/474x/53/db/fd/53dbfd304766b5858ee6e139646713c7.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        matched: false,
        id: 3,
      },
      {
        src: "https://i.pinimg.com/474x/f2/ce/34/f2ce34402f8bdbf21311e6828ca00945.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        matched: false,
        id: 4,
      },
      {
        src: "https://i.pinimg.com/474x/9e/c4/55/9ec45567fb8144fc46ee1e6cca21977e.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        matched: false,
        id: 5,
      },
      {
        src: "https://i.pinimg.com/474x/f2/ce/34/f2ce34402f8bdbf21311e6828ca00945.jpg",
        backImg:
          "https://i.pinimg.com/474x/67/92/8c/67928ca40b14349940148aee8e7be660.jpg",
        matched: false,
        id: 6,
      },
    ],
  };
  firstClickSrc = "";
  firstIndex = "";
  matchedPairHandler = (i, id, img) => {
    let card = this.state.cardImages.find((card) => card.id == id);
    console.log(img);
    card.matched = true;
    this.setState({ ...this.state });
    if (this.firstClickSrc === "") {
      this.firstClickSrc = img.src;
      this.firstIndex = i;
    } else if (this.firstClickSrc === img.src) {
      this.state.cardImages[this.firstIndex].matched = true;
      this.state.cardImages[i].matched = true;
      this.setState({ gameOverHandler: this.state.gameOverHandler - 2 });
      this.setState({ moves: this.state.moves + 1 });
      this.firstClickSrc = "";
      this.isGameOver();
    } else if (this.firstClickSrc != img.src) {
      setTimeout(() => {
        this.state.cardImages[this.firstIndex].matched = false;
        this.state.cardImages[i].matched = false;
        this.setState({ moves: this.state.moves + 1 });
        this.firstClickSrc = "";
      }, 1000);
    }
  };
  isGameOver = () => {
    if (this.state.gameOverHandler === 0) {
      clearInterval(this.id);
      this.setState(alert(JSON.stringify({ messageGameOver: "GAME OVER" })));
      this.handleLocalStorageTime();
      this.handleLocalStorageMoves();
      setTimeout(() => {
        this.setState({ time: 0 });
      }, 3000);
    }
  };
  timeHandler = () => {
    this.id = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  };
  handleTimeLocalStorage = () => {
    const arr = JSON.parse(localStorage.getItem("time"));
    let time = arr.map((item, i) => {
      return <p key={i}>{item}</p>;
    });

    this.setState({ results: time });
  };
  handleLocalStorageTime = () => {
    let arrLocal = [];
    if (localStorage.getItem("time")) {
      arrLocal = JSON.parse(localStorage.getItem("time"));
    }
    const { time } = this.state;
    arrLocal.push(time);
    localStorage.setItem("time", JSON.stringify(arrLocal));
  };
  handleMovesLocalStorage = () => {
    const arr = JSON.parse(localStorage.getItem("moves"));
    let moves = arr.map((item, i) => {
      return <p key={i}>{item}</p>;
    });

    this.setState({ turns: moves });
  };
  handleLocalStorageMoves = () => {
    let arrLocal = [];
    if (localStorage.getItem("moves")) {
      arrLocal = JSON.parse(localStorage.getItem("moves"));
    }
    const { moves } = this.state;
    arrLocal.push(moves);
    localStorage.setItem("moves", JSON.stringify(arrLocal));
  };
  render() {
    return (
      <div className={styles.memoryGame}>
        <img src="https://i.pinimg.com/474x/2b/9f/38/2b9f38b94f5737fd1c1933d3e00b3efa.jpg" />
        <h1 className={styles.title}>Memory Game</h1>
        <button className={styles.startGame} onClick={this.timeHandler}>
          Start Game
        </button>
        {this.state.cardImages.map((img, i) => (
          <img
            key={img.id}
            onClick={() => {
              this.matchedPairHandler(i, img.id, img);
            }}
            src={img.matched == true ? img.src : img.backImg}
          />
        ))}
        <h1 className={styles.time}>Time: {this.state.time}</h1>
        <img
          className={styles.gif}
          src="https://i.pinimg.com/originals/f1/b6/c7/f1b6c7591a909b12eda1d980fe83a16a.gif"
        />
        <h1 className={styles.moves}>Moves: {this.state.moves}</h1>
        <p>{this.state.messageGameOver}</p>
        <button
          className={styles.history}
          onClick={this.handleTimeLocalStorage}
        >
          Time History
        </button>
        <h1 style={{ color: "white" }}>Timing: {this.state.results}</h1>
        <br />
        <button
          className={styles.history}
          onClick={this.handleMovesLocalStorage}
        >
          Moves History
        </button>
        <h1 style={{ color: "white" }}>Moves: {this.state.turns}</h1>
      </div>
    );
  }
}
export default MemoryGame;
