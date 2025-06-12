import React, { useState, useEffect } from 'react';

const Clock = ({ hours, minutes, isMoving = false }) => {
  // Calculate total minutes for continuous rotation
  const totalMinutes = hours * 60 + minutes;
  const hourRotation = (totalMinutes / 60) * 30; // 30 degrees per hour
  const minuteRotation = totalMinutes * 6; // 6 degrees per minute
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return (
    <div className="flex flex-col items-center">
      {/* Stopwatch stem and button */}
      <div className="relative mb-0">
        <div className={`w-6 h-2 bg-[#5750E3] rounded-full ${isMoving ? 'button-press-animation' : ''}`} /> {/* Button */}
        <div className="w-1 h-2 bg-[#5750E3] mx-auto" /> {/* Stem */}
      </div>
      <div className="w-[140px] h-[140px] bg-white rounded-full border-4 border-[#5750E3] flex items-center justify-center relative">
        <div className="w-[120px] h-[120px] rounded-full bg-[#5750E3]/10 flex items-center justify-center relative">
          {/* Clock numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const angle = (num * 30) - 90; // -90 to start at top
            const radius = 50; // Distance from center
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            return (
              <div
                key={num}
                className="absolute text-[#5750E3] text-sm font-medium"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transformOrigin: 'center',
                }}
              >
                {num}
              </div>
            );
          })}
          
          {/* Hour hand */}
          <div
            className={`absolute w-[1.5px] h-10 bg-[#5750E3] rounded-full`}
            style={{
              transform: `rotate(${hourRotation}deg)`,
              transformOrigin: 'bottom center',
              bottom: '50%',
              willChange: 'transform',
              transition: 'transform 200ms linear',
            }}
          />
          
          {/* Minute hand */}
          <div
            className={`absolute w-[1.5px] h-12 bg-[#5750E3] rounded-full`}
            style={{
              transform: `rotate(${minuteRotation}deg)`,
              transformOrigin: 'bottom center',
              bottom: '50%',
              willChange: 'transform',
              transition: 'transform 200ms linear',
            }}
          />
          
          {/* Center dot */}
          <div className="absolute w-2.5 h-2.5 bg-[#5750E3] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ElapsedTime = () => {
  const [showButton, setShowButton] = useState(true);
  const [isButtonShrinking, setIsButtonShrinking] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [isClockShrinking, setIsClockShrinking] = useState(false);
  const [isTimeMovingUp, setIsTimeMovingUp] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [show24HourTimes, setShow24HourTimes] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSecondExplanation, setShowSecondExplanation] = useState(false);
  const [showSecondContinue, setShowSecondContinue] = useState(false);
  const [isSecondTextShrinking, setIsSecondTextShrinking] = useState(false);
  const [isSecondButtonShrinking, setIsSecondButtonShrinking] = useState(false);
  const [endTime, setEndTime] = useState({ hours: 12, minutes: 30 });
  const [isMoving, setIsMoving] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isContinueShrinking, setIsContinueShrinking] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const startTime = { hours: 12, minutes: 30 }; // Static start time
  const [showFirstTimes, setShowFirstTimes] = useState(true);
  const [isFirstTimesShrinking, setIsFirstTimesShrinking] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [isArrowShrinking, setIsArrowShrinking] = useState(false);

  const handleClick = () => {
    setIsButtonShrinking(true);
    // Trigger initial button press animation
    setIsButtonPressed(true);
    setTimeout(() => {
      setIsButtonPressed(false);
      setShowButton(false);
      
      // Show clock with slower fade-in
      setShowClock(true);
      
      // Show times after clock appears
      setTimeout(() => {
        setShowStartTime(true);
        setShowEndTime(true);
        
        // Start clock animation after times appear
        setTimeout(() => {
          setIsButtonPressed(true); // Trigger button press animation
          setTimeout(() => {
            setIsButtonPressed(false);
            setIsMoving(true);
          }, 300);
        }, 800);
      }, 1000);
    }, 200);
  };

  const handleContinue = () => {
    if (showSecondContinue) {
      setIsSecondTextShrinking(true);
      setIsSecondButtonShrinking(true);
      setIsContinueShrinking(true);
      setIsArrowShrinking(true);
      setTimeout(() => {
        setShowSecondExplanation(false);
        setShowSecondContinue(false);
        setShowExplanation(false);
        setShowArrow(false);
      }, 500);
    } else {
      setIsContinueShrinking(true);
      setTimeout(() => {
        setShowContinue(false);
        setShowText(false);
        setIsTimeMovingUp(true);
        setTimeout(() => {
          setShowArrows(true);
          setShowArrow(true);
          setTimeout(() => {
            setShow24HourTimes(true);
            setTimeout(() => {
              setShowExplanation(true);
              setShowSecondExplanation(true);
              setTimeout(() => {
                setShowSecondContinue(true);
              }, 1200);
            }, 500);
          }, 500);
        }, 500);
      }, 300);
    }
  };

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setEndTime(prevTime => {
        let newMinutes = prevTime.minutes + 1;
        let newHours = prevTime.hours;
        
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours = (newHours + 1) % 24;
        }

        // Check if we've reached 1:05 PM (13:05)
        if (newHours === 13 && newMinutes === 5) {
          setIsMoving(false); // Stop the clock
          setHasReachedTarget(true); // Mark that we've reached the target time
          clearInterval(interval);
          // Trigger final button press animation
          setIsButtonPressed(true);
          setTimeout(() => {
            setIsButtonPressed(false);
            // Show text after clock stops
            setShowText(true);
            // Show continue button after text appears
            setTimeout(() => {
              setShowContinue(true);
            }, 1000);
          }, 400);
        }
        
        return { hours: newHours, minutes: newMinutes };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isMoving]);

  const handleReset = () => {
    // Reset all states to initial values
    setShowButton(true);
    setIsButtonShrinking(false);
    setShowText(false);
    setShowEndTime(false);
    setShowStartTime(false);
    setShowClock(false);
    setIsClockShrinking(false);
    setIsTimeMovingUp(false);
    setShowArrows(false);
    setShow24HourTimes(false);
    setShowExplanation(false);
    setShowSecondExplanation(false);
    setShowSecondContinue(false);
    setIsSecondTextShrinking(false);
    setIsSecondButtonShrinking(false);
    setEndTime({ hours: 12, minutes: 30 });
    setIsMoving(false);
    setShowContinue(false);
    setIsContinueShrinking(false);
    setHasReachedTarget(false);
    setIsButtonPressed(false);
    setShowFirstTimes(true);
    setIsFirstTimesShrinking(false);
    setShowArrow(false);
    setIsArrowShrinking(false);
  };

  return (
    <div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
      <style>
        {`
          @keyframes shrinkButton {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          .shrink-animation {
            animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .text-animation {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes growButton {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .continue-animation {
            animation: growButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes buttonPress {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(4px);
            }
            75% {
              transform: translateY(1px);
            }
            100% {
              transform: translateY(0);
            }
          }
          .button-press-animation {
            animation: buttonPress 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes shrinkText {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          @keyframes moveToTop {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-50px);
            }
          }
          @keyframes fadeInArrow {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .text-shrink {
            animation: shrinkText 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-to-top {
            animation: moveToTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .clock-shrink {
            animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .arrow-fade-in {
            animation: fadeInArrow 0.5s ease-out forwards;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-down {
            animation: fadeInDown 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .explore-button {
            background-color: #008545;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .explore-button:hover {
            background-color: #00783E;
          }
          .glow-button { 
            position: absolute;
            bottom: 0.5rem;
            right: 0.8rem;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            transition: all .3s ease;
            padding: 7px;
          }
          .glow-button::before {
            content: "";
            display: block;
            position: absolute;
            background: #fff;
            inset: 2px;
            border-radius: 4px;
            z-index: -2;
          }
          @property --r {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
          }
          .simple-glow { 
            background: conic-gradient(
              from var(--r),
              transparent 0%,
              rgb(0, 255, 132) 2%,
              rgb(0, 214, 111) 8%,
              rgb(0, 174, 90) 12%,
              rgb(0, 133, 69) 14%,
              transparent 15%
            );
            animation: rotating 3s linear infinite;
            transition: animation 0.3s ease;
          }
          .simple-glow.stopped {
            animation: none;
            background: none;
          }
          @keyframes rotating {
            0% {
              --r: 0deg;
            }
            100% {
              --r: 360deg;
            }
          }
          .reset-button {
            background-color: #6B7280;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            transition: background-color 0.2s;
            margin-left: auto;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: bold;
            padding: 0.25rem 0.5rem;
            line-height: 1;
          }
          .reset-button:hover {
            background-color: #4B5563;
          }
          .reset-button:disabled {
            background-color: #6B7280;
            opacity: 0.5;
            cursor: not-allowed;
          }
          .clock-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes growIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .grow-in {
            animation: growIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes clockGrowIn {
            from {
              transform: scale(0.6);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .clock-grow-in {
            animation: clockGrowIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Elapsed Time Explorer</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
            onClick={handleReset}
            title="Reset interactive"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {/* Visual Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md overflow-hidden">
            <div className="relative w-[400px] h-[260px] bg-white">
              <div className="absolute left-[8%] top-[20%]">
                {showClock && (
                  <div className={isClockShrinking ? 'clock-shrink' : 'clock-grow-in'}>
                    <Clock 
                      hours={hasReachedTarget ? endTime.hours : (isMoving ? endTime.hours : startTime.hours)} 
                      minutes={hasReachedTarget ? endTime.minutes : (isMoving ? endTime.minutes : startTime.minutes)} 
                      isMoving={isButtonPressed} 
                    />
                  </div>
                )}
              </div>
              {showButton && (
                <div className={`glow-button ${isButtonShrinking ? 'simple-glow stopped' : 'simple-glow'}`}>
                  <button 
                    className={`explore-button select-none ${isButtonShrinking ? 'shrink-animation' : 'continue-animation'}`}
                    onClick={handleClick}
                    style={{ transformOrigin: 'center' }}
                  >
                    Click to Explore!
                  </button>
                </div>
              )}
              {showContinue && (
                <div className={`glow-button ${isContinueShrinking ? 'simple-glow stopped' : 'simple-glow'}`}>
                  <button 
                    className={`explore-button select-none ${isContinueShrinking ? 'shrink-animation' : 'continue-animation'}`}
                    onClick={handleContinue}
                    style={{ transformOrigin: 'center' }}
                  >
                    Continue
                  </button>
                </div>
              )}
              {showSecondContinue && (
                <div className={`glow-button ${isSecondButtonShrinking ? 'simple-glow stopped' : 'simple-glow'}`}>
                  <button 
                    className={`explore-button select-none ${isSecondButtonShrinking ? 'shrink-animation' : 'continue-animation'}`}
                    onClick={handleContinue}
                    style={{ transformOrigin: 'center' }}
                  >
                    Continue
                  </button>
                </div>
              )}
              {showEndTime && showFirstTimes && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[148px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'text-shrink' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    <span className="text-red-500 text-sm font-medium">
                      {`${endTime.hours % 12 || 12}:${String(endTime.minutes).padStart(2, '0')} ${endTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                  </div>
                </div>
              )}
              {showStartTime && showFirstTimes && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[123px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'text-shrink' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    <span className="text-blue-500 text-sm font-medium">
                      {`${startTime.hours % 12 || 12}:${String(startTime.minutes).padStart(2, '0')} ${startTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                  </div>
                </div>
              )}
              {isTimeMovingUp && showArrows && showArrow && (
                <div className={`absolute left-[205px] top-[118px] flex flex-col items-start gap-2 ${isArrowShrinking ? 'text-shrink' : 'arrow-fade-in'}`}>
                  <div className="ml-12">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#5750E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {isTimeMovingUp && show24HourTimes && (
                <div className="absolute left-[200px] transform -translate-x-1/2 top-[168px] flex flex-col items-center gap-2 text-animation">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    <span className="text-red-500 text-sm font-medium">
                      {`${endTime.hours}:${String(endTime.minutes).padStart(2, '0')} ${endTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                  </div>
                </div>
              )}
              {isTimeMovingUp && show24HourTimes && (
                <div className="absolute left-[200px] transform -translate-x-1/2 top-[143px] flex flex-col items-center gap-2 text-animation">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    <span className="text-blue-500 text-sm font-medium">
                      {`${startTime.hours}:${String(startTime.minutes).padStart(2, '0')} ${startTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Text Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md p-4 min-h-[55px] relative">
            {showText && (
              <div className={`text-sm text-gray-600 ${isContinueShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  <span className="font-bold text-black">Elapsed time</span> is the amount of time that passes between the <span className="text-blue-500">start</span> and <span className="text-red-500">end</span> of an event.
                </div>
              </div>
            )}
            
            {showExplanation && (
              <div className={`text-sm text-gray-600 ${isSecondTextShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  We can subtract the <span className="text-blue-500">start time</span> from the <span className="text-red-500">end time</span> to find the <span className="font-bold text-black">elapsed time</span>, but first we need to convert both times into a 24 hour format.  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElapsedTime;