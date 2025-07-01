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
      border: 'border-2',
      borderWidth: '3px',
      numbers: 'text-xs',
      hourHand: 'w-[1px] h-[30px]',
      minuteHand: 'w-[1px] h-9',
      centerDot: 'w-2 h-2',
      radius: 37.5
    }
  };

  const config = sizes[size];

  return (
    <div className="flex flex-col items-center">
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
  const [isEndTimeRising, setIsEndTimeRising] = useState(false);
  const [isStartTimeRising, setIsStartTimeRising] = useState(false);
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
  const [endHoursInput, setEndHoursInput] = useState('1');
  const [endMinutesInput, setEndMinutesInput] = useState('05');
  const [isTextFadingOut, setIsTextFadingOut] = useState(false);
  const [isInputFadingIn, setIsInputFadingIn] = useState(false);
  const [isStartTimeMovingUp, setIsStartTimeMovingUp] = useState(false);
  const [isEndTimeMovingUp, setIsEndTimeMovingUp] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [startTimeAMPM, setStartTimeAMPM] = useState('PM');
  const [endTimeAMPM, setEndTimeAMPM] = useState('PM');
  const [isStartTimeMovingLeft, setIsStartTimeMovingLeft] = useState(false);
  const [isEndTimeMovingLeft, setIsEndTimeMovingLeft] = useState(false);
  const [isUnderlineMovingLeft, setIsUnderlineMovingLeft] = useState(false);
  const [isElapsedTimeMovingLeft, setIsElapsedTimeMovingLeft] = useState(false);
  const [isInputsDirty, setIsInputsDirty] = useState(false);
  const [showSolveButton, setShowSolveButton] = useState(false);
  const [isInputsAnimatingToText, setIsInputsAnimatingToText] = useState(false);
  const [showStartTimeText, setShowStartTimeText] = useState(false);
  const [showEndTimeText, setShowEndTimeText] = useState(false);
  const [showStartTimePlus12, setShowStartTimePlus12] = useState(false);
  const [showEndTimePlus12, setShowEndTimePlus12] = useState(false);
  const [showStartTime24Hour, setShowStartTime24Hour] = useState(false);
  const [showEndTime24Hour, setShowEndTime24Hour] = useState(false);
  const [isStartTimeAnimating, setIsStartTimeAnimating] = useState(false);
  const [isEndTimeAnimating, setIsEndTimeAnimating] = useState(false);
  const [startTimeAnimationStep, setStartTimeAnimationStep] = useState(0);
  const [endTimeAnimationStep, setEndTimeAnimationStep] = useState(0);
  const [isInputsMovingLeft, setIsInputsMovingLeft] = useState(false);
  const [isStartTimeTextGrowing, setIsStartTimeTextGrowing] = useState(false);
  const [isEndTimeTextGrowing, setIsEndTimeTextGrowing] = useState(false);
  const [isStartTimePlus12Growing, setIsStartTimePlus12Growing] = useState(false);
  const [isEndTimePlus12Growing, setIsEndTimePlus12Growing] = useState(false);
  const [isStartTimePlus12MovingLeft, setIsStartTimePlus12MovingLeft] = useState(false);
  const [isEndTimePlus12MovingLeft, setIsEndTimePlus12MovingLeft] = useState(false);
  const [bothTimesIn24HourFormat, setBothTimesIn24HourFormat] = useState(false);
  const [showEndTimePlus24, setShowEndTimePlus24] = useState(false);
  const [isEndTimePlus24Growing, setIsEndTimePlus24Growing] = useState(false);
  const [isEndTimePlus24MovingLeft, setIsEndTimePlus24MovingLeft] = useState(false);
  const [endTimePlus24AnimationStep, setEndTimePlus24AnimationStep] = useState(0);
  const [isEndTimePlus24Animating, setIsEndTimePlus24Animating] = useState(false);
  const [has24TextFadedOut, setHas24TextFadedOut] = useState(false);
  const [showEndTimeAfter12Hours, setShowEndTimeAfter12Hours] = useState(false);
  const [isElapsedTimeFadingOut, setIsElapsedTimeFadingOut] = useState(false);
  const [showElapsedTimeAnswer, setShowElapsedTimeAnswer] = useState(false);
  const [isElapsedTimeFadingIn, setIsElapsedTimeFadingIn] = useState(false);
  const [showNewSolveButton, setShowNewSolveButton] = useState(false);
  const [isInputsReenabled, setIsInputsReenabled] = useState(false);
  const [isNewSolveButtonGrowing, setIsNewSolveButtonGrowing] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);


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
      let hours = parseInt(cleanValue) || 0;
      const minutes = parseInt(minutesInput) || 0;
      
      // Auto-correct maximum immediately while typing
      if (hours > 12) {
        hours = 12;
        const correctedValue = hours.toString();
        setHoursInput(correctedValue);
      } else {
        setHoursInput(cleanValue);
      }
      
      // Only update clock if input is valid (not empty and within range)
      if (hours >= 1 && hours <= 12) {
        setTime({ hours, minutes });
        
        // Don't automatically update AM/PM - let user control it manually
      }
      
      // Mark inputs as dirty and show solve button
      setIsInputsDirty(true);
      setShowSolveButton(true);
      // Reset elapsed time to question marks when input changes
      setShowElapsedTimeAnswer(false);
    }
  };

  // Function to handle hour input blur (when user deselects)
  const handleHourInputBlur = (value, setHoursInput, setTime, minutesInput, setAMPM) => {
    let hours = parseInt(value) || 0;
    const minutes = parseInt(minutesInput) || 0;
    
    // Auto-correct to minimum if empty or below minimum
    if (hours < 1) hours = 1;
    if (hours > 12) hours = 12;
    
    const correctedValue = hours.toString();
    setHoursInput(correctedValue);
    setTime({ hours, minutes });
    
    // Don't automatically update AM/PM - let user control it manually
  };

  // Function to handle minute input changes
  const handleMinuteInputChange = (value, setMinutesInput, setTime, hoursInput) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (cleanValue.length <= 2) {
      let minutes = parseInt(cleanValue) || 0;
      const hours = parseInt(hoursInput) || 0;
      
      // Auto-correct maximum immediately while typing
      if (minutes > 59) {
        minutes = 59;
        const correctedValue = minutes.toString().padStart(2, '0');
        setMinutesInput(correctedValue);
      } else {
        setMinutesInput(cleanValue);
      }
      
      // Only update clock if input is valid (not empty and within range)
      if (minutes >= 0 && minutes <= 59 && hours >= 1 && hours <= 12) {
        setTime({ hours, minutes });
      }
      
      // Mark inputs as dirty and show solve button
      setIsInputsDirty(true);
      setShowSolveButton(true);
      // Reset elapsed time to question marks when input changes
      setShowElapsedTimeAnswer(false);
    }
  };

  // Function to handle minute input blur (when user deselects)
  const handleMinuteInputBlur = (value, setMinutesInput, setTime, hoursInput) => {
    let minutes = parseInt(value) || 0;
    const hours = parseInt(hoursInput) || 0;
    
    // Auto-correct to minimum if empty or below minimum
    if (minutes < 0) minutes = 0;
    if (minutes > 59) minutes = 59;
    
    const correctedValue = minutes.toString().padStart(2, '0');
    setMinutesInput(correctedValue);
    setTime({ hours, minutes });
  };

  // Function to toggle AM/PM and update time
  const toggleAMPM = (currentAMPM, setAMPM, hoursInput, minutesInput, setTime) => {
    const newAMPM = currentAMPM === 'AM' ? 'PM' : 'AM';
    setAMPM(newAMPM);
    
    // Don't update the time state - AM/PM is just a display format
    // The elapsed time calculation will handle the conversion when needed
    
    // Mark inputs as dirty and show solve button
    setIsInputsDirty(true);
    setShowSolveButton(true);
    // Reset elapsed time to question marks when AM/PM changes
    setShowElapsedTimeAnswer(false);
  };

  // Function to check if end time is before start time (crossing midnight)
  const needs24MoreHours = () => {
    const startHours = parseInt(startHoursInput) || 0;
    const startMinutes = parseInt(startMinutesInput) || 0;
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    if (startHours >= 1 && startHours <= 12 && startMinutes >= 0 && startMinutes <= 59 &&
        endHours >= 1 && endHours <= 12 && endMinutes >= 0 && endMinutes <= 59) {
      
      // Convert 12-hour format to 24-hour format for comparison
      let start24Hours = startHours;
      if (startTimeAMPM === 'PM' && startHours !== 12) {
        start24Hours = startHours + 12;
      } else if (startTimeAMPM === 'AM' && startHours === 12) {
        start24Hours = 0;
      }
      
      let end24Hours = endHours;
      if (endTimeAMPM === 'PM' && endHours !== 12) {
        end24Hours = endHours + 12;
      } else if (endTimeAMPM === 'AM' && endHours === 12) {
        end24Hours = 0;
      }
      
      const startTotalMinutes = start24Hours * 60 + startMinutes;
      const endTotalMinutes = end24Hours * 60 + endMinutes;
      
      // If end time is before start time, we need to add 24 hours
      return endTotalMinutes < startTotalMinutes;
    }
    return false;
  };

  const handleSolve = () => {
    // Keep isInputsDirty as true to not show the elapsed time answer
    // setIsInputsDirty(false);
    setShowSolveButton(false);
    setIsInputsAnimatingToText(true);
    
    // Determine if we need to show "+12 hours" for each time
    const startHours = parseInt(startHoursInput) || 0;
    const endHours = parseInt(endHoursInput) || 0;
    
    // Show "+12 hours" for start time if it's PM but not 12 PM (12 PM stays as 12)
    setShowStartTimePlus12(startTimeAMPM === 'PM' && startHours !== 12);
    
    // Show "+12 hours" for end time if it's PM but not 12 PM (12 PM stays as 12)
    setShowEndTimePlus12(endTimeAMPM === 'PM' && endHours !== 12);
    
    // Start the animation sequence - end time first, then start time
    setTimeout(() => {
      setShowEndTimeText(true);
      setIsEndTimeTextGrowing(true);
      setTimeout(() => {
        setShowStartTimeText(true);
        setIsStartTimeTextGrowing(true);
        
        // After the time text appears, show 24-hour format times with delay
        setTimeout(() => {
          // Don't set 24-hour format flags immediately - wait for animations to complete
          
          // Check if any time needs +12 hour conversion
          const needsStartConversion = startTimeAMPM === 'PM' && startHours !== 12;
          const needsEndConversion = endTimeAMPM === 'PM' && endHours !== 12;
          const hasAnyConversion = needsStartConversion || needsEndConversion;
          
          // Calculate dynamic delays based on what animations are needed
          const endTimeConversionDelay = needsEndConversion ? 1200 : 500; // +12 animation takes ~1200ms, no conversion takes 500ms
          const startTimeConversionDelay = needsStartConversion ? 1200 : 500;
          const plus24Delay = needs24MoreHours() ? 1200 : 0; // +24 animation takes ~1200ms
          
          // Track when both times are in 24-hour format
          let startTimeComplete = false;
          let endTimeComplete = false;
          
          // Start with end time conversion first
          if (needsEndConversion) {
            setIsEndTimePlus12Growing(true);
            // Wait for grow-in animation, then start left movement
            setTimeout(() => {
              setIsEndTimePlus12Growing(false);
              setIsEndTimePlus12MovingLeft(true);
              // Wait for left movement, then start hour animation
              setTimeout(() => {
                setIsEndTimeAnimating(true);
                // Start gradual animation for end time
                let step = 0;
                const endInterval = setInterval(() => {
                  step++;
                  setEndTimeAnimationStep(step);
                  if (step >= 12) {
                    clearInterval(endInterval);
                    setIsEndTimeAnimating(false);
                    setShowEndTimeAfter12Hours(true);
                    // Don't set showEndTime24Hour here - wait until after +24 animation if needed
                    endTimeComplete = true;
                    
                    // Now start start time conversion after end time is complete
                    setTimeout(() => {
                      if (needsStartConversion) {
                        setIsStartTimePlus12Growing(true);
                        // Wait for grow-in animation, then start left movement
                        setTimeout(() => {
                          setIsStartTimePlus12Growing(false);
                          setIsStartTimePlus12MovingLeft(true);
                          // Wait for left movement, then start hour animation
                          setTimeout(() => {
                            setIsStartTimeAnimating(true);
                            // Start gradual animation for start time
                            let step = 0;
                            const startInterval = setInterval(() => {
                              step++;
                              setStartTimeAnimationStep(step);
                              if (step >= 12) {
                                clearInterval(startInterval);
                                setIsStartTimeAnimating(false);
                                setShowStartTime24Hour(true);
                                startTimeComplete = true;
                                
                                // Now check if we need to add 24 more hours for midnight crossing
                                if (needs24MoreHours()) {
                                  setTimeout(() => {
                                    setShowEndTimePlus24(true);
                                    setIsEndTimePlus24Growing(true);
                                    setTimeout(() => {
                                      setIsEndTimePlus24Growing(false);
                                      setIsEndTimePlus24MovingLeft(true);
                                      // Wait for the +24 text to fade out (500ms), then start the +24 animation
                                      setTimeout(() => {
                                        setHas24TextFadedOut(true);
                                        setIsEndTimePlus24Animating(true);
                                        let plus24Step = 0;
                                        const plus24Interval = setInterval(() => {
                                          plus24Step++;
                                          setEndTimePlus24AnimationStep(plus24Step);
                                          if (plus24Step >= 24) {
                                            clearInterval(plus24Interval);
                                            setIsEndTimePlus24Animating(false);
                                            // Now set the end time to 24-hour format after +24 animation completes
                                            setShowEndTime24Hour(true);
                                            setBothTimesIn24HourFormat(true);
                                            // Trigger elapsed time animation after both times finish
                                            setTimeout(() => {
                                              setIsElapsedTimeFadingOut(true);
                                              setTimeout(() => {
                                                setShowElapsedTimeAnswer(true);
                                                setIsElapsedTimeFadingIn(true);
                                                // After showing the answer, re-enable inputs for new calculations
                                                setTimeout(() => {
                                                  reenableInputs();
                                                }, 2000); // Increased from 1000ms to 2000ms
                                              }, 400); // 400ms fade out
                                            }, 800); // Increased from 400ms to 800ms
                                          }
                                        }, 100);
                                      }, 600); // Wait for +24 text to fade out completely
                                    }, 600);
                                  }, 300);
                                } else {
                                  // If no +24 needed, set end time to 24-hour format now
                                  setShowEndTime24Hour(true);
                                  setBothTimesIn24HourFormat(true);
                                  // Trigger elapsed time animation after both times finish
                                  setTimeout(() => {
                                    setIsElapsedTimeFadingOut(true);
                                    setTimeout(() => {
                                      setShowElapsedTimeAnswer(true);
                                      setIsElapsedTimeFadingIn(true);
                                      // After showing the answer, re-enable inputs for new calculations
                                      setTimeout(() => {
                                        reenableInputs();
                                      }, 2000); // Increased from 1000ms to 2000ms
                                    }, 400); // 400ms fade out
                                  }, 800); // Increased from 400ms to 800ms
                                }
                              }
                            }, 100); // 100ms between each increment
                          }, 600); // Wait for grow-in animation + delay
                        }, 600); // Wait for grow-in animation + delay
                      } else {
                        // For start times that don't need conversion
                        setShowStartTime24Hour(true);
                        startTimeComplete = true;
                        
                        // Now check if we need to add 24 more hours for midnight crossing
                        if (needs24MoreHours()) {
                          setTimeout(() => {
                            setShowEndTimePlus24(true);
                            setIsEndTimePlus24Growing(true);
                            setTimeout(() => {
                              setIsEndTimePlus24Growing(false);
                              setIsEndTimePlus24MovingLeft(true);
                              // Wait for the +24 text to fade out (500ms), then start the +24 animation
                              setTimeout(() => {
                                setHas24TextFadedOut(true);
                                setIsEndTimePlus24Animating(true);
                                let plus24Step = 0;
                                const plus24Interval = setInterval(() => {
                                  plus24Step++;
                                  setEndTimePlus24AnimationStep(plus24Step);
                                  if (plus24Step >= 24) {
                                    clearInterval(plus24Interval);
                                    setIsEndTimePlus24Animating(false);
                                    // Now set the end time to 24-hour format after +24 animation completes
                                    setShowEndTime24Hour(true);
                                    setBothTimesIn24HourFormat(true);
                                    // Trigger elapsed time animation after both times finish
                                    setTimeout(() => {
                                      setIsElapsedTimeFadingOut(true);
                                      setTimeout(() => {
                                        setShowElapsedTimeAnswer(true);
                                        setIsElapsedTimeFadingIn(true);
                                        // After showing the answer, re-enable inputs for new calculations
                                        setTimeout(() => {
                                          reenableInputs();
                                        }, 2000); // Increased from 1000ms to 2000ms
                                      }, 400); // 400ms fade out
                                    }, 800); // Increased from 400ms to 800ms
                                  }
                                }, 100);
                              }, 600); // Wait for +24 text to fade out completely
                            }, 600);
                          }, 300);
                        } else {
                          // If no +24 needed, set end time to 24-hour format now
                          setShowEndTime24Hour(true);
                          setBothTimesIn24HourFormat(true);
                          // Trigger elapsed time animation after both times finish
                          setTimeout(() => {
                            setIsElapsedTimeFadingOut(true);
                            setTimeout(() => {
                              setShowElapsedTimeAnswer(true);
                              setIsElapsedTimeFadingIn(true);
                              // After showing the answer, re-enable inputs for new calculations
                              setTimeout(() => {
                                reenableInputs();
                              }, 2000); // Increased from 1000ms to 2000ms
                            }, 400); // 400ms fade out
                          }, 800); // Increased from 400ms to 800ms
                        }
                      }
                    }, 300); // 300ms delay between end time and start time conversions
                  }
                }, 100); // 100ms between each increment
              }, 600); // Wait for grow-in animation + delay
            }, 600); // Wait for grow-in animation + delay
          } else {
            // For end times that don't need conversion, check if we need +24 hours
            if (needs24MoreHours()) {
              setTimeout(() => {
                // Don't set showEndTime24Hour here - wait until after +24 animation
                endTimeComplete = true;
                
                // Now start start time conversion after end time is complete
                setTimeout(() => {
                  if (needsStartConversion) {
                    setIsStartTimePlus12Growing(true);
                    // Wait for grow-in animation, then start left movement
                    setTimeout(() => {
                      setIsStartTimePlus12Growing(false);
                      setIsStartTimePlus12MovingLeft(true);
                      // Wait for left movement, then start hour animation
                      setTimeout(() => {
                        setIsStartTimeAnimating(true);
                        // Start gradual animation for start time
                        let step = 0;
                        const startInterval = setInterval(() => {
                          step++;
                          setStartTimeAnimationStep(step);
                          if (step >= 12) {
                            clearInterval(startInterval);
                            setIsStartTimeAnimating(false);
                            setShowStartTime24Hour(true);
                            startTimeComplete = true;
                            
                            // Now add 24 more hours for midnight crossing
                            setTimeout(() => {
                              setShowEndTimePlus24(true);
                              setIsEndTimePlus24Growing(true);
                              setTimeout(() => {
                                setIsEndTimePlus24Growing(false);
                                setIsEndTimePlus24MovingLeft(true);
                                // Wait for the +24 text to fade out (500ms), then start the +24 animation
                                setTimeout(() => {
                                  setHas24TextFadedOut(true);
                                  setIsEndTimePlus24Animating(true);
                                  let plus24Step = 0;
                                  const plus24Interval = setInterval(() => {
                                    plus24Step++;
                                    setEndTimePlus24AnimationStep(plus24Step);
                                    if (plus24Step >= 24) {
                                      clearInterval(plus24Interval);
                                      setIsEndTimePlus24Animating(false);
                                      // Now set the end time to 24-hour format after +24 animation completes
                                      setShowEndTime24Hour(true);
                                      setBothTimesIn24HourFormat(true);
                                      // Trigger elapsed time animation after both times finish
                                      setTimeout(() => {
                                        setIsElapsedTimeFadingOut(true);
                                        setTimeout(() => {
                                          setShowElapsedTimeAnswer(true);
                                          setIsElapsedTimeFadingIn(true);
                                          // After showing the answer, re-enable inputs for new calculations
                                          setTimeout(() => {
                                            reenableInputs();
                                          }, 2000); // Increased from 1000ms to 2000ms
                                        }, 400); // 400ms fade out
                                      }, 800); // Increased from 400ms to 800ms
                                    }
                                  }, 100);
                                }, 600); // Wait for +24 text to fade out completely
                              }, 600);
                            }, 300);
                          }
                        }, 100); // 100ms between each increment
                      }, 600); // Wait for grow-in animation + delay
                    }, 600); // Wait for grow-in animation + delay
                  } else {
                    // For start times that don't need conversion
                    setShowStartTime24Hour(true);
                    startTimeComplete = true;
                    
                    // Now add 24 more hours for midnight crossing
                    setTimeout(() => {
                      setShowEndTimePlus24(true);
                      setIsEndTimePlus24Growing(true);
                      setTimeout(() => {
                        setIsEndTimePlus24Growing(false);
                        setIsEndTimePlus24MovingLeft(true);
                        // Wait for the +24 text to fade out (500ms), then start the +24 animation
                        setTimeout(() => {
                          setHas24TextFadedOut(true);
                          setIsEndTimePlus24Animating(true);
                          let plus24Step = 0;
                          const plus24Interval = setInterval(() => {
                            plus24Step++;
                            setEndTimePlus24AnimationStep(plus24Step);
                            if (plus24Step >= 24) {
                              clearInterval(plus24Interval);
                              setIsEndTimePlus24Animating(false);
                              // Now set the end time to 24-hour format after +24 animation completes
                              setShowEndTime24Hour(true);
                              setBothTimesIn24HourFormat(true);
                              // Trigger elapsed time animation after both times finish
                              setTimeout(() => {
                                setIsElapsedTimeFadingOut(true);
                                setTimeout(() => {
                                  setShowElapsedTimeAnswer(true);
                                  setIsElapsedTimeFadingIn(true);
                                  // After showing the answer, re-enable inputs for new calculations
                                  setTimeout(() => {
                                    reenableInputs();
                                  }, 2000); // Increased from 1000ms to 2000ms
                                }, 400); // 400ms fade out
                              }, 800); // Increased from 400ms to 800ms
                            }
                          }, 100);
                        }, 600); // Wait for +24 text to fade out completely
                      }, 600);
                    }, 300);
                  }
                }, 300); // 300ms delay between end time and start time conversions
              }, 500); // Use shorter delay when no end time conversion needed
            } else {
              // For end times that don't need conversion, wait for the appropriate time
              setTimeout(() => {
                setShowEndTime24Hour(true);
                endTimeComplete = true;
                
                // Now start start time conversion after end time is complete
                setTimeout(() => {
                  if (needsStartConversion) {
                    setIsStartTimePlus12Growing(true);
                    // Wait for grow-in animation, then start left movement
                    setTimeout(() => {
                      setIsStartTimePlus12Growing(false);
                      setIsStartTimePlus12MovingLeft(true);
                      // Wait for left movement, then start hour animation
                      setTimeout(() => {
                        setIsStartTimeAnimating(true);
                        // Start gradual animation for start time
                        let step = 0;
                        const startInterval = setInterval(() => {
                          step++;
                          setStartTimeAnimationStep(step);
                          if (step >= 12) {
                            clearInterval(startInterval);
                            setIsStartTimeAnimating(false);
                            setShowStartTime24Hour(true);
                            startTimeComplete = true;
                            setBothTimesIn24HourFormat(true);
                            // Trigger elapsed time animation after both times finish
                            setTimeout(() => {
                              setIsElapsedTimeFadingOut(true);
                              setTimeout(() => {
                                setShowElapsedTimeAnswer(true);
                                setIsElapsedTimeFadingIn(true);
                                // After showing the answer, re-enable inputs for new calculations
                                setTimeout(() => {
                                  reenableInputs();
                                }, 2000); // Increased from 1000ms to 2000ms
                              }, 400); // 400ms fade out
                            }, 800); // Increased from 400ms to 800ms
                          }
                        }, 100); // 100ms between each increment
                      }, 600); // Wait for grow-in animation + delay
                    }, 600); // Wait for grow-in animation + delay
                  } else {
                    // For start times that don't need conversion
                    setShowStartTime24Hour(true);
                    startTimeComplete = true;
                    setBothTimesIn24HourFormat(true);
                    // Trigger elapsed time animation after both times finish
                    setTimeout(() => {
                      setIsElapsedTimeFadingOut(true);
                      setTimeout(() => {
                        setShowElapsedTimeAnswer(true);
                        setIsElapsedTimeFadingIn(true);
                        // After showing the answer, re-enable inputs for new calculations
                        setTimeout(() => {
                          reenableInputs();
                        }, 2000); // Increased from 1000ms to 2000ms
                      }, 400); // 400ms fade out
                    }, 800); // Increased from 400ms to 800ms
                  }
                }, 300); // 300ms delay between end time and start time conversions
              }, 500); // Use shorter delay when no end time conversion needed
            }
          }
        }, 800);
      }, 300);
    }, 200);
  };

  // Function to re-enable inputs after solve animation completes
  const reenableInputs = () => {
    // Reset animation states
    setIsInputsAnimatingToText(false);
    setShowStartTimeText(false);
    setShowEndTimeText(false);
    setShowStartTimePlus12(false);
    setShowEndTimePlus12(false);
    setShowStartTime24Hour(false);
    setShowEndTime24Hour(false);
    setIsStartTimeAnimating(false);
    setIsEndTimeAnimating(false);
    setStartTimeAnimationStep(0);
    setEndTimeAnimationStep(0);
    setIsStartTimeTextGrowing(false);
    setIsEndTimeTextGrowing(false);
    setIsStartTimePlus12Growing(false);
    setIsEndTimePlus12Growing(false);
    setIsStartTimePlus12MovingLeft(false);
    setIsEndTimePlus12MovingLeft(false);
    setBothTimesIn24HourFormat(false);
    setShowEndTimePlus24(false);
    setIsEndTimePlus24Growing(false);
    setIsEndTimePlus24MovingLeft(false);
    setEndTimePlus24AnimationStep(0);
    setIsEndTimePlus24Animating(false);
    setHas24TextFadedOut(false);
    setShowEndTimeAfter12Hours(false);
    setIsElapsedTimeFadingOut(false);
    // Reset the elapsed time answer and inputs dirty state immediately to prevent question marks
    setShowElapsedTimeAnswer(false);
    setIsElapsedTimeFadingIn(false);
    setIsInputsDirty(false);
    
    // Keep the left movement animations in their final state (true) so they don't retrigger
    // setIsUnderlineMovingLeft(false);
    // setIsElapsedTimeMovingLeft(false);
    // setIsInputsMovingLeft(false);
    
    // Add delay before re-enabling inputs
    setTimeout(() => {
      // Re-enable inputs
      setIsInputsReenabled(true);
    }, 800); // 800ms delay before inputs reappear
    
    // Don't automatically show solve button - only show when inputs are changed
    // setTimeout(() => {
    //   setShowSolveButton(true);
    // }, 500);
  };

  // Function to handle new solve button click
  const handleNewSolve = () => {
    setShowNewSolveButton(false);
    setIsNewSolveButtonGrowing(false);
    setIsInputsReenabled(false);
    // Reset elapsed time to question marks when solve button is clicked
    setShowElapsedTimeAnswer(false);
    handleSolve();
  };

  // Function to calculate elapsed time
  const calculateElapsedTime = () => {
    const startHours = parseInt(startHoursInput) || 0;
    const startMinutes = parseInt(startMinutesInput) || 0;
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    if (startHours >= 1 && startHours <= 12 && startMinutes >= 0 && startMinutes <= 59 &&
        endHours >= 1 && endHours <= 12 && endMinutes >= 0 && endMinutes <= 59) {
      
      // Convert 12-hour format to 24-hour format for calculation
      let start24Hours = startHours;
      if (startTimeAMPM === 'PM' && startHours !== 12) {
        start24Hours = startHours + 12;
      } else if (startTimeAMPM === 'AM' && startHours === 12) {
        start24Hours = 0;
      }
      
      let end24Hours = endHours;
      if (endTimeAMPM === 'PM' && endHours !== 12) {
        end24Hours = endHours + 12;
      } else if (endTimeAMPM === 'AM' && endHours === 12) {
        end24Hours = 0;
      }
      
      // Add 24 hours if crossing midnight
      if (needs24MoreHours()) {
        end24Hours += 24;
      }
      
      const startTotalMinutes = start24Hours * 60 + startMinutes;
      const endTotalMinutes = end24Hours * 60 + endMinutes;
      const elapsedMinutes = endTotalMinutes - startTotalMinutes;
      const hours = Math.floor(elapsedMinutes / 60);
      const minutes = elapsedMinutes % 60;
      return { hours, minutes };
    }
    return { hours: 0, minutes: 35 }; // Default fallback
  };

  // Helper function to get 24-hour format time for start time
  const getStartTime24Hour = () => {
    const startHours = parseInt(startHoursInput) || 0;
    const startMinutes = parseInt(startMinutesInput) || 0;
    
    let start24Hours = startHours;
    if (startTimeAMPM === 'PM' && startHours !== 12) {
      start24Hours = startHours + 12;
    } else if (startTimeAMPM === 'AM' && startHours === 12) {
      start24Hours = 0;
    }
    
    return `${start24Hours}:${String(startMinutes).padStart(2, '0')}`;
  };

  // Helper function to get animated 24-hour format time for start time
  const getStartTimeAnimated = () => {
    const startHours = parseInt(startHoursInput) || 0;
    const startMinutes = parseInt(startMinutesInput) || 0;
    
    let animatedHours = startHours;
    if (startTimeAMPM === 'PM' && startHours !== 12) {
      // Add animation steps (0 to 12)
      animatedHours = startHours + startTimeAnimationStep;
    } else if (startTimeAMPM === 'AM' && startHours === 12) {
      animatedHours = startTimeAnimationStep;
    }
    
    // During animation, show AM/PM. After animation (step 12), show 24-hour format without AM/PM
    if (startTimeAnimationStep < 12) {
      return `${animatedHours}:${String(startMinutes).padStart(2, '0')} ${startTimeAMPM}`;
    } else {
      return `${animatedHours}:${String(startMinutes).padStart(2, '0')}`;
    }
  };

  // Helper function to get 24-hour format time for end time
  const getEndTime24Hour = () => {
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    let end24Hours = endHours;
    if (endTimeAMPM === 'PM' && endHours !== 12) {
      end24Hours = endHours + 12;
    } else if (endTimeAMPM === 'AM' && endHours === 12) {
      end24Hours = 0;
    }
    
    // Add 24 more hours if crossing midnight
    if (needs24MoreHours()) {
      end24Hours += 24;
    }
    
    return `${end24Hours}:${String(endMinutes).padStart(2, '0')}`;
  };

  // Helper function to get animated 24-hour format time for end time
  const getEndTimeAnimated = () => {
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    let animatedHours = endHours;
    if (endTimeAMPM === 'PM' && endHours !== 12) {
      // Add animation steps (0 to 12)
      animatedHours = endHours + endTimeAnimationStep;
    } else if (endTimeAMPM === 'AM' && endHours === 12) {
      animatedHours = endTimeAnimationStep;
    }
    
    // During animation, show AM/PM. After animation (step 12), show 24-hour format without AM/PM
    if (endTimeAnimationStep < 12) {
      return `${animatedHours}:${String(endMinutes).padStart(2, '0')} ${endTimeAMPM}`;
    } else {
      return `${animatedHours}:${String(endMinutes).padStart(2, '0')}`;
    }
  };

  // Helper function to get animated end time with +24 hours after text fades out
  const getEndTimeWith24Hours = () => {
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    let animatedHours = endHours;
    if (endTimeAMPM === 'PM' && endHours !== 12) {
      // Add animation steps (0 to 12)
      animatedHours = endHours + endTimeAnimationStep;
    } else if (endTimeAMPM === 'AM' && endHours === 12) {
      animatedHours = endTimeAnimationStep;
    }
    
    // If we're animating the +24 hours, add those as well
    if (isEndTimePlus24Animating) {
      animatedHours += endTimePlus24AnimationStep;
    }
    
    // During animation, show AM/PM. After animation (step 12), show 24-hour format without AM/PM
    if (endTimeAnimationStep < 12) {
      return `${animatedHours}:${String(endMinutes).padStart(2, '0')} ${endTimeAMPM}`;
    } else {
      return `${animatedHours}:${String(endMinutes).padStart(2, '0')}`;
    }
  };

  // Helper function to get end time after +12 hours animation (without +24 hours)
  const getEndTimeAfter12Hours = () => {
    const endHours = parseInt(endHoursInput) || 0;
    const endMinutes = parseInt(endMinutesInput) || 0;
    
    let end24Hours = endHours;
    if (endTimeAMPM === 'PM' && endHours !== 12) {
      end24Hours = endHours + 12;
    } else if (endTimeAMPM === 'AM' && endHours === 12) {
      end24Hours = 0;
    }
    
    // Don't add 24 more hours here - this is just after +12 hours animation
    return `${end24Hours}:${String(endMinutes).padStart(2, '0')}`;
  };

  const handleClick = () => {
    setIsButtonShrinking(true);
    // Hide welcome message when button is clicked
    setShowWelcomeMessage(false);
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
        setIsEndTimeRising(true);
        setTimeout(() => {
          setIsStartTimeRising(true);
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
            }, 800);
          }, 800);
        }, 800);
      }, 800);
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
            // Trigger left movement animations for equation elements
            setIsUnderlineMovingLeft(true);
            setIsElapsedTimeMovingLeft(true);
            setIsInputsMovingLeft(true);
            // Set inputs as shown
            setShowInputs(true);
            setTimeout(() => {
              // Then trigger text fade out
              setIsTextFadingOut(true);
            }, 400);
            setTimeout(() => {
              setShowFinalText(false);
              setShowFinalContinue(false);
              setTimeout(() => {
                setShowCompletionText(true);
              }, 500);
            }, 800);
          }, 400);
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
          setShowSecondExplanation(true);
          setTimeout(() => {
            setShow24HourTimes(true);
            setTimeout(() => {
              setShowExplanation(true);
              setTimeout(() => {
                setShowSecondContinue(true);
              }, 1200);
            }, 800);
          }, 800);
        }, 800);
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

  // Clean up elapsed time fade-in animation
  useEffect(() => {
    if (isElapsedTimeFadingIn) {
      const timeout = setTimeout(() => setIsElapsedTimeFadingIn(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isElapsedTimeFadingIn]);

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
    setIsEndTimeRising(false);
    setIsStartTimeRising(false);
    setShowUnderline(false);
    setShowElapsedTime(false);
    setShowFinalText(false);
    setShowFinalContinue(false);
    setIsFinalTextShrinking(false);
    setIsFinalButtonShrinking(false);
    setHideUnderline(false);
    setIsElapsedTimeRising(false);
    setShowCompletionText(false);
    setIsClockShrinkingFinal(false);
    setIsClockMovingUp(false);
    setShowSecondClock(false);
    setClocksColored(false);
    setStartTimeInput('1230');
    setEndTimeInput('1305');
    setStartHoursInput('12');
    setStartMinutesInput('30');
    setEndHoursInput('1');
    setEndMinutesInput('05');
    setIsTextFadingOut(false);
    setIsInputFadingIn(false);
    setIsStartTimeMovingUp(false);
    setIsEndTimeMovingUp(false);
    setShowInputs(false);
    setStartTimeAMPM('PM');
    setEndTimeAMPM('PM');
    setIsStartTimeMovingLeft(false);
    setIsEndTimeMovingLeft(false);
    setIsUnderlineMovingLeft(false);
    setIsElapsedTimeMovingLeft(false);
    setIsInputsDirty(false);
    setShowSolveButton(false);
    setIsInputsAnimatingToText(false);
    setShowStartTimeText(false);
    setShowEndTimeText(false);
    setShowStartTimePlus12(false);
    setShowEndTimePlus12(false);
    setShowStartTime24Hour(false);
    setShowEndTime24Hour(false);
    setIsStartTimeAnimating(false);
    setIsEndTimeAnimating(false);
    setStartTimeAnimationStep(0);
    setEndTimeAnimationStep(0);
    setIsInputsMovingLeft(false);
    setIsStartTimeTextGrowing(false);
    setIsEndTimeTextGrowing(false);
    setIsStartTimePlus12Growing(false);
    setIsEndTimePlus12Growing(false);
    setIsStartTimePlus12MovingLeft(false);
    setIsEndTimePlus12MovingLeft(false);
    setBothTimesIn24HourFormat(false);
    setShowEndTimePlus24(false);
    setIsEndTimePlus24Growing(false);
    setIsEndTimePlus24MovingLeft(false);
    setEndTimePlus24AnimationStep(0);
    setIsEndTimePlus24Animating(false);
    setHas24TextFadedOut(false);
    setShowEndTimeAfter12Hours(false);
    setIsElapsedTimeFadingOut(false);
    setShowElapsedTimeAnswer(false);
    setIsElapsedTimeFadingIn(false);
    setIsInputsReenabled(false);
    setShowNewSolveButton(false);
    setIsNewSolveButtonGrowing(false);
    setShowWelcomeMessage(true);
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
          @keyframes moveStartTimeToTop {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-25px);
            }
          }
          @keyframes moveEndTimeToTop {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-75px);
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
          .move-start-time-to-top {
            animation: moveStartTimeToTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-end-time-to-top {
            animation: moveEndTimeToTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
          @keyframes shrinkOutVertical {
            0% {
              opacity: 1;
              transform: translateY(-50px) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-50px) scale(0);
            }
          }
          .shrink-out-vertical {
            animation: shrinkOutVertical 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
              transform: translate(-32px, 60px);
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
          @keyframes fadeOutInput {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.8);
            }
          }
          .fade-out-input {
            animation: fadeOutInput 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes inputShrinkOut {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0);
            }
          }
          .input-shrink-out {
            animation: inputShrinkOut 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes textGrowIn {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .text-grow-in {
            animation: textGrowIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
              transform: translateY(-45px);
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
              transform: translateY(-75px);
            }
          }
          .move-end-time-up {
            animation: moveEndTimeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveStartTimeLeft {
            0% {
              transform: translateY(-25px);
            }
            100% {
              transform: translate(-50px, -25px);
            }
          }
          .move-start-time-left {
            animation: moveStartTimeLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveEndTimeLeft {
            0% {
              transform: translateY(-90px);
            }
            100% {
              transform: translate(-50px, -90px);
            }
          }
          .move-end-time-left {
            animation: moveEndTimeLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveUnderlineLeft {
            0% {
              transform: scaleX(1);
            }
            100% {
              transform: translateX(-50px) scaleX(1);
            }
          }
          .move-underline-left {
            animation: moveUnderlineLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveElapsedTimeLeft {
            0% {
              transform: translate(1px, 0px);
            }
            100% {
              transform: translate(-49px, 0px);
            }
          }
          .move-elapsed-time-left {
            animation: moveElapsedTimeLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveStartTimeDown {
            0% {
              transform: translate(-50px, -30px);
            }
            100% {
              transform: translate(-50px, -25px);
            }
          }
          .move-start-time-down {
            animation: moveStartTimeDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveEndTimeDown {
            0% {
              transform: translate(-50px, -90px);
            }
            100% {
              transform: translate(-50px, -82px);
            }
          }
          .move-end-time-down {
            animation: moveEndTimeDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveInputsLeft {
            0% {
            }
            100% {
              transform: translateX(-195px);
            }
          }
          .move-inputs-left {
            animation: moveInputsLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes plus12MoveLeft {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(-20px);
              opacity: 0;
            }
          }
          .plus12-move-left {
            animation: plus12MoveLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveStartTimeDown {
            from {
              transform: translate(-195px, 0);
            }
            to {
              transform: translate(-195px, 5px);
            }
          }
          .move-start-time-down {
            animation: moveStartTimeDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes moveEndTimeDown {
            from {
              transform: translate(-195px, 0);
            }
            to {
              transform: translate(-195px, 15px);
            }
          }
          .move-end-time-down {
            animation: moveEndTimeDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Elapsed Time Explorer</h2>
          <button 
            className={`text-sm px-3 py-1 rounded border transition-colors ${
              (isButtonShrinking || isContinueShrinking || isSecondButtonShrinking || isFinalButtonShrinking || 
               isSecondTextShrinking || isFinalTextShrinking || isMoving || isClockShrinking || 
               isClockShrinkingFinal || isClockMovingUp || isTimeMovingUp || isInputsAnimatingToText || 
               isStartTimeAnimating || isEndTimeAnimating || isEndTimePlus24Animating || isInputFadingIn || 
               isTextFadingOut || isUnderlineMovingLeft || isElapsedTimeMovingLeft || isInputsMovingLeft) && 
               !showContinue && !showSecondContinue && !showNewSolveButton && !showCompletionText && 
               (!showFinalContinue || (showFinalContinue && (isFinalTextShrinking || isFinalButtonShrinking || isClockShrinkingFinal || isClockMovingUp || isInputFadingIn || isTextFadingOut || isUnderlineMovingLeft || isElapsedTimeMovingLeft || isInputsMovingLeft)))
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            onClick={handleReset}
            title="Reset interactive"
            disabled={(isButtonShrinking || isContinueShrinking || isSecondButtonShrinking || isFinalButtonShrinking || 
                      isSecondTextShrinking || isFinalTextShrinking || isMoving || isClockShrinking || 
                      isClockShrinkingFinal || isClockMovingUp || isTimeMovingUp || isInputsAnimatingToText || 
                      isStartTimeAnimating || isEndTimeAnimating || isEndTimePlus24Animating || isInputFadingIn || 
                      isTextFadingOut || isUnderlineMovingLeft || isElapsedTimeMovingLeft || isInputsMovingLeft) && 
                      !showContinue && !showSecondContinue && !showNewSolveButton && !showCompletionText && 
                      (!showFinalContinue || (showFinalContinue && (isFinalTextShrinking || isFinalButtonShrinking || isClockShrinkingFinal || isClockMovingUp || isInputFadingIn || isTextFadingOut || isUnderlineMovingLeft || isElapsedTimeMovingLeft || isInputsMovingLeft)))}
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {/* Visual Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md overflow-hidden">
            <div className="relative w-[400px] h-[260px] bg-white">
              <div className={`absolute left-[8%] top-[25%] ${isClockMovingUp ? 'clock-move-up' : ''}`}>
                {showClock && (
                  <div className={`${isClockShrinking ? 'clock-shrink' : isClockShrinkingFinal ? 'clock-shrink-final' : 'clock-grow-in'}`}>
                    <Clock 
                      hours={clocksColored ? parseInt(startHoursInput) || 12 : (isClockMovingUp ? startTime.hours : (hasReachedTarget ? endTime.hours : (isMoving ? endTime.hours : startTime.hours)))} 
                      minutes={clocksColored ? parseInt(startMinutesInput) || 0 : (isClockMovingUp ? startTime.minutes : (hasReachedTarget ? endTime.minutes : (isMoving ? endTime.minutes : startTime.minutes)))} 
                      isMoving={isButtonPressed} 
                      color={clocksColored ? '#3B82F6' : '#5750E3'}
                    />
                  </div>
                )}
              </div>
              {showSecondClock && (
                <div className="absolute left-[4%] top-[8%] second-clock-fade-in">
                  <Clock 
                    hours={clocksColored ? parseInt(endHoursInput) || 12 : 13} 
                    minutes={clocksColored ? parseInt(endMinutesInput) || 0 : 5} 
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
              {/* Phase 1: Initial demo times (12:30 PM and 1:05 PM) */}
              {showEndTime && showFirstTimes && !clocksColored && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[148px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'shrink-out-vertical' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    <span className={`text-red-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                      {`${endTime.hours % 12 || 12}:${String(endTime.minutes).padStart(2, '0')} ${endTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                    {showSecondExplanation && (
                      <span className={`text-black font-bold text-xs -ml-0.5 grow-in ${isTextFadingOut ? 'shrink-out-vertical' : ''}`}>
                        +12 hours
                      </span>
                    )}
                  </div>
                </div>
              )}
              {showStartTime && showFirstTimes && !clocksColored && (
                <div className={`absolute left-1/2 transform -translate-x-1/8 top-[123px] flex flex-col items-center gap-2 ${isTimeMovingUp ? 'move-to-top' : 'grow-in'} ${isFirstTimesShrinking ? 'shrink-out-vertical' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    <span className={`text-blue-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                      {`${startTime.hours % 12 || 12}:${String(startTime.minutes).padStart(2, '0')} ${startTime.hours >= 12 ? 'PM' : 'AM'}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Phase 2: 24-hour conversion times (12:30 and 13:05) */}
              {isTimeMovingUp && show24HourTimes && !clocksColored && (
                <div className={`absolute left-[200px] transform -translate-x-1/2 top-[143px] flex flex-col items-center gap-2 ${isStartTimeRising ? 'move-start-time-to-top' : 'text-animation'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm font-medium">Start Time:</span>
                    <span className={`text-blue-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                      {`${startTime.hours}:${String(startTime.minutes).padStart(2, '0')}`}
                    </span>
                  </div>
                </div>
              )}
              {isTimeMovingUp && show24HourTimes && !clocksColored && (
                <div className={`absolute left-[200px] transform -translate-x-1/2 top-[168px] flex flex-col items-center gap-2 ${isEndTimeRising ? 'move-end-time-to-top' : 'text-animation'}`}>
                  <div className={`flex items-center gap-2 ${showUnderline && !hideUnderline ? 'shift-right' : ''}`}>
                    <span className="text-red-500 text-sm font-medium">End Time:</span>
                    <span className={`text-red-500 text-sm font-medium ${isTextFadingOut ? 'fade-out-text' : ''}`}>
                      {`${endTime.hours}:${String(endTime.minutes).padStart(2, '0')}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Arrow element */}
              {isTimeMovingUp && showArrows && showArrow && (
                <div className={`absolute left-[205px] top-[168px] flex flex-col items-start gap-2 ${isTimeMovingUp ? 'move-to-top' : 'arrow-fade-in'} ${isArrowShrinking ? 'shrink-out-vertical' : ''}`}>
                  <div className="ml-12">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#5750E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Phase 3: Interactive input fields */}
              {clocksColored && showInputs && (
                <>
                  {/* Interactive Start Time Input */}
                  <div className={`absolute left-[345px] transform -translate-x-1/2 top-[112px] flex flex-col items-start gap-2 w-[280px] ${isInputsAnimatingToText ? 'move-start-time-down' : ''} ${isInputsMovingLeft ? 'move-inputs-left' : ''}`}>
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-blue-500 text-sm font-medium whitespace-nowrap">Start Time:</span>
                      <div className="flex items-center gap-1 flex-nowrap">
                        {!isInputsAnimatingToText ? (
                          <>
                            <input
                              type="text"
                              value={startHoursInput}
                              onChange={(e) => handleHourInputChange(e.target.value, setStartHoursInput, (newTime) => {
                                // Update the static startTime reference
                                startTime.hours = newTime.hours;
                                startTime.minutes = newTime.minutes;
                              }, startMinutesInput, setStartTimeAMPM)}
                              onBlur={(e) => handleHourInputBlur(e.target.value, setStartHoursInput, (newTime) => {
                                // Update the static startTime reference
                                startTime.hours = newTime.hours;
                                startTime.minutes = newTime.minutes;
                              }, startMinutesInput, setStartTimeAMPM)}
                              className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              maxLength={2}
                              placeholder="HH"
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            />
                            <span className={`text-blue-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                            <input
                              type="text"
                              value={startMinutesInput}
                              onChange={(e) => handleMinuteInputChange(e.target.value, setStartMinutesInput, (newTime) => {
                                // Update the static startTime reference
                                startTime.hours = newTime.hours;
                                startTime.minutes = newTime.minutes;
                              }, startHoursInput)}
                              onBlur={(e) => handleMinuteInputBlur(e.target.value, setStartMinutesInput, (newTime) => {
                                // Update the static startTime reference
                                startTime.hours = newTime.hours;
                                startTime.minutes = newTime.minutes;
                              }, startHoursInput)}
                              className={`text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              maxLength={2}
                              placeholder="MM"
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            />
                            <button
                              onClick={() => toggleAMPM(startTimeAMPM, setStartTimeAMPM, startHoursInput, startMinutesInput, (newTime) => {
                                // Update the static startTime reference
                                startTime.hours = newTime.hours;
                                startTime.minutes = newTime.minutes;
                              })}
                              className={`text-blue-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            >
                              {startTimeAMPM}
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={startHoursInput}
                              className="text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md w-8 text-center px-1 py-1 input-shrink-out"
                              style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}
                              maxLength={2}
                              readOnly
                            />
                            <span className="text-blue-500 text-sm font-medium input-shrink-out" style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}>:</span>
                            <input
                              type="text"
                              value={startMinutesInput}
                              className="text-blue-500 text-sm font-medium bg-white border border-gray-300 rounded-md w-8 text-center px-1 py-1 input-shrink-out"
                              style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}
                              maxLength={2}
                              readOnly
                            />
                            <button className="text-blue-500 text-xs font-medium bg-white border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center input-shrink-out" style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}>
                              {startTimeAMPM}
                            </button>
                            {showStartTimeText && (
                              <span className={`text-blue-500 text-sm font-medium whitespace-nowrap ${isStartTimeTextGrowing ? 'text-grow-in' : 'opacity-0'}`}>
                                {showStartTime24Hour
                                  ? getStartTime24Hour()
                                  : isStartTimeAnimating
                                    ? getStartTimeAnimated()
                                    : `${startHoursInput}:${startMinutesInput.padStart(2, '0')} ${startTimeAMPM}`}
                              </span>
                            )}
                            {showStartTimePlus12 && (
                              <span className={`text-black font-bold text-xs ml-1 whitespace-nowrap ${isStartTimePlus12Growing ? 'text-grow-in' : isStartTimePlus12MovingLeft ? 'plus12-move-left' : 'opacity-0'}`}>
                                +12 hours
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive End Time Input */}
                  <div className={`absolute left-[345px] transform -translate-x-1/2 top-[77px] flex flex-col items-start gap-2 w-[280px] ${isInputsAnimatingToText ? 'move-end-time-down' : ''} ${isInputsMovingLeft ? 'move-inputs-left' : ''}`}>
                    <div className={`flex items-center gap-2 w-full ${showUnderline && !hideUnderline ? 'shift-right' : ''}`}>
                      <span className="text-red-500 text-sm font-medium whitespace-nowrap">End Time:</span>
                      <div className="flex items-center gap-1 flex-nowrap">
                        {!isInputsAnimatingToText ? (
                          <>
                            <input
                              type="text"
                              value={endHoursInput}
                              onChange={(e) => handleHourInputChange(e.target.value, setEndHoursInput, setEndTime, endMinutesInput, setEndTimeAMPM)}
                              onBlur={(e) => handleHourInputBlur(e.target.value, setEndHoursInput, setEndTime, endMinutesInput, setEndTimeAMPM)}
                              className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              maxLength={2}
                              placeholder="HH"
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            />
                            <span className={`text-red-500 text-sm font-medium ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}>:</span>
                            <input
                              type="text"
                              value={endMinutesInput}
                              onChange={(e) => handleMinuteInputChange(e.target.value, setEndMinutesInput, setEndTime, endHoursInput)}
                              onBlur={(e) => handleMinuteInputBlur(e.target.value, setEndMinutesInput, setEndTime, endHoursInput)}
                              className={`text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 w-8 text-center px-1 py-1 ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              maxLength={2}
                              placeholder="MM"
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            />
                            <button
                              onClick={() => toggleAMPM(endTimeAMPM, setEndTimeAMPM, endHoursInput, endMinutesInput, setEndTime)}
                              className={`text-red-500 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-400 w-8 h-8 flex items-center justify-center ${isInputFadingIn ? 'fade-in-input' : isInputsReenabled ? 'fade-in-input' : 'opacity-0 scale-75'}`}
                              disabled={!isInputsReenabled && !isInputFadingIn}
                            >
                              {endTimeAMPM}
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={endHoursInput}
                              className="text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md w-8 text-center px-1 py-1 input-shrink-out"
                              style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}
                              maxLength={2}
                              readOnly
                            />
                            <span className="text-red-500 text-sm font-medium input-shrink-out" style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}>:</span>
                            <input
                              type="text"
                              value={endMinutesInput}
                              className="text-red-500 text-sm font-medium bg-white border border-gray-300 rounded-md w-8 text-center px-1 py-1 input-shrink-out"
                              style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}
                              maxLength={2}
                              readOnly
                            />
                            <button className="text-red-500 text-xs font-medium bg-white border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center input-shrink-out" style={{ display: isInputsAnimatingToText ? 'none' : 'block' }}>
                              {endTimeAMPM}
                            </button>
                            {showEndTimeText && (
                              <span className={`text-red-500 text-sm font-medium whitespace-nowrap ${isEndTimeTextGrowing ? 'text-grow-in' : 'opacity-0'}`}>
                                {(isEndTimePlus24Animating && endTimePlus24AnimationStep > 0)
                                  ? getEndTimeWith24Hours()
                                  : showEndTime24Hour
                                    ? getEndTime24Hour()
                                    : showEndTimeAfter12Hours
                                      ? getEndTimeAfter12Hours()
                                      : isEndTimeAnimating
                                        ? getEndTimeAnimated()
                                        : `${endHoursInput}:${endMinutesInput.padStart(2, '0')} ${endTimeAMPM}`}
                              </span>
                            )}
                            {showEndTimePlus12 && (
                              <span className={`text-black font-bold text-xs ml-1 whitespace-nowrap ${isEndTimePlus12Growing ? 'text-grow-in' : isEndTimePlus12MovingLeft ? 'plus12-move-left' : 'opacity-0'}`}>
                                +12 hours
                              </span>
                            )}
                            {showEndTimePlus24 && (
                              <span className={`text-black font-bold text-xs whitespace-nowrap ${isEndTimePlus24Growing ? 'text-grow-in' : isEndTimePlus24MovingLeft ? 'plus12-move-left' : 'opacity-0'}`} style={{ marginLeft: endTimeAMPM === 'PM' ? '-60px' : '5px' }}>
                                +24 hours
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showUnderline && (
                <>
                  <div className={`absolute left-[200px] transform -translate-x-1/2 top-[148px] h-[2px] bg-[#5750E3] ${isUnderlineMovingLeft ? 'move-underline-left' : hideUnderline ? 'shrink-out' : 'grow-in-line'}`} style={{ width: showInputs ? '200px' : '150px' }} />
                  <div className={`absolute left-[185px] top-[128px] w-[8px] h-[2px] bg-[#5750E3] ${isUnderlineMovingLeft ? 'move-underline-left' : hideUnderline ? 'shrink-out' : 'grow-in-line'}`} />
                </>
              )}
              {showElapsedTime && (
                <div className={`absolute left-[199px] transform -translate-x-1/2 top-[160px] text-[#5750E3] text-sm font-medium ${isElapsedTimeMovingLeft ? 'move-elapsed-time-left' : isElapsedTimeRising ? 'rise-up' : 'fade-in-down'}`}>
                  <span>
                    Elapsed Time: 
                    {!showInputs ? (
                      // Show calculated answer when elapsed time first appears (before inputs)
                      <span className={isElapsedTimeFadingIn ? 'fade-in-down' : ''}>
                        {` ${calculateElapsedTime().hours}h ${calculateElapsedTime().minutes}m`}
                      </span>
                    ) : isInputsDirty && !showElapsedTimeAnswer ? (
                      // Show question marks only when inputs are dirty (changed by user) and answer is not shown
                      <span className={isElapsedTimeFadingOut ? 'fade-out-text' : ''}>
                        {' ?h ?m'}
                      </span>
                    ) : (
                      // Show calculated answer when inputs are not dirty or after solve animation
                      <span className={isElapsedTimeFadingIn ? 'fade-in-down' : ''}>
                        {` ${calculateElapsedTime().hours}h ${calculateElapsedTime().minutes}m`}
                      </span>
                    )}
                  </span>
                  {showSolveButton && (
                    <div className="glow-button simple-glow absolute left-[143px] top-[-6px]" style={{ bottom: 'auto', right: 'auto', padding: '5px' }}>
                      <button
                        onClick={handleSolve}
                        className="bg-[#008545] text-white text-xs px-2 py-1 rounded hover:bg-[#00783E] transition-colors"
                      >
                        Solve
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Text Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md p-4 h-[115px] relative flex items-center justify-center">
            {showWelcomeMessage && (
              <div className="text-sm text-gray-600 fade-in-down text-center">
                <div>
                  Welcome to the Elapsed Time Explorer! Click the button above to begin.
                </div>
              </div>
            )}
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
                  To find <span className="font-bold text-black">elapsed time</span>, first convert both times into a 24 hour format by adding 12 hours to all pm times past 12pm.  
                </div>
              </div>
            )}

            {showFinalText && (
              <div className={`text-sm text-gray-600 ${isFinalTextShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  Now we can subtract the <span className="text-blue-500">start time</span> from the <span className="text-red-500">end time</span> to find the <span className="font-bold text-black">elapsed time</span>. If the result was a negative number, that means the elapsed time crosses midnight, so add 24 hours to the result.
                </div>
              </div>
            )}

            {showCompletionText && (
              <div className="text-sm text-gray-600 fade-in-down text-center">
                <div>
                  Enter your own times and find their <span className="font-bold text-black">elapsed time!</span>
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