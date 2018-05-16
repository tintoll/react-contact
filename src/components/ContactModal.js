import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Modal from './Modal';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import Input from './Input';


// 유저이미지를 담을 ThumbnailWrapper
const ThumbnailWrapper = styled.div`
  /* 레이아웃 */
  padding-top : 3rem;
  padding-bottom : 3rem;
  display : flex;
  justify-content : center;

  background : white;
`;

// 인풋을 담을 Form
const Form = styled.div`
  /* 레이아웃 */
  padding : 1rem;
  background : ${oc.gray[0]};
`;

// 버튼을 담을 ButtonsWrapper
const ButtonsWrapper = styled.div`
  display : flex;
`;

const Button = styled.div`
  /* 레이아웃 */
  padding-top : 1rem;
  padding-bottom : 1rem;
  flex : 1;
  display : inline-block;

  /* 기타 */
  cursor : pointer;
  text-align : center;
  font-weight : 500;
  font-size : 1.2rem;
  transition : all .3s;

  color : white;
  background : ${props => oc[props.color][7]};

  &:hover {
    background : ${props => oc[props.color][6]};
  }
  &:active {
    background : ${props => oc[props.color][8]};
  }

`;
Button.propTypes = {
  color : PropTypes.string
}

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

  handleChange = (e) => {
    const { onChange } = this.props;
    onChange({
      name : e.target.name,
      value : e.target.value
    });
  }

  render(){
    const { handleChange } = this;
    const {
      visible,
      onHide,
      mode,
      name,
      phone,
      color,
      onAction
    } = this.props;

    return (
      <Modal visible={visible} onHide={onHide}>
        <ThumbnailWrapper>
          <Thumbnail size="8rem" color={color} />
        </ThumbnailWrapper> 
        <Form>
          <Input onChange={handleChange} value={name} name="name" placeholder="이름" />
          <Input onChange={handleChange} value={phone} name="phone" placeholder="전화번호" />
        </Form>
        <ButtonsWrapper>
          <Button color="teal"
                  onClick={onAction}>
            {mode === 'create' ? '추가' : '수정'}
          </Button>
          <Button color="gray">
            취소
          </Button>
        </ButtonsWrapper>
      </Modal>
    )
  }
}
export default ContactModal;