import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../../settings/withDirection';

const CardWidgetWrapper = styled.div`
  width: 100%;
  min-height: 126px;
  padding: 20px 30px 20px 20px;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${palette('border', 2)};
  display: flex;
  align-items: center;

  .isoIconWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props =>
      props['data-rtl'] === 'rtl'
        ? '20px 20px 20px 30px'
        : '20px 30px 20px 20px'};

    i {
      font-size: 36px;
    }
  }

  .isoListingContentWrapper {
    display: flex;
    align-items: top;
    justify-content: left;
    padding: ${props =>
      props['data-rtl'] === 'rtl'
        ? '10px 20px 10px 0'
        : '10px 30px 10px 0'};

    i {
      font-size: 15px;
    }
  }

  .spacer {
    padding-top: 30px;
  }

  .isoContentWrapper {
    .isoStatNumber {
      font-size: 19px;
      color: ${palette('text', 0)};
      font-weight: 500;
      line-height: 1.2;
      margin: 0 0 10px;
    }

    .isoLabel {
      font-size: 14px;
      color: ${palette('text', 2)};
      font-weight: 400;
      margin: 0;
      text-transform: uppercase;
    }
  }

  .isoListingWrapper {
    padding-right: 10px;
    .isoStatNumber {
      font-size: 19px;
      color: ${palette('text', 0)};
      font-weight: 500;
      line-height: 1.2;
      margin: 0 0 10px;
    }

    .isoLabel {
      font-size: 14px;
      color: ${palette('text', 2)};
      font-weight: 400;
      margin: 0;
      text-transform: uppercase;
    }
  }
`;

export default WithDirection(CardWidgetWrapper);
