//components
import Nav from "../non-routed-comps/nav";


//media assets
import '../../assets/css/orderfail.css';

export default function OrderFail() {
  return (
    <>
      <Nav />
      <div className="order-fail-container">
        <h1>Order Failed</h1>
        <p>
          Unfortunately, your order was unsuccessful. Our developers are working on 
          resolving the issue. Please try again later.
        </p>
        <p className="note">
          Note: Developer setup is incomplete (MERCHANT-UID pending).
        </p>
      </div>
    </>
  );
}