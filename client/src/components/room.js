import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Room = (props) => {
    const [room, setRoom] = useState('')
    var name = props.location.propName.name

    const clickHandle = (e) => {
        return (
            (!room) ? e.preventDefault() : null
        )
    }

    const clickRoom = (e) => {
        setRoom(e.target.value)
    }


    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="text-center">
                <div>
                    <h3>Rooms</h3>
                    <ListGroup style={{ cursor: 'pointer' }}>
                        <ListGroup.Item action variant="warning" onClick={clickRoom} value="javascript" name="javascript" onClick={clickRoom}>Javascript</ListGroup.Item>
                        <ListGroup.Item action variant="info" onClick={clickRoom} value="linux" name="linux">Linux</ListGroup.Item>
                        <ListGroup.Item action variant="warning" onClick={clickRoom} value="python" name="python">Python</ListGroup.Item>
                        <ListGroup.Item action variant="info" onClick={clickRoom} value="c" name="c">C/ C++</ListGroup.Item>
                        <ListGroup.Item action variant="warning" onClick={clickRoom} value="wordpress" name="wordpress">Wordpress</ListGroup.Item>
                        <ListGroup.Item>
                            <input placeholder="Enter a room ..... " onChange={(e) => setRoom(e.target.value)}></input>
                        </ListGroup.Item>
                        <Link to={`/chat?name=${name}&room=${room}`} onClick={clickHandle}>
                            <button>Join in</button>
                        </Link>
                    </ListGroup>
                </div>
                <div className="mt-5">
                    <h3>Create Room</h3>
                    <FaPlus />
                </div>

            </div>
        </div>
    )
}

export default Room
