import React, { useState } from "react";
import "./App.css"

function Share(props) {
    const info = {url: props.url, title: props.title, text: props.text };
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator
            .share(info)
            .then(() => console.log("Shared successfully"))
        } catch (error) {
            console.log("Error sharing", error);
        }
      } else {
        if (props.buttonID !== "share-score") {
          navigator.clipboard.writeText(`${info.title} - Can you guess if this headline is real? Play the game at ${info.url}`)
          .then(() => {
            document.getElementById(String(props.buttonID)).innerHTML = "Copied!";
            setTimeout(() => {
              document.getElementById(String(props.buttonID)).innerHTML = "Share This Headline";
            }, 3000);
          })
          .catch((error) => {
            console.error(`Could not copy text: ${error}`);
          }
          );
        } else {
          navigator.clipboard.writeText(`${info.title} ${info.text} Play the game at ${info.url}`)
          .then(() => {
            document.getElementById(String(props.buttonID)).innerHTML = "Copied!";
            setTimeout(() => {
              document.getElementById(String(props.buttonID)).innerHTML = "Share Score";
            }, 3000);
          })
          .catch((error) => {
            console.error(`Could not copy text: ${error}`);
          }
          );
        }
      }
    };
    return (
      <>
        <button className="sharer-button" onClick={handleShare}>
          <span className="sharer-button-text" id={String(props.buttonID)}>{props.label}</span>
        </button>
      </>
    )
  }
  
  export default Share;
  