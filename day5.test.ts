import { part1, part2 } from './day5';

test('day5 part 1', () => {
  expect(part1('day5-example.txt')).toBe(3);
  expect(part1('day5.txt')).toBe(623);
});

test('day5 part 2', () => {
  expect(part2('day5-example.txt')).toBe(14);
  // 325034395180875 too low
  expect(part2('day5.txt')).toBe(353507173555373);
});
