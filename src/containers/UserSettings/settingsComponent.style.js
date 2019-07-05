import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const SettingsComponentWrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 300px;
  background: none;

  @media only screen and (max-width: 767px) {
    padding: 40px 20px;
    height: auto;
    flex-direction: column;

    &.ant-layout.ant-layout-has-sider {
      flex-direction: column;
    }
  }

  @media only screen and (min-width: 767px) and (max-width: 990px) {
    padding: 50px 20px;
  }

  .isoAlGridContents {
    width: 100%;
    padding: 10px 10px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;

    .isoAlGridName {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 5px;

      font-size: 14px;
      font-weight: 700;
      color: ${palette('text', 0)};
      line-height: 1.3;

      h2 {
        margin-top: 20px;
      }
    }

    .isoSelectButton {
      text-align: center;
      margin-top: 25px;

      button {
        background-color: ${palette('primary', 9)} !important;
      }

      h2 {
        color: ${palette('primary', 9)} !important;
      }
    }

    .isoAlGridPriceRating {
      display: flex;
      align-items: center;

      .isoAlGridPrice {
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        padding: 5px 10px;
        line-height: 1;
        position: absolute;
        top: 30px;
        right: 10px;
        background-color: ${palette('primary', 9)};
        ${borderRadius('3px 0 0 3px')};
      }

      .isoAlGridRating {
        display: none;
        .ant-rate {
          display: flex;
          .ant-rate-star {
            font-size: 9px;
            margin-right: 2px;
          }
        }
      }
    }

    .isoAlGridDescription {
        font-size: 13px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: 1.5;
    }
  }

  &:hover {
    .isoAlGridImage {
      &:after {
        opacity: 1;
      }

      .isoAlAddToCart {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
  .isoNoteListSidebar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    ${'' /* height: 100%; */} background: #ffffff;
    border-right: ${props => (props['data-rtl'] === 'rtl' ? 0 : 1)}px solid
      ${palette('border', 0)};
    border-left: ${props => (props['data-rtl'] === 'rtl' ? 1 : 0)}px solid
      ${palette('border', 0)};

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      width: 260px !important;
      flex: 0 0 260px !important;
      max-width: none !important;
      min-width: 0 !important;
    }
    @media only screen and (max-width: 767px) {
      width: auto !important;
      max-width: 100% !important;
      min-width: 0 !important;
      margin-bottom: 30px;
      flex: 0 !important;
      overflow: hidden;
      overflow-y: auto;
    }
  }

  .isoNotepadWrapper {
    background: #ffffff;

    .isoHeader {
      height: auto;
      line-height: inherit;
      padding: 20px 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      background-color: #ffffff;
      border-bottom: 1px solid ${palette('border', 0)};

      @media only screen and (max-width: 480px) {
        padding: 20px;
      }

      @media only screen and (max-width: 400px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      .isoColorChooseWrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        margin-right: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : 'auto'};
        margin-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'auto' : 'inherit'};

        span {
          font-size: 13px;
          color: ${palette('grayscale', 0)};
        }

        .isoColorChooser {
          width: 20px;
          height: 20px;
          cursor: pointer;
          border: 0;
          margin: ${props =>
            props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
          padding: 0;
          ${borderRadius('3px')};
        }
      }

      .isoAddNoteBtn {
        background-color: ${palette('primary', 0)};
        border: 0;
        padding: 5px 15px;
        margin-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : 'auto'};
        margin-right: ${props =>
          props['data-rtl'] === 'rtl' ? 'auto' : 'inherit'};
        ${borderRadius('3px')};
        ${transition()};

        @media only screen and (max-width: 400px) {
          margin: ${props =>
            props['data-rtl'] === 'rtl' ? '15px 0 0 0' : '15px 0 0 0'};
        }

        span {
          font-size: 12px;
          font-weight: 400;
          padding: 0;
          text-transform: uppercase;
          color: #ffffff;
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }

    .isoNoteEditingArea {
      display: flex;
      height: 100%;

      @media (max-width: 800px) {
        height: 300px;
      }

      .isoNoteTextbox {
        font-size: 14px;
        color: ${palette('text', 2)};
        line-height: 24px;
        width: 100%;
        height: calc(100% - 30px);
        border: 0;
        outline: 0;
        padding: 20px 30px;
        resize: none;

        &:focus {
          box-shadow: none;
        }

        @media only screen and (max-width: 480px) {
          padding: 20px;
        }
      }
    }

    @media (max-width: 767px) {
      .isoNoteListSidebar.ant-layout-sider {
        width: auto !important;
        margin-bottom: 30px;
        flex: 0 0 450px !important;
      }
    }
  }
`;

const SettingsListSidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 160px);

  @media only screen and (max-width: 767px) {
    max-height: 60vh;
  }

  .isoSearchNotes {
    .ant-input {
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      color: ${palette('text', 0)};
      line-height: inherit;
      height: 77px;
      padding: 0 15px;
      padding-left: ${props => (props['data-rtl'] === 'rtl' ? '15px' : '35px')};
      padding-right: ${props =>
        props['data-rtl'] === 'rtl' ? '35px' : '15px'};
      border: 0;
      border-bottom: 1px solid rgba(230, 230, 230, 0.7);
      outline: 0 !important;
      overflow: hidden;
      background-color: #ffffff;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      border-radius: 0;
      box-shadow: none;
      ${transition()};

      @media only screen and (max-width: 767px) {
        height: 50px;
      }
    }

    &:hover,
    &:focus {
      .ant-input {
        border-color: rgba(230, 230, 230, 0.7) !important;
      }
    }
  }

  .ant-input-suffix {
    left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '10px')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '10px' : 'auto')};
    color: ${palette('grayscale', 0)};
  }

  .isoNoteList {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow: hidden;
    overflow-y: auto;

    .isoList {
      width: 100%;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      flex-shrink: 0;
      padding: 0;
      border-bottom: 1px solid ${palette('border', 0)};
      text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
      position: relative;

      &.active {
        background-color: ${palette('secondary', 1)};
      }

      .isoNoteBGColor {
        width: 5px;
        display: flex;
        margin: ${props =>
          props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
        flex-shrink: 0;
      }

      .isoNoteText {
        width: calc(100% - 60px);
        margin: ${props =>
          props['data-rtl'] === 'rtl' ? '0 0 0 20px' : '0 20px 0 0'};
        padding: 20px 0;
        cursor: pointer;

        h3 {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: ${palette('secondary', 2)};
          font-weight: 500;
        }

        .isoNoteCreatedDate {
          font-size: 13px;
          color: ${palette('grayscale', 0)};
        }
      }

      .isoDeleteBtn {
        width: 24px;
        height: 24px;
        background-color: transparent;
        flex-shrink: 0;
        position: absolute;
        top: 5px;
        right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '5px')};
        left: ${props => (props['data-rtl'] === 'rtl' ? '5px' : 'inherit')};
        padding: 0;
        border: 0;
        font-size: 14px;
        color: ${palette('grayscale', 0)};
        ${transition()};

        &:hover {
          color: ${palette('primary', 0)};
        }
      }
    }

    .isoNotlistNotice {
      font-size: 14px;
      font-weight: 400;
      color: ${palette('grayscale', 0)};
      line-height: inherit;
      padding: 30px 20px;
    }

    .isoNoResultMsg {
      padding: 15px 20px;
      text-align: center;
      color: ${palette('secondary', 2)};
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

export default WithDirection(SettingsComponentWrapper);
const SettingsListWrapper = WithDirection(SettingsListSidebar);
export { SettingsListWrapper };
