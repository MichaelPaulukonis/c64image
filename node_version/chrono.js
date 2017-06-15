
let chrono_start = 0,
    chrono_end = 0;

function start() {
    chrono_start = Date.now();
}

function stop() {
    chrono_end = Date.now();
}

function get_result() {
    return chrono_end - chrono_start;
}

module.exports = { start, stop, get_result };