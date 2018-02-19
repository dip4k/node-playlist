const utils = require("./utils");

it("should add two numbers", () => {
  const res = utils.add(10, 23);
  if (res !== 33) {
    throw new Error(`Expected 33 but got ${res}.`);
  }
});

it("should square a number", () => {
  const res = utils.sqr(5);
  if (res !== 25) {
    throw new Error(`Expected (sqr of 5) 25 but got ${res}`);
  }
});
