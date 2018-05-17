import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import FavoriteItem from './FavoriteItem';
import ImmutablePropTypes from "react-immutable-proptypes";

const Wrapper = styled.div`
  /* 레이아웃 */
  position : relative; /* 자식 컴포너트의 크기를 이 컴포넌트의 50%로 설정하기 위함 */
  display :flex;
  flex-wrap : wrap; /* 공간이 부족하면 다음줄에 보여줌 */
`;

const FavoriteList = ({contacts}) => {
  
  const favoriteList = contacts.filter(
                            contact => contact.get('favorite')
                          ).map(contact => (
                                  <FavoriteItem 
                                    key={contact.get('id')} 
                                    contact={contact} />
                              )
                          );
  
  return (
    <Wrapper>
      {favoriteList}
    </Wrapper>
  )
};
FavoriteList.propTypes = {
  contacts : ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id : PropTypes.string,
      name : PropTypes.string,
      phone : PropTypes.string,
      color : PropTypes.string,
      favorite : PropTypes.bool,
    })
  )
}

export default FavoriteList;