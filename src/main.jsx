import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './MainView';
import TargetPlanetPhase from './TargetPlanetPhase';
import { forceNumber } from './utils';

class PlanetaryConfigSim extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            targetFixed: true,
            observerPlanetAngle: 0,
            targetPlanetAngle: 0,
            radiusObserverPlanet: 1.00,
            radiusTargetPlanet: 0.72,
            radiusPixelObserver: 400,
            radiusPixelTarget: 288,
            maximumPixelRadius: 400,
            observerMultiplier: Math.pow(1.0, -1.5),
            targetMultiplier:  Math.pow(0.72, -1.5),
            animationRate: 1.5,
            targetAngle: Math.PI,
            sunAngle: Math.PI,
            elongationAngle: 0,
            optionObserver: "3",
            optionTarget: "2",
            observerName: 'observer (earth)',
            targetName: 'target (venus)',
            holdObserver: 1.00,
            holdTarget: 0.72,
            labelOrbits: true,
            showElongation: false,
            zoomOut: false,
            startBtnText: 'Play animation',
            isPlaying: false,
            days: 0,
            thetaShift: 0,
            cyclesCompleted: 0,

            obsAngleTarget: 0,
            sunAngleTarget: Math.PI,
        };

        this.state = this.initialState;
        this.raf = null;

        this.stopAnimation = this.stopAnimation.bind(this);
    }

    render() {
        return <React.Fragment>
            <nav className="navbar navbar-expand-md navbar-light bg-dark d-flex justify-content-between">
                <span className="navbar-brand mb-0 text-light h1">< a href="https://foothill.edu/astronomy/astrosims.html">AstroSims</a> > Copernican Planetary Phases</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#" onClick={this.onResetClick.bind(this)}>Reset</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#" data-toggle="modal" data-target="#helpModal">Help</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#" data-toggle="modal" data-target="#aboutModal">About</a>
                    </li>
                </ul>
            </nav>
            <div className="row mt-2">
                <div className="col-8">
                    <MainView
                        targetPlanetAngle={this.state.targetPlanetAngle}
                        observerPlanetAngle={this.state.observerPlanetAngle}

                        radiusTargetPlanet={this.state.radiusPixelTarget}
                        radiusObserverPlanet={this.state.radiusPixelObserver}

                        onTargetPlanetAngleUpdate={this.onTargetPlanetAngleUpdate.bind(this)}
                        onObserverPlanetAngleUpdate={this.onObserverPlanetAngleUpdate.bind(this)}
                        stopAnimation={this.stopAnimation}
                        targetAngle={this.state.targetAngle}
                        sunAngle={this.state.sunAngle}
                        elongationAngle={this.state.elongationAngle}
                        targetName={this.state.targetName}
                        observerName={this.state.observerName}
                        labelOrbits={this.state.labelOrbits}
                        showElongation={this.state.showElongation}
                        zoomOut={this.state.zoomOut}

                        obsAngleTarget={this.state.obsAngleTarget}
                        sunAngleTarget={this.state.sunAngleTarget}
                    />
                </div>
                <div className="rowx">
                    <div className="col">
                        <h4 id="text">Orbit Sizes</h4>
                        <div className="radiusText">
                            <label htmlFor="radObserverPlanetRange" id="text">Radius of observer planet's orbit (AU):</label>
                        </div>

                        <div className="observerInput">
                            <form onSubmit={this.onSubmitObserver.bind(this)}>
                                <input
                                    className="input"
                                    type="number"
                                    min={0.25}
                                    max={10.00}
                                    step={0.01}
                                    value={this.state.holdObserver}
                                    onChange={this.changeValObserver.bind(this)}
                                />
                            </form>
                        </div>

                        <div className="observerSlider">
                            <input
                                type="range"
                                min={0.25}
                                max={10.00}
                                step={0.01}
                                value={this.state.radiusObserverPlanet}
                                onChange={this.onObserverPlanetRadiusChange.bind(this)}
                            />
                        </div>

                        <div className="observerPresets">
                            <select className="form-control form-control-sm"
                                    onChange={this.onPresetSelectObserver.bind(this)}
                                    value={this.state.optionObserver}>
                                <option value={0} defaultValue>*preset*</option>
                                <option value={1}>Mercury</option>
                                <option value={2}>Venus</option>
                                <option value={3}>Earth</option>
                                <option value={4}>Mars</option>
                                <option value={5}>Jupiter</option>
                                <option value={6}>Saturn</option>
                                <option value={7}>Arbitrary Observer</option>
                            </select>
                        </div>

                        <div className="radiusText">
                            <label htmlFor="radTargetPlanetRange" id="text">Radius of target planet's orbit (AU):</label>
                        </div>

                        <div className="targetInput">
                            <form onSubmit={this.onSubmitTarget.bind(this)}>
                                <input
                                    className="input"
                                    type="number"
                                    min={0.25}
                                    max={10.00}
                                    step={0.01}
                                    value={this.state.holdTarget}
                                    onChange={this.changeValTarget.bind(this)}
                                />
                            </form>
                        </div>

                        <div className="targetSlider">
                            <input
                                type="range"
                                min={0.25}
                                max={10.00}
                                step={0.01}
                                value={this.state.radiusTargetPlanet}
                                onChange={this.onTargetPlanetRadiusChange.bind(this)}
                            />
                        </div>

                        <div className="targetPresets">
                            <select className="form-control form-control-sm"
                                    onChange={this.onPresetSelectTarget.bind(this)}
                                    value={this.state.optionTarget}>
                                <option value={0} defaultValue>*preset*</option>
                                <option value={1}>Mercury</option>
                                <option value={2}>Venus</option>
                                <option value={3}>Earth</option>
                                <option value={4}>Mars</option>
                                <option value={5}>Jupiter</option>
                                <option value={6}>Saturn</option>
                                <option value={7}>Arbitrary Target</option>
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <h4 id="text">Animation Control</h4>
                        <div className="animationText">
                            <label htmlFor="diamRange" id="text">Speed:</label>
                        </div>
                        <div className="animationSlider">
                            <input
                                type="range"
                                step={0.1}
                                min={0.1}
                                max={Math.PI * 1.5}
                                value={this.state.animationRate}
                                onChange={this.onAnimationRateChange.bind(this)}
                            />
                        </div>
                        <div className="animationButton">
                            <button type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={this.onStartClick.bind(this)}>
                                {this.state.startBtnText}
                            </button>
                        </div>
                    </div>

                    
                    <div className="controls">
                        
                        <p></p>

                        <div className="custom-control custom-checkboxes">
                            <input type="checkbox"
                                   onChange={this.showOrbits.bind(this)}
                                   checked={this.state.labelOrbits}
                                   id="orbits-display"
                            />
                            <label className="" htmlFor="orbits-display" id="text">
                                Label Orbits
                            </label>
                        </div>
                        
                        <p></p>


                    </div>

                    <div id="days">
                        <div className="custom-control custom-checkboxes">
                            <div id="elapsedText">
                                <p>
                                    {this.getEarthYearsElapsed()} years and {(this.getEarthDaysElapsed() % 365).toFixed(0)} days
                                </p>
                            </div>
                            <div id="resetButton">
                                <button type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => this.resetDaysElapsed()}>
                                    Reset time
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="survey">
                        <a href="https://tinyurl.com/y7og92oe"
                           target="_blank"
                           rel="noopener noreferrer">
                            <button type="button" className="btn btn-warning">Give us feedback!</button>
                        </a>
                    </div>

                </div>

                <div className="zodiacStrip">
                    <TargetPlanetPhase
                        speed={this.state.animationRate}
                        observerPlanetAngle={this.state.observerPlanetAngle}
                        targetPlanetAngle={this.state.targetPlanetAngle}

                        radiusAUTarget={this.state.radiusTargetPlanet}
                        radiusAUObserver={this.state.radiusObserverPlanet}

                        radiusObserverPlanet={this.state.radiusPixelObserver}
                        radiusTargetPlanet={this.state.radiusPixelTarget}
                        isPlaying={this.state.isPlaying}
                        stopAnimation={this.stopAnimation}
                        updateAngles={this.updateAngles.bind(this)}
                    />
                </div>
            </div>
        </React.Fragment>;
    }


    getEarthDaysElapsed() {

        let orbitDays = this.getDaysElapsed();
        let orbitYears = this.getYear();
        let orbitalPeriod = 365 * (1 / this.state.observerMultiplier);

        let earthDaysElapsed = ((orbitYears * orbitalPeriod) + orbitDays);

        return earthDaysElapsed;
    }

    getEarthYearsElapsed() {
        let earthDaysElapsed = this.getEarthDaysElapsed();

        let yearsElapsed = Math.floor(earthDaysElapsed / 365);
        if (yearsElapsed < 0) {
            return yearsElapsed + 1;
        }

        return yearsElapsed;
    }

    getDaysElapsed() {
        if (this.state.days === 0) {
            return 0;
        }
        let orbitalPeriod = 365 * (1 / this.state.observerMultiplier);
        return this.state.cyclesCompleted <= 0 ? this.state.days - orbitalPeriod : this.state.days;
    }

    getYear() {
        let year = this.state.cyclesCompleted;

        if (year < 0) {
            return year;
        }

        if (year - 1 === -1) {
            return 0;
        }

        return year - 1;
    }

    resetDaysElapsed() {
        this.setState({
            thetaShift: this.state.observerPlanetAngle,
            days: 0,
            cyclesCompleted: 0,
        })
    }

    updateCycles(prevAng, newAng) {
        // Ensures that the angle + the shift is within range: [-180, 180]
        let adjustedAngle = (angle) => angle > 0 ? angle : (2 * Math.PI + angle);

        // Returns true if in the right quadrant
        let inFirstQuadrant = (angle) => (angle > 0) && (angle < (Math.PI / 2));
        let inFourthQuadrant = (angle) => (angle < (2 * Math.PI) + 0.1) && (angle > (3 * Math.PI / 2));

        let newAngle = adjustedAngle(newAng - this.state.thetaShift);
        let prevAngle = adjustedAngle(prevAng - this.state.thetaShift);

        let newCycleCount = this.state.cyclesCompleted;

        if (inFirstQuadrant(newAngle) && inFourthQuadrant(prevAngle)) { newCycleCount += 1; }
        else if (inFirstQuadrant(prevAngle) && inFourthQuadrant(newAngle)) { newCycleCount -= 1; }

        this.setState({ cyclesCompleted: newCycleCount });
    }

    incrementDays() {
        let ang = this.state.observerPlanetAngle;
        const earthYear = 365;
        ang -= this.state.thetaShift;
        let elapsed = (ang / (2 * Math.PI)) * earthYear;
        if (ang < 0) {
            elapsed = ((2 * Math.PI + ang) / (2 * Math.PI)) * earthYear;
        }
        elapsed *= (1 / this.state.observerMultiplier);
        return elapsed;
    }

    incrementObserverPlanetAngle(n, inc) {
        const newAngle = n + (this.state.observerMultiplier * inc);
        if (newAngle > Math.PI) {
            return newAngle * -1;
        }

        this.updateCycles(this.state.observerPlanetAngle, newAngle);
        return newAngle;
    }

    incrementTargetPlanetAngle(n, inc) {
        const newAngle = n + (this.state.targetMultiplier * inc);
        if (newAngle > Math.PI) {
            return newAngle * -1;
        }
        return newAngle;
    }

    animate() {
        const me = this;
        this.updateMultiplier();

        let newObserverAngle = me.incrementObserverPlanetAngle(this.state.observerPlanetAngle,
            0.0115 * this.state.animationRate);
        let newTargetAngle = me.incrementTargetPlanetAngle(this.state.targetPlanetAngle,
            0.0115 * this.state.animationRate);

        this.setState({
            observerPlanetAngle: newObserverAngle,
            targetPlanetAngle: newTargetAngle,
            days: me.incrementDays()
        });

        this.raf = requestAnimationFrame(this.animate.bind(this));
    }

    onStartClick() {
        if (!this.state.isPlaying) {
            this.raf = requestAnimationFrame(this.animate.bind(this));
            this.setState({
                isPlaying: true,
                startBtnText: 'Pause animation'
            });
        } else {
            this.stopAnimation();
            this.setState({
                isPlaying: false,
                startBtnText: 'Play animation'
            });
        }
    }

    updateAngles(targetAng, sunAng, elongationAng, obsAngT, sunAngT) {
        if (this.state.elongationAngle !== elongationAng) {
            this.setState({
                targetAngle: targetAng,
                sunAngle: sunAng,
                elongationAngle: elongationAng,
                obsAngleTarget: obsAngT,
                sunAngleTarget: sunAngT,
            });
        }
    }

    updateMultiplier() {
        let newObserver = Math.pow(this.state.radiusObserverPlanet, -1.5);
        let newTarget = Math.pow(this.state.radiusTargetPlanet, -1.5);

        this.setState({
            targetMultiplier: newTarget,
            observerMultiplier: newObserver,
        });
    }

    onObserverPlanetAngleUpdate(newAngle) {
        this.stopAnimation();
        let newAng = newAngle;
        let prevObserverPlanetAng = this.state.observerPlanetAngle;

        this.updateCycles(prevObserverPlanetAng, newAng);
        this.setState({
            isPlaying: false,
            observerPlanetAngle: newAngle,
            // targetPlanetAngle: newTargetPlanet,
            days: this.incrementDays()
        });
        // console.log(`new obs angle: ${this.state.observerPlanetAngle * 180 / Math.PI}, new target angle: ${this.state.targetPlanetAngle * 180 / Math.PI}`);
    }

    onTargetPlanetAngleUpdate(newAngle) {
        this.stopAnimation();

        this.setState({
            isPlaying: false,
            targetPlanetAngle: newAngle,
            // observerPlanetAngle: newObserverPlanet,
            days: this.incrementDays()
        });
    }

    onAnimationRateChange(e) {
        this.setState({
            animationRate: forceNumber(e.target.value)
        });
    }

    onPresetSelectObserver(e) {
        const chosenOption = parseInt(e.target.value);

        let name;
        if (chosenOption === 0) {
            this.onObserverPlanetRadiusChange(1.00);
            name = "observer planet";
        } else if (chosenOption === 1) {
            this.onObserverPlanetRadiusChange(0.39);
            name = "observer (mercury)";
        } else if (chosenOption === 2) {
            this.onObserverPlanetRadiusChange(0.72);
            name = "observer (venus)";
        } else if (chosenOption === 3) {
            this.onObserverPlanetRadiusChange(1.00);
            name = "observer (earth)";
        } else if (chosenOption === 4) {
            this.onObserverPlanetRadiusChange(1.52);
            name = "observer (mars)";
        } else if (chosenOption === 5) {
            this.onObserverPlanetRadiusChange(5.20);
            name = "observer (jupiter)";
        } else if (chosenOption === 6) {
            this.onObserverPlanetRadiusChange(9.54);
            name = "observer (saturn)";
        } else {
            name = "observer planet";
        }

        this.setState({
            observerName: name,
            optionObserver: e.target.value
        });

    }

    onPresetSelectTarget(e) {
        const chosenOption = parseInt(e.target.value);
        let name;

        if (chosenOption === 0) {
            this.onTargetPlanetRadiusChange(2.40);
            name = "target planet";
        } else if (chosenOption === 1) {
            this.onTargetPlanetRadiusChange(0.39);
            name = "target (mercury)";
        } else if (chosenOption === 2) {
            this.onTargetPlanetRadiusChange(0.72);
            name = "target (venus)";
        } else if (chosenOption === 3) {
            this.onTargetPlanetRadiusChange(1.00);
            name = "target (earth)";
        } else if (chosenOption === 4) {
            this.onTargetPlanetRadiusChange(1.52);
            name = "target (mars)";
        } else if (chosenOption === 5) {
            this.onTargetPlanetRadiusChange(5.20);
            name = "target (jupiter)";
        } else if (chosenOption === 6) {
            this.onTargetPlanetRadiusChange(9.54);
            name = "target (saturn)";
        } else {
            name = "target planet";
        }

        this.setState({
            targetName: name,
            optionTarget: e.target.value,
        });
    }

    onObserverPlanetRadiusChange(e, maxPix) {
        let au;

        let maximumPixel = this.state.maximumPixelRadius;
        if (maxPix) {
            maximumPixel = maxPix;
        }

        if (typeof(e) === 'object') {
            au = e.target.value;
            this.setState({
                observerName: "observer planet",
                holdObserver: au,
            });
        } else {
            au = e;
            this.setState({
                holdObserver: au,
            });
        }

        if (au >= this.state.radiusTargetPlanet) {
            this.changeTarget(au, maximumPixel);
        } else {
            let ratio = (au / this.state.radiusTargetPlanet) * maximumPixel;
            this.setState({
                radiusPixelObserver: forceNumber(ratio),
                radiusObserverPlanet: forceNumber(au),
                radiusPixelTarget: maximumPixel,
            });
        }

        this.setState({
            optionObserver: 7,
        });

        this.resetDaysElapsed();
        this.updateMultiplier();
    }

    changeObserver(au, maximumPixel) {
        let ratio = (this.state.radiusObserverPlanet / au) * maximumPixel;

        this.setState({
            radiusTargetPlanet: forceNumber(au),
            radiusPixelObserver: forceNumber(ratio),
            radiusPixelTarget: maximumPixel,
        });
    }

    onTargetPlanetRadiusChange(e, maxPix) {
        let au = 0;

        let maximumPixel = this.state.maximumPixelRadius;
        if (maxPix) {
            maximumPixel = maxPix;
        }

        if (typeof(e) === 'object') {
            au = e.target.value;
            this.setState({
                targetName: "target planet",
                holdTarget: au,
            });
        } else {
            au = e;
            this.setState({
                holdTarget: au,
            });
        }

        if (au >= this.state.radiusObserverPlanet) {
            this.changeObserver(au, maximumPixel);
        } else {
            let ratio = (au / this.state.radiusObserverPlanet) * maximumPixel;
            this.setState({
                radiusPixelTarget: forceNumber(ratio),
                radiusTargetPlanet: forceNumber(au),
                radiusPixelObserver: maximumPixel,
            });
        }

        this.setState({
            optionTarget: 7
        });

        this.updateMultiplier();
    }

    changeTarget(au, maximumPixel) {
        let ratio = (this.state.radiusTargetPlanet / au) * maximumPixel;

        this.setState({
            radiusObserverPlanet: forceNumber(au),
            radiusPixelTarget: forceNumber(ratio),
            radiusPixelObserver: maximumPixel,
        });
    }

    showOrbits(e) {
        this.setState({
            labelOrbits: !this.state.labelOrbits
        });
    }

    showElongationAngle(e) {
        this.setState({
            showElongation: !this.state.showElongation
        });
    }

    stopAnimation() {
        cancelAnimationFrame(this.raf);
    }

    onResetClick(e) {
        e.preventDefault();
        this.stopAnimation();
        this.setState(this.initialState);
    }

    onSubmitObserver(e) {
        e.preventDefault();
        this.onObserverPlanetRadiusChange(this.state.holdObserver);
    }

    onSubmitTarget(e) {
        e.preventDefault();
        this.onTargetPlanetRadiusChange(this.state.holdTarget);
    }

    changeValObserver(e) {
        let enteredValue = e.target.value;

        // This functionality ensures you cannot
        // enter the same radius value for both
        // target and observer. But since the Prof didn't want it,
        // it's commented out for now.

        // let otherVal = this.state.holdTarget;
        // if (enteredValue == otherVal) {
        //     if (otherVal == 10.0) {
        //         enteredValue -= 0.01;
        //     } else {
        //         enteredValue += 0.01;
        //     }
        // }

        this.setState({holdObserver: enteredValue});
    }

    changeValTarget(e) {
        let enteredValue = e.target.value;

        // This functionality ensures you cannot
        // enter the same radius value for both
        // target and observer. But since the Prof didn't want it,
        // it's commented out for now.

        // let otherVal = this.state.holdObserver;
        // if (enteredValue == otherVal) {
        //     if (otherVal == 10.0) {
        //         enteredValue -= 0.01;
        //     } else {
        //         enteredValue += 0.01;
        //     }
        // }

        this.setState({holdTarget: enteredValue});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}

const domContainer = document.querySelector('#sim-container');
ReactDOM.render(<PlanetaryConfigSim />, domContainer);
