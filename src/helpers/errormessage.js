import React, { Children } from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({variant="info",children}){
  return(
    <Alert variant={variant} style={{fontSize:16}}>
           {children} 
    </Alert>
  )
}
export default ErrorMessage