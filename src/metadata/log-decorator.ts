export function Log(target: Object, key: string, descriptor: any) {
  let originalMethod = descriptor.value
  descriptor.value = (...args: any[]) => {
    let a = args.map(a => JSON.stringify(a)).join();
    let result = originalMethod.apply(this, args);
    let r = JSON.stringify(result);
    console.log(`Call: ${key}(${a}) => ${r}`);
    return result;
  }
  return descriptor;

}

export function Log1(target: Object, key: string, descriptor: any) {
  return {
    value: (...args: any[]) => {
      let a = args.map(a => JSON.stringify(a)).join();
      let result = descriptor.value.apply(this, args);
      let r = JSON.stringify(result);
      console.log(`Call: ${key}(${a}) => ${r}`);
      return result;
    }
  };

}

export function LogProperty(target: any, key: string) {
  let _val = target[key];

  var getter = () => {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  }

  var setter = (newVal) => {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  }

  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }

}

export function logClass(target: any) {

  var original = target;
  function construct(constructor, args) {
    var c: any = () => constructor.apply(original, args);
    c.prototype = constructor.prototype;
    return new c();
  }

  var f: any = (...args) => {
    console.log(`New: ${original.name}`);
    return construct(original, args);
  }

  f.prototype = original.prototype;
  return f;
}
