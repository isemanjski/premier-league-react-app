import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// tslint:disable-next-line
(<any> global).requestAnimationFrame = function (callback: any) {
  setTimeout(callback, 0);
};
