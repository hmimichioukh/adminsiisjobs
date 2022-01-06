import React from 'react'
import EmptyImg from '../assetes/image/Empty-bro.png'
 function Empty() {
    return (
        <div className="justify-content-center errorDiv">
            <img src={EmptyImg} className="emptyImg" style={{"width":"480px"}}/>
            <h3>OOPS On N a rien trouver Ici</h3>
        </div>
    )
}
export default Empty;