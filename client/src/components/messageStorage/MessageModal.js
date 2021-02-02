import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'

const MessageModal = () => {
    const [ping, setPing] = useState(true)

    return (
        <div>
            {ping ?
                <Modal.Dialog style={{ width: '100vh', position: 'absolute', zIndex: '1' }} className="col-5" >
                    <Modal.Header onClick={() => setPing(false)} closeButton>
                        <Modal.Title>Private chat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Control type="email" placeholder="Type something ....." />
                    </Modal.Footer>
                </Modal.Dialog>

                : null}

        </div>
    )
}

export default MessageModal
