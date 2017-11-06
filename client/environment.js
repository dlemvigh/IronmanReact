import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import network from './network';

const source = new RecordSource();
const store = new Store(source);
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store,
});

export default environment;
