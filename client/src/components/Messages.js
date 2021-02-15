import React, { useState, useEffect } from 'react'
import { Modal, Form, Card } from 'react-bootstrap'
import Message from './Message'
import TextContainer from './textcontainer/TextContainer'
import axios from 'axios'


import ScrollToBottom from 'react-scroll-to-bottom'

const Messages = ({ message, name, users }) => {
    const [active, setActive] = useState(false)
    const [oldMessage, setOldMessage] = useState()
    useEffect(() => {
        async function getOldMessage() {
            var res = await axios.get('http://localhost:4000/api/chat/')
            setOldMessage(res.data.data)
        }
        getOldMessage();

    }, [])

    return (
        <div className="d-flex" style={{ height: '50vh', position: 'relative' }}>
            {active ?
                <Modal.Dialog style={{ width: '100vh', position: 'absolute', zIndex: '1' }} className="col-5" >
                    <Modal.Header onClick={() => setActive(false)} closeButton>
                        <Modal.Title>Private chat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Control type="email" placeholder="Type something ....." />
                    </Modal.Footer>
                </Modal.Dialog>

                : null}
            <ScrollToBottom className="col-10">

                <Card style={{ border: 'none', height: '50vh' }}>


                    {oldMessage?.map((list) => {
                        return (
                            <p>{list.message}</p>
                        )
                    })}
                    {message.map((list, i) => {
                        return (
                            <div>
                                {/* <p>{list.user} : {list.text} <span style={{ float: 'right' }}>{list.time}</span></p> */}
                                <Message message={list} name={name} />
                            </div>
                        )
                    })}
                </Card>
            </ScrollToBottom>
            <TextContainer users={users} active={() => setActive(true)} />
        </div>
    )
}

export default Messages
