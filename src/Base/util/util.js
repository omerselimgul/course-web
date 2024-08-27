const resizeBreakpoint = ({ xs, md, lg }, defaultValue) => {
  return {
    md: md || xs || defaultValue || 12,
    lg: lg || md || xs || defaultValue || 12,
    xs: lg || md ? xs : 12,
  };
};

export { resizeBreakpoint };
