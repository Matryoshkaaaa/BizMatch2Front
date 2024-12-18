import React, { useState, useEffect } from "react";
import "./styles/test.css";

const MyComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeStr, setTimeStr] = useState(""); // 상태로 시간을 저장
  const [isClockOn, setIsClockOn] = useState(false); // 불이 켜지는 상태 추가

  // Handle focus and blur events
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setIsDisabled(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDisabled(false);

      setIsActive(true);
    }, 1000);
  };

  // Function to update time and date
  const updateTimeAndDate = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    let amPm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    let timeStr = hours.toString().padStart(2, "0") + minutes;
    if (timeStr.startsWith("0")) {
      timeStr = " " + timeStr.slice(1);
    }
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    const year = now.getFullYear().toString().slice(-2);
    if (month.startsWith("0")) {
      month = " " + month.slice(1);
    }
    if (day.startsWith("0")) {
      day = " " + day.slice(1);
    }
    const displayStr = timeStr + amPm + month + day + year;
    setTimeStr(displayStr); // 상태로 시간을 설정
  };

  // Update time and date every minute
  useEffect(() => {
    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 60000); // Update every minute

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle the button click to toggle clock on and off
  const toggleClock = () => {
    setIsClockOn((prev) => !prev);
  };

  // Render the clock
  return (
    <div className="superBody">
      <svg id="noise-svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.5"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect id="noise-rect" filter="url(#noiseFilter)" />
      </svg>

      <div className={`clock ${isClockOn ? "" : "off"}`}>
        <div className="shadow"></div>

        <div className="base-container">
          <div className="base">
            <div></div>
          </div>
        </div>
        <div className="small-outer-pipe">
          <div className="small-inner-pipe"></div>
        </div>
        <div className="outer-pipe">
          <div className="inner-pipe"></div>
        </div>
        <div className="pipe-accents">
          <div className="top-tube"></div>
          <div className="tube-holders">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top"></div>
          <div className="topinset"></div>
          <div className="left">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="right">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </div>

        <div className="display">
          <div className="row">
            <div className="col">
              <div>8</div>
              <div id="char01">{timeStr[0]}</div>
              <div id="char02">{timeStr[1]}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div id="char11">{timeStr[2]}</div>
              <div id="char12">{timeStr[3]}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div id="char21">{timeStr[4]}</div>
              <div id="char22">{timeStr[5]}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div id="char31">{timeStr[6]}</div>
              <div id="char32">{timeStr[7]}</div>
            </div>
          </div>
          <div style={{ height: "0.2em" }}></div>
          <div className="small-row">
            <div className="row">
              <div className="col">
                <div>8</div>
                <div id="char41">{timeStr[8]}</div>
                <div id="char42">{timeStr[9]}</div>
              </div>
              <div className="col">
                <div>8</div>
                <div id="char51">{timeStr[10]}</div>
                <div id="char52">{timeStr[11]}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div id="char61">{timeStr[12]}</div>
              <div id="char62">{timeStr[13]}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div id="char71">{timeStr[14]}</div>
              <div id="char72">{timeStr[15]}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div id="char81">{timeStr[16]}</div>
              <div id="char82">{timeStr[17]}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div id="char91">{timeStr[18]}</div>
              <div id="char92">{timeStr[19]}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div id="char101">{timeStr[20]}</div>
              <div id="char102">{timeStr[21]}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div id="char111">{timeStr[22]}</div>
              <div id="char112">{timeStr[23]}</div>
            </div>
          </div>
        </div>

        <div className="glass-tube"></div>
        <div className="hex">
          <div className="overlay"></div>
        </div>

        <div className="tube-base-container">
          <div className="wires">
            <div></div>
            <div></div>
          </div>
          <div className="tube-base"></div>
          <div className="rods">
            <div className="left-rod"></div>
            <div className="center-rod"></div>
            <div className="right-rod"></div>
          </div>
          <div className="tube-btm"></div>
        </div>

        <div className="power-cord">
          <div></div>
          <div></div>
        </div>

        <div className="button" onClick={toggleClock}>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
