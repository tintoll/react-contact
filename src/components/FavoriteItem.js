import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import PersonIcon from 'react-icons/lib/md/person';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Wrapper = styled.div`
  width : 50%;
  padding : 0.5rem;
`;

const Box = styled.div`
  background : ${props => props.color};
`;

const ThumbnailContainer = styled.div`
  /* 레이아웃 */
  height : 6rem;
  display : flex;
  align-items : center;
  justify-content : center;

  color : white;
  font-size : 4rem;
`;
const Info = styled.div`
  background : rgba(0,0,0,0.1);
  color : white;
  text-align : center;
  padding : 1rem;
`;

const Name = styled.div`
  font-size : 1.25rem;
  font-weight : 500;
`;

const Phone = styled.div`
  font-weight : 300;
  font-size : 0.8rem;
  opacity : 0.8;
  margin-top : 0.25rem;
`;

const FavoriteItem = ({contact}) => {
  // 일반 Map 인스턴스는 비구조화 할당이 되지 않으니, toJS() 를 한 다음에 비구조화 할당을 하였습니다
  const { color, name, phone } = contact.toJS();
  return (
    <Wrapper>
      <Box color={color}>
        <ThumbnailContainer>
          <PersonIcon />
        </ThumbnailContainer>
        <Info>
          <Name>{name}</Name>
          <Phone>{phone}</Phone>
        </Info>
      </Box>
    </Wrapper>
  );
}

FavoriteItem.propTypes = {
  contact: ImmutablePropTypes.mapContains({
    id : PropTypes.string,
    name : PropTypes.string,
    phone: PropTypes.string,
    color: PropTypes.string,
    favorite : PropTypes.bool,
  })
}

export default FavoriteItem;