const createPortal = (children) => children;
const createRoot = () => ({
  render: () => {},
  unmount: () => {},
});

module.exports = {
  createPortal,
  createRoot,
  hydrateRoot: createRoot,
};
