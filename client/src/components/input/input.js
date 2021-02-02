import React, { useState } from 'react'
import { Card } from "react-bootstrap";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaSmile } from 'react-icons/fa'

const Input = ({ message, setMessage, sendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const handleEmoji = (e) => {
        const text = `${e.native}`
        setMessage(text)

    }
    return (
        <div>
            <form>
                <Card className="bg-dark text-white ">
                    {
                        showEmojiPicker
                            ?
                            <Picker onSelect={handleEmoji} />
                            :
                            null
                    }
                    <div className="inputMagic">
                        <FaSmile size={40} onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{ cursor: 'pointer' }} />
                        <input type="text"
                            value={message}
                            placeholder="Type something .... "
                            onChange={handleChange}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                        />
                        <button onClick={(e) => sendMessage(e)}>Send</button>
                    </div>
                </Card>
            </form>

        </div >
    )
}

export default Input
