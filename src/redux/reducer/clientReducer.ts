import { IClient } from '../../interface';

const initState: IClient = {
  displayName: '',
  email: '',
  connect: [],
  photoUrl: '',
};
export default function filtersReducer(
  state: IClient = initState,
  action: any
) {
  switch (action.type) {
    default:
      return state;
  }
}
