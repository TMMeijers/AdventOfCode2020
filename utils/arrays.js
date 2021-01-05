function range(total, start = 0) {
  const val = Array.from({ length: total }, (_, i) => i + start)
  console.warn(val)
  return val
}

module.exports.
