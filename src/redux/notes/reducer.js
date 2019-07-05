import notes from '../../containers/Notes/fakeData';
import actions from './actions';

const initState = {
  notes,
  selectedId: notes[0].id
};

export default function noteReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_NOTE:
      return {
        ...state,
        selectedId: action.selectedId
      };
    default:
      return state;
  }
}
