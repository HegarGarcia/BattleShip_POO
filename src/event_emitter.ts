let indexOf;

if (typeof Array.prototype.indexOf === "function") {
    indexOf = (haystack, needle) => haystack.indexOf(needle);
} else {
    indexOf = (haystack, needle) => {
        let found = false;
        let i = 0;
        let idx = -1;
        const length = haystack.length;

        while (i < length && !found) {
            if (haystack[i] === needle) {
                idx = i;
                found = true;
            }

            i++;
        }

        return idx;
    };
}

export class EventEmitter {
    private events;
    constructor() {
        this.events = {};
    }

    public on(event, listener) {
        if (typeof this.events[event] !== "object") {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    public removeListener(event, listener) {
        let idx;

        if (typeof this.events[event] === "object") {
            idx = indexOf(this.events[event], listener);

            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    public emit(event, listener) {
        const args = [].slice.call(arguments, 1);
        let i;
        let length;
        let listeners;

        if (typeof this.events[event] === "object") {
            listeners = this.events[event].slice();
            length = listeners.length;

            for (i = 0; i < length; i++) {
                listeners[i].apply(this, args);
            }
        }
    }

    public once(event, listener) {
        this.on(event, function g () {
            this.removeListener(event, g);
            listener.apply(this, arguments);
        });
    }
}
