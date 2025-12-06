import { day1 } from './day1';

test('day1 part 1', () => {
  expect(day1('day1-example.txt')).toBe(3);
  expect(day1('day1.txt')).toBe(969);
});
