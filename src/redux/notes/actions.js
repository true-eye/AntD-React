const notesAction = {
  CHANGE_NOTE: 'CHANGE_NOTE',

  changeNote: id => {
    return (dispatch, getState) => {
      // const notes = getState().Notes.notes;
      // const seectedColor = notes[notes.findIndex(note => note.id === id)].color;
      dispatch({
        type: notesAction.CHANGE_NOTE,
        selectedId: id
      });
    };
  }
};
export default notesAction;
