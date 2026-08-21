import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Gallery.css";

function Gallery() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => setTour(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!tour) return <h2>Loading...</h2>;

 return (
  <div className="gallery-page">
    <h1>{tour.title} Gallery</h1>

    <div className="gallery-grid">
      {tour.gallery && tour.gallery.length > 0 ? (
        tour.gallery.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery ${index}`}
          />
        ))
      ) : (
        <h2>No Gallery Images Found</h2>
      )}
    </div>
  </div>
);
  
}

export default Gallery;