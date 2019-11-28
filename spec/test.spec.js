console.log("before describe, i made another change");
describe("test", () => {
  console.log("start of describe");
  it("passes", () => {
    console.log("start of first test");
    expect(true).toBeTruthy;
    console.log("end of first test");
  })
  console.log("end of describe");
})