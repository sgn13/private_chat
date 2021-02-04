import React from "react";
import { Card, Button } from "react-bootstrap";
import MessageModal from "../messageStorage/MessageModal";
import { Link } from "react-router-dom";

const Person = ({ list }) => {
  const { f_name, email, _id } = list;
  console.log(list);
  return (
    <div className="container">
      <Card className="my-5">
        <Card.Header as="h5">{f_name}</Card.Header>
        <Card.Body>
          <Card.Title>{email}</Card.Title>
          <Card.Text>
            Message <b>{f_name}</b>
            <Button
              variant="secondary"
              style={{ float: "right" }}
              onClick={(e) => console.log(_id)}
            >
              {/* Message */}
              <Link
                to={{
                  pathname: "/chat",
                  userProps: {
                    user: _id,
                    f_name: f_name,
                    email: email,
                  },
                }}
                style={{ color: "white" }}
              >
                Message
              </Link>
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <MessageModal /> */}
    </div>
  );
};

export default Person;
