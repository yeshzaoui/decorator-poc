import {Log1, Log, LogProperty, logClass} from './metadata/log-decorator';
import {Map} from 'immutable';

@logClass
export class Foo {

  public bar: Map<string, string>;

  constructor() {
  }

  @Log1
  public addTwo(bar: number): number {
    return bar + 2;
  }

}

var foo = new Foo();

var buz = foo.addTwo(3);
console.log(buz);
foo.bar = Map({ 'ismail': 'zeevi' });

var map = foo.bar.set('ismail', 'zaoui');
console.log(foo.bar);
console.log(map);
