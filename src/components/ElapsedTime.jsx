import React, { useState, useEffect } from 'react';

const Clock = ({ hours, minutes, isMoving = false, color = '#5750E3', size = 'normal' }) => {
  // Calculate total minutes for continuous rotation
  const totalMinutes = hours * 60 + minutes;
  const hourRotation = (totalMinutes / 60) * 30; // 30 degrees per hour
  const minuteRotation = totalMinutes * 6; // 6 degrees per minute
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  // Size configurations
  const sizes = {
    normal: {
      outer: 'w-[140px] h-[140px]',
      inner: 'w-[120px] h-[120px]',
      button: 'w-6 h-2',
      stem: 'w-1 h-2',
      border: 'border-4',
      numbers: 'text-sm',
      hourHand: 'w-[1.5px] h-10',
      minuteHand: 'w-[1.5px] h-12',
      centerDot: 'w-2.5 h-2.5',
      radius: 50
    },
    small: {
      outer: 'w-[105px] h-[105px]',
      inner: 'w-[90px] h-[90px]',
      button: 'w-5 h-1.5',
      stem: 'w-1 h-1.5',
      border: 'border-2',
      borderWidth: '3px',
      numbers: 'text-xs',
      hourHand: 'w-[1px] h-7.5',
      minuteHand: 'w-[1px] h-9',
      centerDot: 'w-2 h-2',
      radius: 37.5
    }
  };

  const config = sizes[size];

  return (
    <div className="flex flex-col items-center">
      {/* Stopwatch stem and button */}
      <div className="relative mb-0">
        <div className={`${config.button} rounded-full ${isMoving ? 'button-press-animation' : ''}`} style={{ backgroundColor: color, transition: 'background-color 0.1s ease-in-out 0.2s' }} /> {/* Button */}
        <div className={`${config.stem} mx-auto`} style={{ backgroundColor: color, transition: 'background-color 0.1s ease-in-out 0.2s' }} /> {/* Stem */}
      </div>
      <div className={`${config.outer} bg-white rounded-full ${config.border} flex items-center justify-center relative`} style={{ 
        borderColor: color, 
        borderWidth: config.borderWidth || '4px',
        transition: 'border-color 0.1s ease-in-out 0.2s' 
      }}>
        <div className={`${config.inner} rounded-full flex items-center justify-center relative`} style={{ backgroundColor: `${color}10`, transition: 'background-color 0.1s ease-in-out 0.2s' }}>
          {/* Clock numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const angle = (num * 30) - 90; // -90 to start at top
            const radius = config.radius; // Distance from center
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            return (
              <div
                key={num}
                className={`absolute ${config.numbers} font-medium`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transformOrigin: 'center',
                  color: color,
                  transition: 'color 0.1s ease-in-out 0.2s',
                }}
              >
                {num}
              </div>
            );
          })}
          
          {/* Hour hand */}
          <div
            className={`absolute ${config.hourHand} rounded-full`}
            style={{
              transform: `rotate(${hourRotation}deg)`,
              transformOrigin: 'bottom center',
              bottom: '50%',
              willChange: 'transform',
              transition: 'transform 200ms linear, background-color 0.1s ease-in-out 0.2s',
              backgroundColor: color,
            }}
          />
          
          {/* Minute hand */}
          <div
            className={`absolute ${config.minuteHand} rounded-full`}
            style={{
              transform: `rotate(${minuteRotation}deg)`,
              transformOrigin: 'bottom center',
              bottom: '50%',
              willChange: 'transform',
              transition: 'transform 200ms linear, background-color 0.1s ease-in-out 0.2s',
              backgroundColor: color,
            }}
          />
          
          {/* Center dot */}
          <div className={`absolute ${config.centerDot} rounded-full`} style={{ backgroundColor: color, transition: 'background-color 0.1s ease-in-out 0.2s' }} />
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
  const [is24HourTimesRising, setIs24HourTimesRising] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showElapsedTime, setShowElapsedTime] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showFinalContinue, setShowFinalContinue] = useState(false);
  const [isFinalTextShrinking, setIsFinalTextShrinking] = useState(false);
  const [isFinalButtonShrinking, setIsFinalButtonShrinking] = useState(false);
  const [hideUnderline, setHideUnderline] = useState(false);
  const [isElapsedTimeRising, setIsElapsedTimeRising] = useState(false);
  const [showCompletionText, setShowCompletionText] = useState(false);
  const [isClockShrinkingFinal, setIsClockShrinkingFinal] = useState(false);
  const [isClockMovingUp, setIsClockMovingUp] = useState(false);
  const [showSecondClock, setShowSecondClock] = useState(false);
  const [clocksColored, setClocksColored] = useState(false);
  const [startTimeInput, setStartTimeInput] = useState('1230');
  const [endTimeInput, setEndTimeInput] = useState('1305');
  const [startHoursInput, setStartHoursInput] = useState('12');
  const [startMinutesInput, setStartMinutesInput] = useState('30');
  const [endHoursInput, setEndHoursInput] = useState('13');
  const [endMinutesInput, setEndMinutesInput] = useState('05');
  const [isTextFadingOut, setIsTextFadingOut] = useState(false);
  const [isInputFadingIn, setIsInputFadingIn] = useState(false);
  const [isStartTimeMovingUp, setIsStartTimeMovingUp] = useState(false);
  const [isEndTimeMovingUp, setIsEndTimeMovingUp] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [startTimeAMPM, setStartTimeAMPM] = useState('AM');
  const [endTimeAMPM, setEndTimeAMPM] = useState('PM');

  // Function to format time input for display
  const formatTimeInput = (input) => {
    if (input.length >= 2) {
      return input.slice(0, 2) + ':' + input.slice(2);
    }
    return input;
  };

  // Function to parse time input
  const parseTimeInput = (input) => {
    const cleanInput = input.replace(':', '');
    if (cleanInput.length === 4) {
      const hours = parseInt(cleanInput.slice(0, 2));
      const minutes = parseInt(cleanInput.slice(2, 4));
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return { hours, minutes };
      }
    }
    return null;
  };

  // Function to handle time input changes
  const handleTimeInputChange = (input, setInput, setTime) => {
    const cleanInput = input.replace(/[^0-9]/g, '');
    if (cleanInput.length <= 4) {
      setInput(cleanInput);
      const parsedTime = parseTimeInput(cleanInput);
      if (parsedTime) {
        setTime(parsedTime);
      }
    }
  };

  // Function to handle hour input changes
  const handleHourInputChange = (value, setHoursInput, setTime, minutesInput, setAMPM) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue.length <= 2) {
      setHoursInput(cleanValue);
      const hours = parseInt(cleanValue) || 0;
      const minutes = parseInt(minutesInput) || 0;
      if (hours >= 0 && hours <= 23) {
        setTime({ hours, minutes });
        
        // Update AM/PM based on 24-hour time
        if (hours >= 12) {
          setAMPM('PM');
        } else {
          setAMPM('AM');
        }
      }
    }
  };

  // Function to handle minute input changes
  const handleMinuteInputChange = (value, setMinutesInput, setTime, hoursInput) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue.length <= 2) {
      setMinutesInput(cleanValue);
      const hours = parseInt(hoursInput) || 0;
      const minutes = parseInt(cleanValue) || 0;
      if (minutes >= 0 && minutes <= 59) {
        setTime({ hours, minutes });
      }
    }
  };

  // Function to toggle AM/PM and update time
  const toggleAMPM = (currentAMPM, setAMPM, hoursInput, minutesInput, setTime) => {
    const newAMPM = currentAMPM === 'AM' ? 'PM' : 'AM';
    setAMPM(newAMPM);
    
    const hours = parseInt(hoursInput) || 0;
    const minutes = parseInt(minutesInput) || 0;
    
    // Convert to 24-hour format
    let newHours = hours;
    if (newAMPM === 'PM' && hours !== 12) {
      newHours = hours + 12;
    } else if (newAMPM === 'AM' && hours === 12) {
      newHours = 0;
    }
    
    setTime({ hours: newHours, minutes });
  };

  // Function to calculate elapsed time
  const calculateElapsedTime = () => {
    const startHours = parseInt(startHoursInput) || 0;
    const startMinutes = parseInt(startMinutesInput) || 0;
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    if (startHours >= 0 && startHours <= 23 && startMinutes >= 0 && startMinutes <= 59 &&
        endHours >= 0 && endHours <= 23 && endMinutes >= 0 && endMinutes <= 59) {
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      const elapsedMinutes = Math.abs(endTotalMinutes - startTotalMinutes);
      const hours = Math.floor(elapsedMinutes / 60);
      const minutes = elapsedMinutes % 60;
      return { hours, minutes };
    }
    return { hours: 0, minutes: 35 }; // Default fallback
  };

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
      setIsFirstTimesShrinking(true);
      setIsArrowShrinking(true);
      
      setTimeout(() => {
        setShowSecondExplanation(false);
        setShowSecondContinue(false);
        setShowExplanation(false);
        setShowArrow(false);
        setShowFirstTimes(false);
        setIs24HourTimesRising(true);
        setTimeout(() => {
          setShowUnderline(true);
          setTimeout(() => {
            setShowElapsedTime(true);
            setTimeout(() => {
              setShowFinalText(true);
              setTimeout(() => {
                setShowFinalContinue(true);
              }, 1000);
            }, 1000);
          }, 500);
        }, 500);
      }, 500);
    } else if (showFinalContinue) {
      setIsFinalTextShrinking(true);
      setIsFinalButtonShrinking(true);
      setIsClockShrinkingFinal(true);
      setTimeout(() => {
        setIsClockMovingUp(true);
        setTimeout(() => {
          setShowSecondClock(true);
          setTimeout(() => {
            setClocksColored(true);
            // Trigger input animation first
            setIsInputFadingIn(true);
            // Trigger container movement animations
            setIsStartTimeMovingUp(true);
            setIsEndTimeMovingUp(true);
            // Set inputs as shown
            setShowInputs(true);
            setTimeout(() => {
              // Then trigger text fade out
              setIsTextFadingOut(true);
            }, 400);
          }, 200);
          setTimeout(() => {
            setShowFinalText(false);
            setShowFinalContinue(false);
            setTimeout(() => {
              setShowCompletionText(true);
            }, 500);
          }, 800);
        }, 500);
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
    setIs24HourTimesRising(false);
    setShowUnderline(false);
    setShowElapsedTime(false);
    setShowFinalText(false);
    setShowFinalContinue(false);
    setIsFinalTextShrinking(false);
    setIsFinalButtonShrinking(false);
    setHideUnderline(false);
    setIsElapsedTimeRising(false);
    setShowCompletionText(false);
    setIs24HourTimesRising(false);
    setIsClockShrinkingFinal(false);
    setIsClockMovingUp(false);
    setShowSecondClock(false);
    setClocksColored(false);
    setStartTimeInput('1230');
    setEndTimeInput('1305');
    setStartHoursInput('12');
    setStartMinutesInput('30');
    setEndHoursInput('13');
    setEndMinutesInput('05');
    setIsTextFadingOut(false);
    setIsInputFadingIn(false);
    setIsStartTimeMovingUp(false);
    setIsEndTimeMovingUp(false);
    setShowInputs(false);
    setStartTimeAMPM('AM');
    setEndTimeAMPM('PM');
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
            transform-origin: center;
          }
          @keyframes growInLine {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
          .grow-in-line {
            animation: growInLine 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform-origin: left;
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
          @keyframes shiftRight {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(7px);
            }
          }
          .shift-right {
            animation: shiftRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes shrinkOut {
            from {
              transform: scaleX(1);
              opacity: 1;
            }
            to {
              transform: scaleX(0);
              opacity: 0;
            }
          }
          .shrink-out {
            animation: shrinkOut 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes riseUp {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(1px, -17px);
            }
          }
          .rise-up {
            animation: riseUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes clockShrinkFinal {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(0.75);
            }
          }
          .clock-shrink-final {
            animation: clockShrinkFinal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes clockMoveUp {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(-32px, -60px);
            }
          }
          .clock-move-up {
            animation: clockMoveUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes secondClockFadeIn {
            from {
              opacity: 0;
              transform: scale(0.6);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .second-clock-fade-in {
            animation: secondClockFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes fadeInInput {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .fade-in-input {
            animation: fadeInInput 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes fadeOutText {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.8);
            }
          }
          .fade-out-text {
            animation: fadeOutText 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .input-transition {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes moveStartTimeUp {
            0% {
              transform: translateY(-50px);
            }
            100% {
              transform: translateY(-65px);
            }
          }
          .move-start-time-up {
            animation: moveStartTimeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveEndTimeUp {
            0% {
              transform: translateY(-50px);
            }
            100% {
              transform: translateY(-55px);
            }
          }
          .move-end-time-up {
            animation: moveEndTimeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
              <div className={`absolute left-[8%] top-[20%] ${isClockMovingUp ? 'clock-move-up' : ''}`}>
                {showClock && (
                  <div className={`${isClockShrinking ? 'clock-shrink' : isClockShrinkingFinal ? 'clock-shrink-final' : 'clock-grow-in'}`}>
                    <Clock 
                      hours={isClockMovingUp ? startTime.hours : (hasReachedTarget ? endTime.hours : (isMoving ? endTime.hours : startTime.hours))} 
                      minutes={isClockMovingUp ? startTime.minutes : (hasReachedTarget ? endTime.minutes : (isMoving ? endTime.minutes : startTime.minutes))} 
                      isMoving={isButtonPressed} 
                      color={clocksColored ? '#3B82F6' : '#5750E3'}
                    />
                  </div>
                )}
              </div>
              {showSecondClock && (
                <div className="absolute left-[4%] top-[52%] second-clock-fade-in">
                  <Clock 
                    hours={endTime.hours} 
                    minutes={endTime.minutes} 
                    isMoving={false} 
                    color={clocksColored ? '#EF4444' : '#5750E3'}
                    size="small"
                  />
                </div>
              )}
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
              {showFinalContinue && (
                <div className={`glow-button ${isFinalButtonShrinking ? 'simple-glow stopped' : 'simple-glow'}`}>
                  <button 
                    className={`explore-button select-none ${isFinalButtonShrinking ? 'shrink-animation' : 'continue-animation'}`}
                    onClick={handleContinue}
                    style={{ transformOrigin: 'center' }}
                  >
                    Continue
                  </button>
                </div>
              )}
              {showEndTime && showFirstTimes && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[148px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'text-shrink' : ''} ${isEndTimeMovingUp ? 'move-end-time-up' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    {clocksColored ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={endHoursInput}
                          onChange={(e) => handleHourInputChange(e.target.value, setEndHoursInput, setEndTime, endMinutesInput, setEndTimeAMPM)}
                          className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="HH"
                        />
                        <span className={`text-red-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                        <input
                          type="text"
                          value={endMinutesInput}
                          onChange={(e) => handleMinuteInputChange(e.target.value, setEndMinutesInput, setEndTime, endHoursInput)}
                          className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="MM"
                        />
                        <button
                          onClick={() => toggleAMPM(endTimeAMPM, setEndTimeAMPM, endHoursInput, endMinutesInput, setEndTime)}
                          className={`text-red-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                        >
                          {endTimeAMPM}
                        </button>
                      </div>
                    ) : (
                      <span className={`text-red-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                        {`${endTime.hours % 12 || 12}:${String(endTime.minutes).padStart(2, '0')} ${endTime.hours >= 12 ? 'PM' : 'AM'}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {showStartTime && showFirstTimes && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[123px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'text-shrink' : ''} ${isStartTimeMovingUp ? 'move-start-time-up' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    {clocksColored ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={startHoursInput}
                          onChange={(e) => handleHourInputChange(e.target.value, setStartHoursInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          }, startMinutesInput, setStartTimeAMPM)}
                          className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="HH"
                        />
                        <span className={`text-blue-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                        <input
                          type="text"
                          value={startMinutesInput}
                          onChange={(e) => handleMinuteInputChange(e.target.value, setStartMinutesInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          }, startHoursInput)}
                          className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="MM"
                        />
                        <button
                          onClick={() => toggleAMPM(startTimeAMPM, setStartTimeAMPM, startHoursInput, startMinutesInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          })}
                          className={`text-blue-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                        >
                          {startTimeAMPM}
                        </button>
                      </div>
                    ) : (
                      <span className={`text-blue-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                        {`${startTime.hours % 12 || 12}:${String(startTime.minutes).padStart(2, '0')} ${startTime.hours >= 12 ? 'PM' : 'AM'}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {isTimeMovingUp && showArrows && showArrow && (
                <div className={`absolute left-[205px] top-[168px] flex flex-col items-start gap-2 ${isTimeMovingUp ? 'move-to-top' : 'arrow-fade-in'} ${isArrowShrinking ? 'text-shrink' : ''}`}>
                  <div className="ml-12">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#5750E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
              {isTimeMovingUp && show24HourTimes && (
                <div className={`absolute left-[200px] transform -translate-x-1/2 top-[168px] flex flex-col items-center gap-2 ${is24HourTimesRising ? 'move-to-top' : 'text-animation'} ${isEndTimeMovingUp ? 'move-end-time-up' : ''}`}>
                  <div className={`flex items-center gap-2 ${showUnderline && !hideUnderline ? 'shift-right' : ''}`}>
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    {clocksColored ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={endHoursInput}
                          onChange={(e) => handleHourInputChange(e.target.value, setEndHoursInput, setEndTime, endMinutesInput, setEndTimeAMPM)}
                          className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="HH"
                        />
                        <span className={`text-red-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                        <input
                          type="text"
                          value={endMinutesInput}
                          onChange={(e) => handleMinuteInputChange(e.target.value, setEndMinutesInput, setEndTime, endHoursInput)}
                          className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="MM"
                        />
                        <button
                          onClick={() => toggleAMPM(endTimeAMPM, setEndTimeAMPM, endHoursInput, endMinutesInput, setEndTime)}
                          className={`text-red-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                        >
                          {endTimeAMPM}
                        </button>
                      </div>
                    ) : (
                      <span className={`text-red-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                        {`${endTime.hours}:${String(endTime.minutes).padStart(2, '0')}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {showUnderline && (
                <>
                  <div className={`absolute left-[200px] transform -translate-x-1/2 top-[148px] h-[2px] bg-[#5750E3] ${hideUnderline ? 'shrink-out' : 'grow-in-line'}`} style={{ width: showInputs ? '160px' : '135px' }} />
                  <div className={`absolute left-[185px] top-[128px] w-[8px] h-[2px] bg-[#5750E3] ${hideUnderline ? 'shrink-out' : 'grow-in-line'}`} />
                </>
              )}
              {isTimeMovingUp && show24HourTimes && (
                <div className={`absolute left-[200px] transform -translate-x-1/2 top-[143px] flex flex-col items-center gap-2 ${is24HourTimesRising ? 'move-to-top' : 'text-animation'} ${isStartTimeMovingUp ? 'move-start-time-up' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    {clocksColored ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={startHoursInput}
                          onChange={(e) => handleHourInputChange(e.target.value, setStartHoursInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          }, startMinutesInput, setStartTimeAMPM)}
                          className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="HH"
                        />
                        <span className={`text-blue-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                        <input
                          type="text"
                          value={startMinutesInput}
                          onChange={(e) => handleMinuteInputChange(e.target.value, setStartMinutesInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          }, startHoursInput)}
                          className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                          maxLength={2}
                          placeholder="MM"
                        />
                        <button
                          onClick={() => toggleAMPM(startTimeAMPM, setStartTimeAMPM, startHoursInput, startMinutesInput, (newTime) => {
                            // Update the static startTime reference
                            startTime.hours = newTime.hours;
                            startTime.minutes = newTime.minutes;
                          })}
                          className={`text-blue-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                        >
                          {startTimeAMPM}
                        </button>
                      </div>
                    ) : (
                      <span className={`text-blue-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                        {`${startTime.hours}:${String(startTime.minutes).padStart(2, '0')}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {showElapsedTime && (
                <div className={`absolute left-[199px] transform -translate-x-1/2 top-[160px] text-[#5750E3] text-sm font-medium ${isElapsedTimeRising ? 'rise-up' : 'fade-in-down'}`}>
                  Elapsed Time: {calculateElapsedTime().hours}h {calculateElapsedTime().minutes}m
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

            {showFinalText && (
              <div className={`text-sm text-gray-600 ${isFinalTextShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  After subtracting, we make sure to take the absolute value of the result since there can be no negative time.
                </div>
              </div>
            )}

            {showCompletionText && (
              <div className="text-sm text-gray-600 fade-in-down text-center">
                <div>
                  Enter other start and end times to find their <span className="font-bold text-black">elapsed time!</span>
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