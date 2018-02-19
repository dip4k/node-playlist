const expect = require("expect");
const utils = require("./utils");

it("should add two numbers", () => {
  const res = utils.add(10, 23);

  // if (res !== 33) {
  //   throw new Error(`Expected 33 but got ${res}.`);

  expect(res)
    .toBe(33)
    .toBeA("number");
});
it("should square a number", () => {
  const res = utils.sqr(5);
  expect(res).toBe(25);

  // if (res !== 25) {
  //   throw new Error(`Expected (sqr of 5) 25 but got ${res}`);
  // }
});

// it("should be some test", () => {
//   // expect(10).toNotBe(20);
//   // expect({ name: "dc" }).toNotEqual({ name: "dc" });
//   // expect({ name: "dc" }).toEqual({ name: "dc" });
//   // expect({ name: "dc", age: 24, add: "pune" }).toInclude({ age: 24 });
// });

it("should verify firstName and lastName are set", () => {
  const res = utils.user("dipak chauhan");

  // expect(res).toEqual({ fName: "dipak", lName: "chauhan" });

  expect(res).toInclude({ fName: "dipak", lName: "chauhan" });
});
