import { part1, part2 } from './day7';

test('day7 part 1', () => {
  expect(part1('day7-example.txt')).toBe(21);
  expect(part1('day7.txt')).toBe(1541);
});

test('day7 part 2', () => {
  expect(part2('day7-example.txt')).toBe(40);
  expect(part2('day7.txt')).toBe(80158285728929);
});

