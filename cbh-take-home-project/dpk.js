const crypto = require("crypto");


// Function which checks to see if candidate's length is greater than
// 256 and if so => creates a hash
function updateMaxLength (candidate) {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate;

  // trivial partition key case
  if (event == undefined) {
    candidate = TRIVIAL_PARTITION_KEY
    return candidate
  }

  // partition key case
  if (event && event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    candidate = updateMaxLength(candidate)
    return candidate
  }

  // string case
  if (event && typeof event == "string") {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    candidate = updateMaxLength(candidate)
    return candidate
  }

  // number case
  if (event && typeof event !== "string") {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    candidate = updateMaxLength(candidate)
    return candidate;
  }
};