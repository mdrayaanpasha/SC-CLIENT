import React from "react";

//media assets.
import "../../assets/css/failed.css";
function Failed() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">Order Failed</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Oops! Something went wrong</h3>
                <p>
                  The order you tried to place was not successful. Please try
                  again later.
                </p>
                <a href="/" className="link_404">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Failed;
