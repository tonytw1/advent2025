import { part1, part2 } from './day2';

test('day2 part 1', () => {
  expect(part1('day2-example.txt')).toBe(1227775554);
  expect(part1('day2.txt')).toBe(56660955519);
});

test('day2 part 2', () => {
  expect(part2('day2-example.txt')).toBe(4174379265);
  expect(part2('day2.txt')).toBe(79183223243);
});


