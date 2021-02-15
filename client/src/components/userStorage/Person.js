import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import MessageModal from '../messageStorage/MessageModal'
import { Link } from 'react-router-dom'

const Person = ({ fullname, email, _id, pm, userID }) => {

    const [toggle, setToggle] = useState(false)

    return (
        <div className="container">

            <Card className="my-5">
                <Card.Header as="h5">{fullname}</Card.Header>
                <Card.Body>
                    <Card.Title>{email}</Card.Title>

                    <Card.Text>
                        Ping me up {_id}
                        <Button variant="secondary" style={{ float: 'right' }} onClick={() => setToggle(!toggle)}>
                            {/* Message */}
                            <Link to={{
                                pathname: `/chat/${_id}`,
                                userProps: {
                                    user: _id,
                                    fullname: fullname,
                                    email: email,
                                    from: userID,
                                    pm: pm
                                }
                            }} style={{ color: 'white' }}>Message</Link>
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            {
                toggle ? <MessageModal fullname={fullname} email={email} _id={_id} pm={pm} /> : null
            }


        </div >
    )
}

export default Person
