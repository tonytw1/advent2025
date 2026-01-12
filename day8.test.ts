import { part1, part2 } from './day8';

test('day8 part 1', () => {
  expect(part1('day8-example.txt', 10)).toBe(40);
  expect(part1('day8.txt', 1000)).toBe(66640);
});

test('day8 part 2', () => {
  expect(part2('day8-example.txt')).toBe(25272);
  expect(part2('day8.txt')).toBe(78894156);
});
