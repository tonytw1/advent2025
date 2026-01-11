import { part1 } from './day8';

test('day8 part 1', () => {
  expect(part1('day8-example.txt', 10)).toBe(40);
  expect(part1('day8.txt', 1000)).toBe(66640);
});
