

function objectEntries(obj) {
  let index = 0;

        // In ES6, you can use strings or symbols as property keys,
        // Reflect.ownKeys() retrieves both
  const propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < propKeys.length) {
        const key = propKeys[index];
        index += 1;
        return { value: [key, obj[key]] };
      }
      return { done: true };
    }
  };
}

export default { objectEntries };
