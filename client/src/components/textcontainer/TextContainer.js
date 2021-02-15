import React from 'react'
import { ListGroup } from 'react-bootstrap'

const TextContainer = ({ users, active }) => {
    return (
        <div style={{ backgroundColor: 'rebeccapurple' }} className="col-2">
            {
                users ? (
                    <div>
                        <h3 style={{ color: "white " }}>Online:</h3>
                        <div className="activeContainer">
                            <ListGroup>
                                {users.map(({ username }, i) => (
                                    <div key={i} className="activeItem text-center">
                                        <ListGroup.Item action variant="info" onClick={active}>{username}</ListGroup.Item>
                                    </div>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                )
                    : null
            }


        </div >
    )
}

export default TextContainer
