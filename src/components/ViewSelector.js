import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  height : 4rem;
  background : white;
  width : 100%;

  /* 하단 핑크색 바 위치 설정을 위해 
  bottom, left 값 설정할때 이 Wrapper에 의존*/
  position : relative;
  display : flex; 
`;

const StyledItem = styled.div`
  /* 레이아웃 */
  height : 100%;

  /* 형재 엘리먼트들과 동일한 사이즈로 설정 */
  flex : 1;

  /* 가운데 정렬 */
  display : flex;
  align-items : center;
  justify-content : center;

  /* 색상 */
  color : ${oc.gray[6]};

  font-size : 1.5rem;
  cursor : pointer;

  /* 마우스가 위에 있을 때 */
  &:hover {
    background : ${oc.gray[0]}
  }
`
const Bar = styled.div`
  /*  레이아웃 */
  position : absolute;
  bottom: 0px;
  height : 3px;
  width : 50%;

  background : ${oc.pink[6]};
`
// 추후 아이템 컴포넌트에 기능을 달아 줄것이기에 컴포넌트 추가 생성
const Item = ({children}) => (
  <StyledItem>
    {children}
  </StyledItem>
);

const ViewSelector = () => (
    <Wrapper>
      <Item>즐겨찾기</Item>
      <Item>리스트</Item>
      <Bar />
    </Wrapper>
);

export default ViewSelector;