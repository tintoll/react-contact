import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import StarIcon from 'react-icons/lib/md/star';
import PeopleIcon from 'react-icons/lib/md/people';

import PropTypes from 'prop-types';

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
  /* active 값에 따라 다른 색상을 보여준다 */
  color : ${ props => props.active ? oc.gray[9] : oc.gray[6]};

  font-size : 1.5rem;
  cursor : pointer;

  /* 마우스가 위에 있을 때 */
  &:hover {
    background : ${oc.gray[0]}
  }
`;
StyledItem.propTypes = {
  active : PropTypes.bool
}

const Bar = styled.div`
  /*  레이아웃 */
  position : absolute;
  bottom: 0px;
  height : 3px;
  width : 50%;

  background : ${oc.pink[6]};

  /* 애니매이션 */
  transition : ease-in .25s;
  /* right 값에 따라 우측으로 이동 */
  transform : ${props => props.right ? 'translateX(100%)' : 'none'};
`;
Bar.propTypes = {
  right : PropTypes.bool
}

// 추후 아이템 컴포넌트에 기능을 달아 줄것이기에 컴포넌트 추가 생성
const Item = ({children, selected, name, onSelect}) => (
  <StyledItem onClick={() => onSelect(name)} active={selected === name}>
    {children}
  </StyledItem>
);

Item.propTypes = {
  selected : PropTypes.string,
  name : PropTypes.string,
  onSelect : PropTypes.func
}

const ViewSelector = ({selected, onSelect}) => (
    <Wrapper>
      <Item
          selected={selected}
          name="favorite"
          onSelect={onSelect}>
          <StarIcon />
      </Item>
      <Item
          selected={selected}
          name="list"
          onSelect={onSelect}>
          <PeopleIcon />
      </Item>
      <Bar right={selected === 'list'} />
    </Wrapper>
);

ViewSelector.propTypes = {
  selected : PropTypes.string,
  onSelect : PropTypes.func
}
export default ViewSelector;