import { Link } from "react-router-dom";
import "./style.css"
export default function Thankyou() {

return (
<div class="jumbotron text-center">
  <h1 class="display-3">Thank You!</h1>
  <h2>Your payment has been accepted</h2>
  <h3>You can now continue using the website</h3> 
  <hr></hr>
  <h3>
    Having trouble? <Link to ="../../contact">Contact us</Link>
  </h3>
  <h2>
    <Link class="btn btn-primary btn-sm" to="../../../app" >Continue to homepage</Link>
  </h2>
</div>);}