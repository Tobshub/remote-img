import Img1 from "@/assets/rand_image_1.jpg";
import Img2 from "@/assets/rand_image_2.jpg";
import clientToken from "@/utils/token";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [isLoggedIn] = useState(!!clientToken.get());
  const userSignOut = () => {
    clientToken.remove();
    location.reload();
  };
  return (
    <div className="page">
      <main className="page d-flex justify-content-center align-items-center gap-4">
        <div>
          <h1>Tobsmg</h1>
          <div style={{ maxWidth: 350 }}>
            <p>Tobsmg is a fun little project I built to help me share images</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/upload" className="btn btn-primary">
              UPLOAD
            </Link>
            <Link to="/images" className="btn btn-outline-secondary">
              IMAGES
            </Link>
            {isLoggedIn && (
              <button className="btn btn-outline-danger" onClick={userSignOut}>
                SIGN OUT
              </button>
            )}
          </div>
        </div>
        <div className="d-flex flex-column">
          <img
            src={Img1}
            style={{ maxWidth: 300, rotate: "-5deg", backgroundColor: "grey" }}
          />
          <img
            src={Img2}
            style={{ maxWidth: 300, rotate: "5deg", backgroundColor: "grey" }}
          />
        </div>
      </main>
    </div>
  );
}
