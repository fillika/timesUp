import styled from 'styled-components';

export const StyledTask = styled.div<{ delay?: number }>`
  transform: scaleY(0);
  will-change: transform;
  animation: showMainTask linear 350ms forwards;
  animation-delay: ${props => props.delay || 0}ms;

  @keyframes showMainTask {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`;
