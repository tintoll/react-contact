import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from "./components/Dimmed";

import oc from 'open-color';
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
  // 0부터 12까지의 랜덤 숫자
  const random = Math.floor(Math.random() * 13);

  return oc[colors[random]][6];
}


class App extends Component {
  state = {
    view : 'favorite',
    modal : {
      visible : false,
      mode: null // create 혹은 modify
    }
    
  }
  // view 선택 메소드 정의
  handleSelectView = (view) => this.setState({view});

  // 모달 관련 메소드들 
  modalHandler = {
    show : (mode, payload) => {
      this.setState({
        modal : {
          mode,
          visible : true,
          ...payload // payload안의 값을 풀어서 여기에 넣음
        }
      })
    },
    hide : () => {
      this.setState({
        modal : {
          ...this.state.modal, // 기존 값들을 복사해서 안에 넣음
          visible : false
        }
      })
    },
    // 추후 구현해야할 메소드들 
    change : null,
    action : {
      create : null,
      modify : null,
      remove : null,
    }
  }

  // FloatingButton 클릭
  handleFloatingButtonClick = () => {
    // 현재 view가 list가 아니면 list로 설정
    const { view } = this.state;
    if(view !== 'list') this.setState({view : 'list'});

    // Contact 추가 모달 띄우기
    this.modalHandler.show('create',{
      name : '',
      phone : '',
      color : generateRandomColor()
    });
  }

  render() {
    const { 
      handleSelectView,
      handleFloatingButtonClick,
      modalHandler 
    } = this;
    const { view, modal } = this.state;

    return (
      <div>
        <Header />
        <ViewSelector onSelect={handleSelectView} selected={view} />
        
        {/* view 값에 따라 다른 컨테이너를 보여준다. */}
        <Container visible={view === 'favorite'}>즐겨찾기</Container>
        <Container visible={view === 'list'}>리스트</Container>

        {/* ...modal은 아래와같이 변환됨.
          color={modal.color}  
          mode={modal.mode}
          name={modal.name}  
          phone={modal.phone}
          visible={modal.visible}
        */}
        <ContactModal {...modal} onHide={modalHandler.hide} />  
        <Dimmed visible={modal.visible} />
        <FloatingButton onClick={handleFloatingButtonClick} />
      </div>
    );
  }
}

export default App;
