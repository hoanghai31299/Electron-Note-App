import { SET_USER } from './../action';
import { IClient } from '../../interface';

const initState: IClient = {
  email: '',
  id: '',
};
export default function clientReducer(state: IClient = initState, action: any) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
