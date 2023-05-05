import KUTE from "kute.js";
import { useEffect } from "react";

const BgMorph = ({
  bgColor,
  primaryColor1,
  primaryColor2,
  secondaryColor1,
  secondaryColor2,
}) => {
  useEffect(() => {
    const tween = KUTE.fromTo(
      "#blob1up",
      { path: "#blob1up", attr: { fill: primaryColor1 || "black" } },
      {
        path: "#blob2up",
        attr: { fill: primaryColor2 || primaryColor1 || "red" },
      },
      { repeat: 999, duration: 1500, yoyo: true }
    );
    const tween2 = KUTE.fromTo(
      "#blob1dn",
      { path: "#blob1dn", attr: { fill: secondaryColor1 || "black" } },
      {
        path: "#blob2dn",
        attr: { fill: secondaryColor2 || secondaryColor1 || "red" },
      },
      { repeat: 999, duration: 1500, yoyo: true }
    );

    tween.start();
    tween2.start();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        background: bgColor || "white",
        zIndex: 1,
      }}>
      <svg
        id='visual'
        viewBox='0 0 900 600'
        width='100%'
        height='100%'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'>
        <g transform='translate(900, 0)'>
          <path
            id='blob1up'
            d='M0 486.7C-54.2 461.6 -108.3 436.5 -173.4 418.5C-238.4 400.6 -314.3 389.8 -344.2 344.2C-374.1 298.6 -358.1 218.2 -374.2 155C-390.3 91.8 -438.5 45.9 -486.7 0L0 0Z'
            fill={primaryColor1}></path>
        </g>
        <g transform='translate(0, 600)'>
          <path
            id='blob1dn'
            d='M0 -486.7C55.9 -457.7 111.8 -428.6 168 -405.6C224.2 -382.5 280.8 -365.5 330.9 -330.9C381.1 -296.4 424.8 -244.3 449.7 -186.3C474.6 -128.2 480.7 -64.1 486.7 0L0 0Z'
            fill={secondaryColor1}></path>
        </g>
        <g
          transform='translate(900, 0)'
          style={{ visibility: "hidden" }}>
          <path
            id='blob2up'
            d='M0 486.7C-68.8 485.6 -137.5 484.4 -186.3 449.7C-235 415 -263.8 346.9 -295.6 295.6C-327.3 244.3 -362.1 209.9 -394.5 163.4C-426.9 117 -456.8 58.5 -486.7 0L0 0Z'
            fill={primaryColor1}></path>
        </g>
        <g
          transform='translate(0, 600)'
          style={{ visibility: "hidden" }}>
          <path
            id='blob2dn'
            d='M0 -486.7C66.7 -484 133.4 -481.3 186.3 -449.7C239.1 -418.1 278.1 -357.7 304.1 -304.1C330.1 -250.4 343.1 -203.4 371.4 -153.8C399.7 -104.3 443.2 -52.1 486.7 0L0 0Z'
            fill={secondaryColor1}></path>
        </g>
      </svg>
    </div>
  );
};

export default BgMorph;
