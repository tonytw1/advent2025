import { part1, part2 } from './day3';

test('day3 part 1', () => {
  expect(part1('day3-example.txt')).toBe(357);
  expect(part1('day3.txt')).toBe(17166);
});

test('day3 part 2', () => {
  expect(part2('day3-example.txt')).toBe(3121910778619);
  expect(part2('day3.txt')).toBe(169077317650774);
});



