import React, { Component } from "react";
import { timeDifference } from "../../helpers/utility";
import { InputSearch } from "../../components/uielements/input";
import { NoteListWrapper } from "./noteComponent.style";
import Scrollbars from "../../components/utility/customScrollBar.js";

function filterNotes(notes, search) {
  search = search.toUpperCase();
  if (search) {
    return notes.filter(note => note.message.toUpperCase().includes(search));
  }
  return notes;
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.singleNote = this.singleNote.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: ""
    };
  }
  singleNote(note) {
    const { selectedId, changeNote } = this.props;

    const activeClass = selectedId === note.id ? "active" : "";
    const onChange = () => changeNote(note.id);
    return (
      <div className={`isoList ${activeClass}`} key={note.id}>
        <div
          className="isoNoteBGColor"
          style={{ width: "5px", background: note && !note.viewed ? '#42a5f5' : '' }}
        />
        <div className="isoNoteText" onClick={onChange}>
          <h3>{note.notification_type ? note.notification_type.name : 'Notification'}</h3>
          <span className="isoNoteCreatedDate">
            {timeDifference(note.created_at)}
          </span>
        </div>
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const notes = filterNotes(this.props.notes, search);
    return (
      <NoteListWrapper className="isoNoteListWrapper">
        <InputSearch
          placeholder="Search Notifications"
          className="isoSearchNotes"
          value={search}
          onChange={this.onChange}
        />
        <div className="isoNoteList">
          {notes && notes.length > 0 ? (
            <Scrollbars>{notes.map(note => this.singleNote(note))}</Scrollbars>
          ) : (
            <span className="isoNoResultMsg">No notifications found</span>
          )}
        </div>
      </NoteListWrapper>
    );
  }
}
