module.exports = function range(total, start = 0) {
  return Array.from({ length: total }, (_, i) => i + start)
}
