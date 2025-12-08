import { part1, part2 } from './day1';

test('day1 part 1', () => {
  expect(part1('day1-example.txt')).toBe(3);
  expect(part1('day1.txt')).toBe(969);
});

test('day1 part 2', () => {
  expect(part2('day1-example.txt')).toBe(6);
  expect(part2('day1.txt')).toBe(5887);
});
