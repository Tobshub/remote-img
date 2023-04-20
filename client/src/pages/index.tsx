import Img1 from "@/assets/rand_image_1.jpg";
import Img2 from "@/assets/rand_image_2.jpg";
import { Link } from "react-router-dom";

export default function IndexPage() {
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
          </div>
        </div>
        <div className="d-flex flex-column">
          <img src={Img1} loading="lazy" style={{ maxWidth: 300, rotate: "-5deg" }} />
          <img src={Img2} loading="lazy" style={{ maxWidth: 300, rotate: "5deg" }} />
        </div>
      </main>
    </div>
  );
}
