const addNumber = (num1: number, num2: number) => {
  return num1 + num2;
};
// Testcase
describe('Example Test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
  });
  it('Add two numbers', () => {
    expect(addNumber(2, 2)).toEqual(4);
  });
});
