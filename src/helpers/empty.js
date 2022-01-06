import React from 'react'
import EmptyImg from '../assests/images/Empty-bro.png'
 function Empty() {
    return (
        <div className="justify-content-center errorDiv">
            <img src={EmptyImg} className="emptyImg"/>
            <h3>OOPS On N a rien trouver Ici</h3>
        </div>
    )
}
export default Empty;