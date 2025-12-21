import { part1, part2 } from './day4';

test('day4 part 1', () => {
  expect(part1('day4-example.txt')).toBe(13);
  expect(part1('day4.txt')).toBe(1551);
});

test('day4 part 2', () => {
  expect(part2('day4-example.txt')).toBe(43);
  expect(part2('day4.txt')).toBe(9784);
});


