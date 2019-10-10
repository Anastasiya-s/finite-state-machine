class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.state = config.initial;
        this.states = config.states;
        this.progress = [config.initial];
        this.canceledStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.states).includes(state)) {
            this.state = state;
            this.progress.push(state);
        } else throw Error("") 
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let currentState = this.states[this.state]
        if(Object.keys(currentState.transitions).includes(event)) {
            this.state = currentState.transitions[event];
            this.progress.push(currentState.transitions[event]);
        } else throw Error("")
    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.progress.splice(1, this.progress.length - 1);
        return this.state = this.progress[0];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event) {
            return Object.entries(this.states)
                        .filter(item=> Object.keys(item[1].transitions).includes(event))
                        .map(item => item[0])
        } else return Object.keys(this.states);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.progress.length > 1) {
            const last = this.progress.pop()
           this.canceledStates.push(last)
           this.state = this.progress[this.progress.length - 1];
           return true; 
        } else return false
    }
    
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.canceledStates.length > 0) {
            let next = this.canceledStates.pop();
           
            this.state = next;
            this.progress.push(next)
            return true;
        } else return false
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.progress = [];
        this.currentStep = 0;

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
