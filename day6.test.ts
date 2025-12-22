import { part1, part2 } from './day6';

test('day6 part 1', () => {
  expect(part1('day6-example.txt')).toBe(4277556);
  expect(part1('day6.txt')).toBe(4878670269096);
});

test('day6 part 2', () => {
  expect(part2('day6-example.txt')).toBe(3263827);
  expect(part2('day6.txt')).toBe(8674740488592);
});
