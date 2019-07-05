import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import noteActions from '../../redux/notes/actions';
import NoteList from './noteList';
import NoteComponentWrapper from './noteComponent.style';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import PageHeader from "../../components/utility/pageHeader";
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';

const { changeNote } = noteActions;
const { Content } = Layout;
class UserNotification extends Component {

  render() {
    const {
      user,
      selectedId,
      changeNote
    } = this.props;
    const { colStyle, gutter } = basicStyle;

    const selectedNote =
      selectedId !== undefined
        ? user ? user.user_notifications.filter(note => note.id === selectedId)[0] : null
        : null;

    return (
      <LayoutWrapper>
        <PageHeader>User Notifications</PageHeader>
        <Row gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <NoteComponentWrapper className="isomorphicNoteComponent">
              <div style={{ width: '340px' }} className="isoNoteListSidebar">
                {user && (
                  <NoteList
                    notes={user.user_notifications}
                    selectedId={selectedId}
                    changeNote={changeNote}
                  />
                )}
              </div>
              <Layout className="isoNotepadWrapper">
                <Content className="isoNoteEditingArea">
                  {selectedId !== undefined && selectedNote !== undefined && selectedNote !== null ? (
                    <div className="isoNoteTextbox">
                      <span dangerouslySetInnerHTML={{__html: selectedNote.message}} />
                    </div>
                  ) : (
                    ''
                  )}
                  {/*{selectedId !== undefined ? <span>{`created at ${selectedNote.createTime}`}</span> : ''}*/}
                </Content>
              </Layout>
            </NoteComponentWrapper>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { selectedId } = state.Notes;

  return {
    selectedId,
    user: state.Auth.currentUser
  };
}
export default connect(
  mapStateToProps,
  {
    changeNote,
  }
)(UserNotification);
