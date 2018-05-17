import React, { Component } from 'react';
import FloatingButton from '../components/FloatingButton';
import { connect } from 'react-redux';
import * as modalActions from '../modules/modal';
import * as baseActions from '../modules/base';
import { bindActionCreators } from 'redux';
import oc from 'open-color';

// 랜덤 색상 생성
function generateRandomColor() {
    const colors = [
        'gray',
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    return oc[colors[random]][6];
}

class FloatingButtonContainer extends Component {
  
  handleClick = () => {
    const { ModalActions, BaseAtions } = this.props;

    // 뷰를 list로 전환
    BaseAtions.setView('list');
    // 주소록 생성 모달 띄우기
    ModalActions.show({
      mode : 'create',
      contact : {
        name : '',
        phone : '',
        color : generateRandomColor()
      }
    })

  }
  render() {
    const { handleClick } = this;
    return(
      <FloatingButton onClick={handleClick} />
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    ModalActions : bindActionCreators(modalActions, dispatch),
    BaseAtions : bindActionCreators(baseActions, dispatch)
  })
)(FloatingButtonContainer);