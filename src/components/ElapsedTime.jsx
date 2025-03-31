import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const ElapsedTime = () => {
  // Time generation functions
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      ampm
    };
  };

  const generateEndTime = (startTime) => {
    const start = {
      hours: parseInt(startTime.hours),
      minutes: parseInt(startTime.minutes),
      ampm: startTime.ampm
    };

    let end;
    do {
      end = generateRandomTime();
    } while (
      (start.ampm === 'PM' && end.ampm === 'AM') ||
      (start.ampm === end.ampm && 
        (parseInt(end.hours) < parseInt(start.hours) || 
        (parseInt(end.hours) === parseInt(start.hours) && 
         parseInt(end.minutes) <= parseInt(start.minutes))))
    );

    return end;
  };

  // Initialize state
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false
  });
  const [userInput1Start, setUserInput1Start] = useState('');
  const [userInput1End, setUserInput1End] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [hasError, setHasError] = useState({
    step1: false,
    step2: false
  });
  const [startTime, setStartTime] = useState(generateRandomTime());
  const [endTime, setEndTime] = useState(() => generateEndTime(startTime));
  const [step1Answers, setStep1Answers] = useState({ start: '', end: '' });
  const [step2Answers, setStep2Answers] = useState({ hours: '', minutes: '' });

  // Convert to 24-hour format
  const to24Hour = (time) => {
    let hours = parseInt(time.hours);
    // For PM: 1 PM to 11 PM add 12 hours (13:00 to 23:00)
    // 12 PM (noon) stays as 12:00
    if (time.ampm === 'PM' && hours !== 12) hours += 12;
    // For AM: 12 AM (midnight) becomes 00:00
    // 1 AM to 11 AM stay the same but need padding
    if (time.ampm === 'AM' && hours === 12) hours = 0;
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: time.minutes
    };
  };

  // Calculate elapsed time
  const calculateElapsedTime = () => {
    const start24 = to24Hour(startTime);
    const end24 = to24Hour(endTime);
    
    let startMinutes = parseInt(start24.hours) * 60 + parseInt(start24.minutes);
    let endMinutes = parseInt(end24.hours) * 60 + parseInt(end24.minutes);
    
    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60;
    
    return {
      hours: Math.floor(diffMinutes / 60),
      minutes: diffMinutes % 60
    };
  };

  // Handler functions
  const generateNewProblem = () => {
    const newStartTime = generateRandomTime();
    const newEndTime = generateEndTime(newStartTime);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setStep1Answers({ start: '', end: '' });
    setStep2Answers({ hours: '', minutes: '' });
    setCurrentStep(1);
    setCompletedSteps({
      step1: false,
      step2: false
    });
    setUserInput1Start('');
    setUserInput1End('');
    setUserInput2('');
    setHasError({
      step1: false,
      step2: false
    });
    setShowSteps(false);
  };

  const checkAnswer = (step) => {
    let correct = false;
    if (step === 1) {
      const start24 = to24Hour(startTime);
      const end24 = to24Hour(endTime);
      const expectedStart = `${start24.hours}:${start24.minutes}`;
      const expectedEnd = `${end24.hours}:${end24.minutes}`;
      
      const userStartAnswer = userInput1Start.replace(/\s+/g, '');
      const userEndAnswer = userInput1End.replace(/\s+/g, '');
      
      correct = userStartAnswer === expectedStart && userEndAnswer === expectedEnd;
      
      if (correct) {
        setCompletedSteps(prev => ({ ...prev, step1: true }));
        setCurrentStep(2);
        setStep1Answers({
          start: `${start24.hours}:${start24.minutes}`,
          end: `${end24.hours}:${end24.minutes}`
        });
      }
    } else {
      const elapsed = calculateElapsedTime();
      const expected = `${elapsed.hours} hours and ${elapsed.minutes} minutes`;
      const userAnswer = userInput2.replace(/\s+/g, '').toLowerCase();
      const expectedNormalized = expected.replace(/\s+/g, '').toLowerCase();
      correct = userAnswer === expectedNormalized;
      
      if (correct) {
        setCompletedSteps(prev => ({ ...prev, step2: true }));
        setStep2Answers(elapsed);
      }
    }
    setHasError(prev => ({ ...prev, [`step${step}`]: !correct }));
    return correct;
  };

  const showStep1Answer = () => {
    const start24 = to24Hour(startTime);
    const end24 = to24Hour(endTime);
    setStep1Answers({
      start: `${start24.hours}:${start24.minutes}`,
      end: `${end24.hours}:${end24.minutes}`
    });
    setCompletedSteps(prev => ({ ...prev, step1: true }));
    setCurrentStep(2);
  };

  const showStep2Answer = () => {
    const elapsed = calculateElapsedTime();
    setStep2Answers(elapsed);
    setCompletedSteps(prev => ({ ...prev, step2: true }));
  };

  return (
    <div className="bg-gray-100 p-8 w-full max-w-4xl mx-auto">
      <Card className="w-full shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg">
          <h1 className="text-sky-900 text-2xl font-bold">Elapsed Time</h1>
          <p className="text-sky-800">Learn how to calculate the time between two events!</p>
        </div>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What is Elapsed Time?</h2>
            <p className="text-blue-600">
              Elapsed time is the amount of time that passes between the start and end of an event.
              It tells us how long something took from beginning to end. Practice calculating elapsed time below!
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Example</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="mt-8 mb-6">
                    <p className="text-lg font-bold mb-2">Given:</p>
                    <p className="text-lg">Start time = 9:30 AM</p>
                    <p className="text-lg">End time = 2:45 PM</p>
                  </div>
                  <div>
                    <p className="font-medium">Step 1: Convert to 24-hour format</p>
                    <div className="p-4 my-2">
                      <div className="bg-blue-50 p-3 rounded-lg mb-3 text-sm">
                        <p className="font-medium mb-2">How to convert to 24-hour time:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>For AM times: 12:00 AM is 00:00, other AM times stay the same (just add a 0 in front if needed)</li>
                          <li>For PM times: Add 12 to the hours (except 12 PM stays as 12:00)</li>
                        </ul>
                      </div>
                      <div className="font-mono">
                        <p>9:30 AM = 09:30</p>
                        <p>2:45 PM = 14:45</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Step 2: Subtract the times (put the bigger time on top)</p>
                    <div className="p-4 my-2 font-mono">
                      <div style={{ width: 'fit-content' }}>
                        <div className="text-right tabular-nums">14:45</div>
                        <div className="text-right tabular-nums">- 9:30</div>
                        <div className="border-t border-gray-400 mt-1 mb-0">
                          <div className="text-right tabular-nums">5:15</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 mt-4">
                    Therefore, the elapsed time is 5 hours and 15 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <Button 
                onClick={generateNewProblem}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Problem
              </Button>
            </div>

            <div className="text-center text-2xl mb-4 space-y-2">
              <div className="font-mono">
                Start Time: {startTime.hours}:{startTime.minutes} {startTime.ampm}
              </div>
              <div className="font-mono">
                End Time: {endTime.hours}:{endTime.minutes} {endTime.ampm}
              </div>
            </div>

            <Button 
              onClick={() => setShowSteps(true)}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3"
            >
              Solve Step by Step
            </Button>

            {showSteps && (
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p className="mb-4">1. Convert to 24-hour format:</p>
                {completedSteps.step1 ? (
                  <div className="text-green-600 font-bold mb-6 space-y-1">
                    <p>{step1Answers.start}</p>
                    <p>{step1Answers.end}</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Start Time (24h)</label>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="text"
                          value={userInput1Start}
                          onChange={(e) => {
                            setUserInput1Start(e.target.value);
                            setHasError(prev => ({ ...prev, step1: false }));
                          }}
                          placeholder="e.g., 09:30"
                          className={`flex-1 ${hasError.step1 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">End Time (24h)</label>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="text"
                          value={userInput1End}
                          onChange={(e) => {
                            setUserInput1End(e.target.value);
                            setHasError(prev => ({ ...prev, step1: false }));
                          }}
                          placeholder="e.g., 14:45"
                          className={`flex-1 ${hasError.step1 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => checkAnswer(1)}
                        className="bg-blue-400 hover:bg-blue-500 flex-1"
                      >
                        Check
                      </Button>
                      <Button
                        onClick={() => showStep1Answer()}
                        className="bg-gray-400 hover:bg-gray-500 text-white flex-1"
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep >= 2 && (
                  <>
                    <p className="mb-4">2. Calculate the elapsed time:</p>
                    <div className="p-4 font-mono">
                      <div style={{ width: 'fit-content' }}>
                        <div className="text-right tabular-nums">{step1Answers.end}</div>
                        <div className="text-right tabular-nums">- {step1Answers.start}</div>
                        <div className="border-t border-gray-400 mt-1 mb-0">
                          <div className="text-right tabular-nums">??:??</div>
                        </div>
                      </div>
                    </div>
                    {completedSteps.step2 ? (
                      <>
                        <p className="text-green-600 font-bold mb-6">
                          {step2Answers.hours} hours and {step2Answers.minutes} minutes
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                          <p className="text-green-700">
                            You've successfully calculated the elapsed time!
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <Input 
                          type="text"
                          value={userInput2}
                          onChange={(e) => {
                            setUserInput2(e.target.value);
                            setHasError(prev => ({ ...prev, step2: false }));
                          }}
                          placeholder="e.g., 5 hours and 15 minutes"
                          className={`flex-1 ${hasError.step2 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkAnswer(2)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Check
                          </Button>
                          <Button
                            onClick={() => showStep2Answer()}
                            className="bg-gray-400 hover:bg-gray-500 text-white"
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding elapsed time is essential for scheduling and time management!
      </p>
    </div>
  );
};

export default ElapsedTime;