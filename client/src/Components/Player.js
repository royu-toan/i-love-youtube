// Import React
import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";

// Import plugins
import YouTube from "react-youtube";

// Import assets
import youtubeImage from "../assets/images/youtube.svg";

const Player = (props) => {
  const playerEl = useRef(null);

  const [playerHeight, setPlayerHeight] = useState(0);

  const changePlayerHeight = (width) => {
    setPlayerHeight((width * 9) / 16);
  };

  useEffect(() => {
    changePlayerHeight(playerEl.current.offsetWidth);
    window.addEventListener("resize", () => {
      changePlayerHeight(playerEl.current.offsetWidth);
    });
  });

  return (
    <div className="App-Player">
      <div
        className="App-Player-Inner"
        ref={playerEl}
        style={{ height: playerHeight }}
      >
        {props.videoID !== "" ? (
          <YouTube
            videoId={props.videoID}
            opts={{
              height: playerHeight
            }}
          />
        ) : (
          <Row>
            <Col sm={3} xs={6}>
              <Image src={youtubeImage} fluid />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Player;
