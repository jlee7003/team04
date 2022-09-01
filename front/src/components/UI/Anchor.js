import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useTheme } from '../darkmode/themeProvider';

const Anchor = () => {
  const ThemeMode = useTheme();
  const theme = ThemeMode[0];

  const goToTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ToggleWrapper id={theme == 'light' ? 'light' : 'dark'}>
      <Button
        style={{ border: 'none' }}
        onClick={goToTheTop}
        size="lg"
        variant="outline-info"
      >
        ⬆️
      </Button>
    </ToggleWrapper>
  );
};

export default Anchor;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 9.5%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.mode === 'dark'
      ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
      : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'};
`;
