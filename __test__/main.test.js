const formatVolumeIconPath = require('../assets/scripts/main');
describe('test formatVolumeIconPath', () => {
  test('volume > 66', () => {
    expect(formatVolumeIconPath(67)).toMatch('3');
  });

  test('33 < volume <= 66', () => {
    expect(formatVolumeIconPath(50)).toMatch('2');
  });

  test('0 < volume <= 33', () => {
    expect(formatVolumeIconPath(10)).toMatch('1');
  });

  test('volume = 0', () => {
    expect(formatVolumeIconPath(0)).toMatch('0');
  });

});
