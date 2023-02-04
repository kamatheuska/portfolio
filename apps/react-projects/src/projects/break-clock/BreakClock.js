import { useEffect, useRef, useState } from "react";
import { useFccTestToggle } from "../../hooks/fcc";

function BreakClock() {
    const DEFAULT_SESSION_TIME = 25
    const DEFAULT_BREAK_TIME = 5
    const DEFAULT_TIME_LEFT = DEFAULT_SESSION_TIME * 60 * 1000;
    const [toggleFccTestSuit] = useFccTestToggle();
    const [breakLength, setBreakLength]  = useState(DEFAULT_BREAK_TIME);
    const [sessionLength, setSessionLength]  = useState(DEFAULT_SESSION_TIME);
    const [timeLeft, setTimeLeft]  = useState(DEFAULT_TIME_LEFT);
    const [isStopped, setIsStopped]  = useState(true);
    const intervalRef  = useRef();

    function startTimer() {
        if (!isStopped) return;
        setIsStopped(false);
        let timer = timeLeft;
            
        if (intervalRef.current) return;

        const id = setInterval(() => {
            if (timer >= 0) {
                timer -= 1000;
                setTimeLeft(timer);
            };
        }, 1000);

        intervalRef.current = id;
    }

    function stopTimer() {
        clearInterval(intervalRef.current);

        intervalRef.current = null;
        setIsStopped(true);
    }

    function convertToMMSSFormat(miliseconds) {
        return new Date(miliseconds).toISOString().slice(14, 19)
    }

    useEffect(() => {
        if (isStopped) return;
        if (timeLeft === 0) stopTimer();
    })

    return(
        <div className="break-clock">
            <div className="break-clock__centered">
                <header>
                    <h1 className="title is-1">Break Clock</h1>
                    <button className="button is-primary" onClick={toggleFccTestSuit}>
                        Show tests
                    </button>
                </header>
            </div>
            <div className="break-clock__container">
                <div>
                    <p id="break-label">Break Length</p>
                    <div className="break-clock__controls">
                        <button
                            className="break-clock__control"
                            id="break-increment"
                            onClick={() => {
                                const newValue = breakLength + 1 > 60
                                    ? breakLength
                                    : breakLength + 1
                                setBreakLength(newValue)
                            }}
                        >
                            +
                        </button>
                        <span id="break-length">{ breakLength }</span>
                        <button
                            className="break-clock__control"
                            id="break-decrement"
                            onClick={() => {
                                const newValue = breakLength - 1 <= 0 
                                    ? breakLength
                                    : breakLength - 1
                                setBreakLength(newValue)
                            }}
                        >
                            -
                        </button>
                    </div>
                </div>
                <div>
                    <p id="session-label">Session Length</p>
                    <div className="break-clock__controls">
                        <button
                            className="break-clock__control"
                            id="session-increment"
                            onClick={() => {
                                const newValue = sessionLength + 1 > 60
                                    ? sessionLength
                                    : sessionLength + 1
                                setTimeLeft(newValue * 60 * 1000)
                                setSessionLength(newValue)
                                stopTimer();
                            }}
                        >
                            +
                        </button>
                        <span id="session-length">{ sessionLength }</span>
                        <button
                            className="break-clock__control"
                            id="session-decrement"
                            onClick={() => {
                                const newValue = sessionLength - 1 <= 0 
                                    ? sessionLength
                                    : sessionLength - 1
                                setTimeLeft(newValue * 60 * 1000)
                                setSessionLength(newValue)
                                stopTimer();
                            }}
                        >
                            -
                        </button>
                    </div>
                </div>
                <div>
                    <p id="timer-label">
                        Session
                    </p>
                    <p id="time-left">
                        { convertToMMSSFormat(timeLeft)}
                    </p>
                </div>
                <div>
                    <div className="mb-3">
                        <button className="button is-dark is-small" id="start_stop" onClick={() => {
                            if (isStopped) return startTimer();
                            stopTimer();
                        }}>
                            start/stop
                        </button>
                    </div>
                    <div>
                        <button className="button is-danger is-small" id="reset" onClick={() => {
                            stopTimer();
                            setBreakLength(DEFAULT_BREAK_TIME);
                            setSessionLength(DEFAULT_SESSION_TIME);
                            setTimeLeft(DEFAULT_TIME_LEFT);
                        }}>
                            reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreakClock;