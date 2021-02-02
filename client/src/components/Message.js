import React from 'react'

const Message = ({ message: { user, text, time }, name }) => {
    console.log(text);
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser ?
            <div className="messageContainer justifyEnd" style={{ float: 'right' }}>
                {/* <p className="sentText"></p> */}
                <div className="messageBox">
                    <p className="messageText" style={{ display: "flex" }}>
                        <span style={{ color: 'grey', fontSize: '12px', marginRight: '1rem' }}>{time}</span>
                        <span style={{ backgroundColor: '#61dafb', padding: '0.75rem', borderRadius: '10%' }}>{text}</span> <b> &nbsp; {trimmedName}</b>
                        <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: 'green', marginRight: '15px' }}></div>
                    </p>
                </div>
            </div> :
            <div className="messageContainer justifyStart ">
                <div className="messageBox">
                    <p className="messageText" style={{ display: "flex" }}>
                        <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: 'blue', marginRight: '15px' }}></div>
                        <b> {user}</b> &nbsp;  <span style={{ backgroundColor: '#61dafb', padding: '0.75rem', borderRadius: '10%' }}>{text}</span>
                        <span style={{ color: 'grey', fontSize: '12px', marginLeft: '1rem' }}>{time}</span>

                    </p>
                </div>
            </div>

    )
}

export default Message
