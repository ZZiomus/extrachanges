import React from "react";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Layout from "../layout/main.layout";

export default function Error404Page() {
  useScrollToTop();

  return (
    <Layout>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="desc desc-refer text-center">
                <h1 className="gd-text mt-5">Page Not Found</h1>
                <h1 className="gd-text ">404</h1>

                <div className="desc-img">
                  <img src="assets/img/refer-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
