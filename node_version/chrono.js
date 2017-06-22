let chrono_start = 0,
  chrono_end = 0,
  amount_total = 0;

function start() {
  chrono_start = Date.now();
}

function stop() {
  chrono_end = Date.now();
}

function get_result() {
  let t = chrono_end - chrono_start;
  amount_total += t;
  return t;
}

function get_total() {
  return amount_total;
}

module.exports = { start, stop, get_result, get_total };
