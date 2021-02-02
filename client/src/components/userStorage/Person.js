import React from 'react'
import { Card, Button } from 'react-bootstrap'
import MessageModal from '../messageStorage/MessageModal'
import { Link } from 'react-router-dom'

const Person = ({ list }) => {
    const { fullname, email, _id } = list
    return (
        <div className="container">
            <Card className="my-5">
                <Card.Header as="h5">{fullname}</Card.Header>
                <Card.Body>
                    <Card.Title>{email}</Card.Title>
                    <Card.Text>
                        Ping me up {_id}
                        <Button variant="secondary" style={{ float: 'right' }} onClick={(e) => console.log(_id)
                        }>
                            {/* Message */}
                            <Link to={{
                                pathname: "/chat",
                                userProps: {
                                    user: _id,
                                    fullname: fullname,
                                    email: email
                                }
                            }} style={{ color: 'white' }}>Message</Link>
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <MessageModal /> */}
        </div >
    )
}

export default Person
