import { part1 } from './day2';

test('day2 part 1', () => {
  expect(part1('day2-example.txt')).toBe(1227775554);
  expect(part1('day2.txt')).toBe(56660955519);
});
