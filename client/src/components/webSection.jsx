import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function WebSection() {
  const [tripSearch, setTripSearch] = useState("");
  const [tripResult, setTripResult] = useState([]);

  const getTrip = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${tripSearch}`
    );
    setTripResult(result.data.data);
  };

  useEffect(() => {
    getTrip();
  }, [tripResult]);

  return (
    <>
      <div className="trip-search">
        <h3 className="sub-header">ค้นหาที่เที่ยว</h3>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={(event) => {
            setTripSearch(event.target.value);
          }}
        />
      </div>

      <div className="trip-list">
        {tripResult.map((item) => {
          return (
            <div key={item.eid} className="preview-trip">
              <div className="preview-photo">
                <img
                  src={item.photos[0]}
                  alt={item.title}
                  width="450"
                  height="300"
                />
              </div>
              <div className="trip-detail">
                <h3>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </h3>
                <p>{item.description.substring(0, 100)}...</p>
                <a href={item.url} target="_blank">
                  อ่านต่อ
                </a>

                <div>
                  <span>หมวด </span>
                  {item.tags.map((tag, index) => {
                    return (
                      <span className="trip-tags" key={index}>
                        {`${tag} `}
                      </span>
                    );
                  })}
                </div>

                <div className="more-images">
                  {item.photos.slice(1).map((img, index) => {
                    return (
                      <img
                        src={img}
                        alt={img}
                        key={index}
                        width="100"
                        height="100"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WebSection;
