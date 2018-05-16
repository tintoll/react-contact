import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Modal from './Modal';
import PropTypes from 'prop-types';


class ContactModal extends Component {
  static propTypes = {
    visible : PropTypes.bool,
    mode : PropTypes.oneOf(['create','modify']),
    // 모달에 들어갈 데이터 값
    name : PropTypes.string,
    phone : PropTypes.string,
    color : PropTypes.string,
    onHide : PropTypes.func,
    onAction : PropTypes.func, // 추가 혹은 수정
    onRemove : PropTypes.func, // 삭제
  }
  render(){
    const {
      visible,
      onHide
    } = this.props;

    return (
      <Modal visible={visible} onHide={onHide}>
        하이 
      </Modal>
    )
  }
}
export default ContactModal;