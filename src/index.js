import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Papa from 'papaparse';

var todays_headlines = [];
var starting_date = new Date(2025, 0, 5);

var user_data = {
  "headlines_attempted": 0,
  "headlines_correct": 0,
  "headlines_incorrect": 0,
  "guesses": [],
  "timestamp": `${new Date().getDay().toString()}-${new Date().getMonth().toString()}-${new Date().getFullYear().toString()}`,
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const promise = new Promise((resolve, reject) => {
Papa.parse("/headlines.csv", {
  download: true,
  complete: function(results) {
    var date = new Date();
    var days = Math.floor((date - starting_date) / (1000 * 60 * 60 * 24));
    var headlines = results.data.slice(1);
    var totalHeadlines = headlines.length;
    var startIndex = (days * 5) % totalHeadlines;
    for (var i = 0; i < 5; i++) {
      todays_headlines.push({
        "headline": headlines[(startIndex + i) % totalHeadlines][0],
        "category": headlines[(startIndex + i) % totalHeadlines][1],
        "type": headlines[(startIndex + i) % totalHeadlines][2]
      });
    }
    resolve();
  }
});
});

promise.then(res => {
  if (localStorage.getItem('user_data') === null) {
    localStorage.setItem('user_data', JSON.stringify(user_data));
  } else if (JSON.parse(localStorage.getItem('user_data'))['timestamp'] !== user_data['timestamp']) {
    localStorage.setItem('user_data', JSON.stringify(user_data));
  } else {
    var saved_user_data = JSON.parse(localStorage.getItem('user_data'));
    user_data["headlines_attempted"] = saved_user_data["headlines_attempted"];
    user_data["headlines_correct"] = saved_user_data["headlines_correct"];
    user_data["headlines_incorrect"] = saved_user_data["headlines_incorrect"];
    user_data["guesses"] = saved_user_data["guesses"];
    user_data["timestamp"] = saved_user_data["timestamp"];
  }

  if (user_data['headlines_attempted'] === todays_headlines.length) {
    root.render (
      <React.StrictMode>
        <App correct={user_data["headlines_correct"]} incorrect={user_data["headlines_incorrect"]} game={false} guesses={user_data["guesses"]}></App>
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <App headline={todays_headlines[user_data["headlines_attempted"]]["headline"]} game={true}/>
      </React.StrictMode>
    );
  }
});

export function select(choice) {
  var current_headline = todays_headlines[user_data["headlines_attempted"]];
  if (current_headline['type'] === choice) {
    user_data["headlines_correct"] += 1;
    user_data['guesses'].push({"headline": current_headline['headline'], "guess": choice, "correct": true})
  } else {
    user_data["headlines_incorrect"] += 1;
    user_data['guesses'].push({"headline": current_headline['headline'], "guess": choice, "correct": false})
  }
  user_data['headlines_attempted'] += 1;
  localStorage.setItem('user_data', JSON.stringify(user_data));
  if (user_data['headlines_attempted'] === todays_headlines.length) {
    root.render(
      <React.StrictMode>
        <App correct={user_data["headlines_correct"]} incorrect={user_data["headlines_incorrect"]} game={false} guesses={user_data["guesses"]}></App>
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <App headline={todays_headlines[user_data["headlines_attempted"]]["headline"]} game={true}></App>
      </React.StrictMode>
    );
  }
}

export function restart() {
  user_data["headlines_attempted"] = 0;
  user_data["headlines_correct"] = 0;
  user_data["headlines_incorrect"] = 0;
  user_data["guesses"] = [];
  localStorage.setItem('user_data', JSON.stringify(user_data));
  root.render(
    <React.StrictMode>
      <App headline={todays_headlines[user_data["headlines_attempted"]]["headline"]} game={true}/>
    </React.StrictMode>
  );
}

const hoverButtons = document.querySelectorAll('.hover-button');

hoverButtons.forEach(button => {
  button.addEventListener('touchstart', function() {
    button.classList.add('active');
  });

  button.addEventListener('touchend', function() {
    button.classList.remove('active');
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
