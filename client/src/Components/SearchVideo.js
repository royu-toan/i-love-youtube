// Import APIs
import apikey from "../APIs/apikey";

// Import React
import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  Button,
  Dropdown,
  Row,
  Col,
  Card
} from "react-bootstrap";

// Import plugins
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const gapi = window.gapi;

const SearchVideoInput = React.forwardRef(
  (
    { children, value, onChangeContent, onResetContent, onSearchVideo },
    ref
  ) => (
    <Form onSubmit={onSearchVideo}>
      <InputGroup>
        <Form.Control
          type="text"
          value={value}
          placeholder={children}
          ref={ref}
          onChange={onChangeContent}
        />
        <Button variant="danger" onClick={onResetContent}>
          Xóa
        </Button>
        <Button variant="primary" onClick={onSearchVideo}>
          Tìm kiếm
        </Button>
      </InputGroup>
    </Form>
  )
);

const SearchVideoResults = (props) => {
  const convertHTMLString = (str) => {
    let doc = new DOMParser().parseFromString(str, "text/html");
    return doc.firstChild.childNodes[1].innerText;
  };

  return (
    <Dropdown.Menu>
      <OverlayScrollbarsComponent className="dropdown-scroll">
        {props.results.map((item) => (
          <Dropdown.Item
            key={item.id}
            onClick={(e) => props.onSetVideo(e, item.id)}
          >
            <Card>
              <Row>
                <Col sm={2}>
                  <Card.Img src={item.thumbnails} />
                </Col>
                <Col sm={10}>
                  <Card.Body>
                    <Card.Title>{convertHTMLString(item.title)}</Card.Title>
                    <Card.Text>
                      <span className="text-muted">{item.channelTitle}</span>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Dropdown.Item>
        ))}
      </OverlayScrollbarsComponent>
    </Dropdown.Menu>
  );
};

const SearchVideo = (props) => {
  const [content, setContent] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    gapi.load("client", () => {
      gapi.client
        .init({
          apiKey: apikey.key
        })
        .then(() => {
          gapi.client.load(
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          );
        });
    });
  });

  useEffect(() => {
    if (content === "") {
      setShowResults(false);
    }
  }, [content]);

  const onSearchVideo = (e) => {
    e.preventDefault();
    if (content !== "") {
      gapi.client.youtube.search
        .list({
          part: ["snippet"],
          maxResults: 10,
          q: content
        })
        .then(
          (reponsive) => {
            const body = JSON.parse(reponsive.body);
            const filters = body.items.filter(
              (item) => item.id.kind !== "youtube#channel"
            );
            const items = filters.map((item) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              channelTitle: item.snippet.channelTitle,
              thumbnails: item.snippet.thumbnails.high.url
            }));
            setResults(items);
            setShowResults(true);
          },
          (err) => {
            console.error("Excute error", err);
          }
        );
    }
  };

  const onSetVideo = (e, id) => {
    e.preventDefault();
    setContent("");
    props.getVideoID(id);
  };

  return (
    <Dropdown show={showResults} drop="up" className="App-SearchVideo">
      <Dropdown.Toggle
        as={SearchVideoInput}
        value={content}
        onChangeContent={(e) => setContent(e.target.value)}
        onResetContent={() => setContent("")}
        onSearchVideo={onSearchVideo}
      >
        Gõ video bạn muốn...
      </Dropdown.Toggle>
      <SearchVideoResults
        results={results}
        onSetVideo={onSetVideo}
      ></SearchVideoResults>
    </Dropdown>
  );
};

export default SearchVideo;
