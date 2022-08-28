import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import Award from './award/Award';
import Certificate from './certificate/Certificate';
import Education from './education/Education';
import Project from './project/Project';
import { UserStateContext } from '../App';
import * as Api from '../api';
import User from './user/User';

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  

  // fetchPorfolioOwner 함수가 완료되면(isFetchCompleted가 true) 컴포넌트 구현
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get('users', ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    console.log('ownerData.email', ownerData.email);
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };
  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate('/login', { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);
  if (!isFetchCompleted) {
    return 'loading...';
  }

  
// 감상모드 vs 편집모드
  const displayToggler = (e) => {
    e.preventDefault()
    const firstTargetElement = document.querySelector('.toggleTarget')

    // 편집 모드로 변환
    if(firstTargetElement.classList.contains('display-none')){
      e.target.style.opacity = '0.5';
      console.log('편집 모드로')
      const targetElement = document.querySelectorAll('.toggleTarget')
      targetElement.forEach( ele => {
        ele.classList.remove('display-none')
      })
    }
    // 감상 모드로 변환
    else{
      console.log('감상 모드로')
      e.target.style.opacity = '1';

      // e.target.setAttribute('data-value', 'ㅁㄴㅇㄹ');

      const targetElement = document.querySelectorAll('.toggleTarget')
      targetElement.forEach( ele => {
        ele.classList.add('display-none')
      })
    }
  }
  
  let isEditable = portfolioOwner.id === userState.user?.id ? true : false;

  return (
    <Container fluid>
      <Row>
        <Col md="3" lg="3">
          <User portfolioOwnerId={portfolioOwner.id} isEditable={isEditable} />
        </Col>
        <Col>
          <div>
          <button onClick={displayToggler} style={{
              position:'fixed',
              color:'red',
              zIndex:'99',
              top: '91%',
              left: '5%',
              opacity: '0.5',
            }}>👀</button>

            <Education 
              isEditable={isEditable} 
              paramsUserId={params.userId} />
            <Award 
              isEditable={isEditable} 
              paramsUserId={params.userId} />
            <Project
              portfolioOwnerId={portfolioOwner.id}
              isEditable={isEditable}
            />
            <Certificate 
              isEditable={isEditable} 
              paramsUserId={params.userId} 
            />
          </div>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Portfolio;
