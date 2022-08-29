import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import { useTheme } from "../context/themeProvider";
import "../index.css";
// import { FlexContainer } from "../style/styles";
import ThemeToggle from "../theme/ThemeToggle";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;
  const [ThemeMode, toggleTheme] = useTheme();

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Nav
      activeKey={location.pathname}
      style={{
        position: "fixed",
        zIndex: 1,
        background: "lightblue",
        width: "100%",
      }}
    >
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>
          <span>안녕하세요, 포트폴리오 공유 서비스입니다.</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
          DarkMode
        </ThemeToggle>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/")}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>네트워크</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
