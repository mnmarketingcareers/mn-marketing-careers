import React from 'react'

function Modal() {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Are you sure You Want To Continue?</h1>
                </div>
                    <button>X</button>
                <div className="body">
                    <p>The Next Page Is Awesome</p>
                </div>
                <div className="footer">
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Modal

