const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hash when given a string as input", () => {
    const hashKey = deterministicPartitionKey("dog");
    expect(hashKey).toBe("588a785bcb835bc02048395fbaf47ac1b1716cd13878b2bf7a4e26e5931bbd8e9717c0e96e3740affa6c231ce1498384a597cff425fa05eb2e3482694f1da01f");
  });

  it("Returns partitionKey when using a partitionKey", () => {
    const event = {partitionKey: 'test'}
    const stringKey = deterministicPartitionKey(event);
    expect(stringKey).toBe("test");
  });
  
  it("Converts to a string and then hashes if input is not a string", () => {
    const input = 9
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe("b55cf27ef01025e3c761a579a63d1c7c1e54e2d12f8f2928c90f5f5516b0d9c71f2fac9e7ccf28c5adf33c3f78d9548ebfed2dc46dea944aed336d1650721487");
  });

  it("Converts partition key to a string", () => {
    const event = {partitionKey: 9}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("9");
  });

  it("Uses hash if candidate is > 256", () => {
    const event = {partitionKey: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("74a7c7efaea5ec1ab3c703f870b70d974ab7bfa91c84418a73dad200da419d798d6d1f2241227327b75cf07cbe150ee37b6dbc11ee13117541c734927275cd3c");
  });
});
