// Import APIs
import apikey from "./APIs/apikey";

// Import React
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import plugins
import axios from "axios";

// Import components
import SearchVideo from "./Components/SearchVideo";
import Player from "./Components/Player";
import Info from "./Components/Info";

// Import styles
import "./styles.scss";

const App = () => {
  const [videoID, setVideoID] = useState("");
  const [videoInfo, setVideoInfo] = useState({
    viewCount: 0,
    likeCount: 0,
    dislikeCount: 0
  });

  useEffect(() => {
    if (videoID !== "") {
      let URL = "https://www.googleapis.com/youtube/v3/videos";
      axios
        .get(URL, {
          params: {
            id: videoID,
            key: apikey.key,
            fields: "items(id,snippet(channelId,title,categoryId),statistics)",
            part: "snippet,statistics"
          }
        })
        .then((res) => {
          const info = res.data.items[0];
          setVideoInfo({
            viewCount: info.statistics.viewCount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            likeCount: info.statistics.likeCount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            dislikeCount: info.statistics.dislikeCount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          });
        });
    }
  }, [videoID]);

  const getVideoID = (id) => {
    setVideoID(id);
  };

  return (
    <div className="App py-4">
      <Container>
        <Row className="justify-content-center">
          <Col sm={9}>
            <Player videoID={videoID}></Player>
          </Col>
        </Row>
        <Info videoInfo={videoInfo}></Info>
      </Container>
      <Container className="align-self-end">
        <Row>
          <Col>
            <SearchVideo getVideoID={getVideoID}></SearchVideo>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
