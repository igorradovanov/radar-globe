import { useEffect, useRef } from "react";
import Globe from "globe.gl";

function App() {
  const globeEl = useRef();

  useEffect(() => {
    // Import local file globe_data.json
    import("../globe_data.json").then((data) => {
      const globe = Globe()(globeEl.current)
        .globeImageUrl(
          "https://unpkg.com/three-globe/example/img/earth-night.jpg"
        )
        .arcsData(data.default) // Use the imported data here
        .arcColor("color")
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(5000);

      //Auto rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      // start to rotate on europe
      globe.pointOfView({ lat: 52.5, lng: 13.4, altitude: 2.5 });
    });

    return () => {
      if (globeEl.current) {
        globeEl.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div ref={globeEl}></div>
    </>
  );
}

export default App;
