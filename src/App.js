import './App.css';
import './DarkMode.css';
import React, { useState, useEffect } from "react";
import Share from "./Share";
import * as index from './index.js'
import { AiOutlineSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import { Modal } from "./Modal";

function NavBar(props) {
  const [showModal, setShowModal] = useState(false);

  const openModal = (modalTopic) => {
    setShowModal(modalTopic);
  };
  return (
    <nav className="top-navigation">
      <a className="site-name" href="#">Headline or Headlie</a>
      <div className="button-container">
        <button className="nav-button">
          <AiOutlineQuestionCircle className="button-icon" onClick={() => openModal("help")} />
        </button>
        <button className="nav-button">
          <AiOutlineSetting className="button-icon" onClick={() => openModal("settings")} />
        </button>
      </div>
      {showModal ? <Modal setShowModal={setShowModal} modalTopic={showModal} theme={props.theme} currentTheme={props.currentTheme} /> : null}
    </nav>
  )
}

function HeadlineBox(props) {
  return (
    <div className="headline-box">
      <p className='headline'>{props.headline}</p>
      <div className="break"></div>
      <button className='option' onClick={() => index.select("Real")}>Real</button>
      <button className='option' onClick={() => index.select("AI")}>Fake</button>
      <div className="break"></div>
      <button className='restart' onClick={() => index.restart()}>Restart</button>
    </div>
  )
}

function ResultBox(props) {
  var boxClass = "result-box" + (props.correct ? " correct" : " incorrect");
  return (
    <div className={boxClass}>
      <p>{props.headline}</p>
      <p>You guessed: {props.guess}</p>
      {props.correct ? <p> Correct</p> : <p>Incorrect</p>}
      <Share label="Share This Headline" url="https://headlines.ronenjain.com" title={props.headline} text="Is this headline real or not?" buttonID={props.buttonID} />
      <br />
    </div>
  );
}

function Results(props) {
  return (
    <div>
      <div id="full-results">
            {/* <p>Results</p>
            <p>Correct: {props.correct}</p>
            <p>Incorrect: {props.incorrect}</p> */}
            <p>You guessed <strong>{props.correct}/5</strong> headlines correct!</p>
            <Share label="Share Score" url="https://headlines.ronenjain.com" title={`I guessed ${props.correct}/5 headlines correct!`} text="Can you beat my score?" buttonID="share-score" />
        </div>
      <div id="results">
          {props.guesses.map((object, i) => <ResultBox headline={object['headline']} guess={object['guess']} correct={object['correct']} key={i} buttonID={i} />)}
      </div>
    </div>
  );
}

function App(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = theme;
      }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <NavBar page="home" theme={toggleTheme} currentTheme={theme}></NavBar>
      <header className={`App-header ${theme}`}>
        {props.game ? <HeadlineBox headline={props.headline}></HeadlineBox> : <Results correct={props.correct} incorrect={props.incorrect} guesses={props.guesses}></Results>}
      </header>
    </div>
  );
}

export default App;
export {Results};