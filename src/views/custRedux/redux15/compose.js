export default function compoose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0](arguments);
  }

  return funcs.reduce((a, b) => (...args) => {
    a(b(arguments));
  });
}
