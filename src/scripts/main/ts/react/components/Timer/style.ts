import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const StyledModal = styled.div`
  padding: 2em;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #282c35;
  width: 95%;
  max-width: 800px;
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translatex(-50%);

  .time {
    font-size: 48px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 2.5em;

    @media (min-width: 768px) {
      font-size: 5.5em;
    }
  }

  .time-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto 20px;

    @media (min-width: 425px) {
      justify-content: center;
    }

    li {
      border: 1px solid #282c35;
      text-align: center;
      padding: 6px;
      border-radius: 22px;
      width: 89px;
      min-width: 89px;
      margin-bottom: 10px;

      @media (min-width: 425px) {
        margin-right: 10px;
      }

      &::last-child {
        margin-right: 0;
      }
    }
  }

  .button-panel {
    display: flex;
    justify-content: center;
    align-items: center;

    .MuiSvgIcon-root {
      font-size: 2em;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  font-size: 36px;
  border-radius: 8px;
  border: 2px solid ${({ color }) => color || '#282c35'};

  @media (min-width: 425px) {
    margin: 0 15px;
  }

  .MuiSvgIcon-root {
    font-size: 2em;
  }
`;
