// Import React
import React from "react";
import { Row, Col, Image } from "react-bootstrap";

// Import assets
import eyeImage from "../assets/images/eye.svg";
import likeImage from "../assets/images/like.svg";
import dislikeImage from "../assets/images/dislike.svg";

const Info = (props) => {
  return (
    <Row className="App-Info mt-4">
      <Col
        sm={4}
        className="d-flex align-items-center justify-content-center mb-3"
      >
        <Image src={eyeImage} className="me-3" />
        <span className="fs-2">{props.videoInfo.viewCount}</span>
      </Col>
      <Col
        sm={4}
        className="d-flex align-items-center justify-content-center mb-3"
      >
        <Image src={likeImage} className="me-3" />
        <span className="fs-2">{props.videoInfo.likeCount}</span>
      </Col>
      <Col
        sm={4}
        className="d-flex align-items-center justify-content-center mb-3"
      >
        <Image src={dislikeImage} className="me-3" />
        <span className="fs-2">{props.videoInfo.dislikeCount}</span>
      </Col>
    </Row>
  );
};

export default Info;
