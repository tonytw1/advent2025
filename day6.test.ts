import { part1 } from './day6';

test('day6 part 1', () => {
  expect(part1('day6-example.txt')).toBe(4277556);
  expect(part1('day6.txt')).toBe(4878670269096);
});