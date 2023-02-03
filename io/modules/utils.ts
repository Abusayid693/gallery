export const generateChokidarWatchPattern = (arr: string[]) => {
  // ['./**/*.png', './**/*.svg']
  return arr.map(item => './**/*.' + item);
};
