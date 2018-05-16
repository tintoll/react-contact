import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from "./components/Dimmed";
import shortid from 'shortid';
import ContactList from './components/ContactList';
import Input from './components/Input';
import FavoriteList from './components/FavoriteList';

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
    },
    contacts: [
      {
        "id": "SyKw5cyAl",
        "name": "김민준",
        "phone": "010-0000-0000",
        "color": "#40c057",
        "favorite": true
      },
      {
        "id": "r1s_9c10l",
        "name": "아벳",
        "phone": "010-0000-0001",
        "color": "#12b886",
        "favorite": true
      },
      {
        "id": "BJcFqc10l",
        "name": "베티",
        "phone": "010-0000-0002",
        "color": "#fd7e14",
        "favorite": false
      },
      {
        "id": "BJUcqqk0l",
        "name": "찰리",
        "phone": "010-0000-0003",
        "color": "#15aabf",
        "favorite": false
      },
      {
        "id": "rJHoq91Cl",
        "name": "데이비드",
        "phone": "010-0000-0004",
        "color": "#e64980",
        "favorite": false
      }
    ],
    search : ''
    
  }
  // 검색창 수정
  handleSearchChange = (e) =>{
    this.setState({
      search : e.target.value
    });
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
    change : ({name, value}) => {
      this.setState({
        modal : {
          ...this.state.modal,
          [name]:value // 인자로 전달받은 name의 값을 value로 설정
        }
      });
    },
    action : {
      create : () => {
        // 고유 아이디 생성
        const id = shortid.generate();
        // 레퍼런스 생성
        const { contacts, modal :{name, phone, color}} = this.state;

        // 데이터 생성
        const contact = {
          id,
          name,
          phone,
          color,
          favorite : false
        }

        this.setState({
          // 기존 배열에 있던 것들을 집어넣고, contact 를 뒤에 추가한 새 배열로 설정
          contacts : [...contacts, contact]
        })
        // 모달 닫기
        this.modalHandler.hide();

      },
      modify : () => {
        const { modal : {name, phone, index}, contacts } = this.state;
        const item = contacts[index];
        this.setState({
          contacts : [
            ...contacts.slice(0,index), // 0~index전까지의 객체를 넣음.
            {
              ...item, // 기존의 아이템 값에 
              name, // name과 phone를 덮어씌움.
              phone
            },
            ...contacts.slice(index+1, contacts.length)
          ]
        });
        this.modalHandler.hide();
      },
      remove : () => {
        const {modal:{index} , contacts} = this.state;
        this.setState({
          contacts :[
            ...contacts.slice(0, index),
            ...contacts.slice(index + 1, contacts.length)
          ]
        });
        this.modalHandler.hide();
      },
    }
    
  }

  // 아이템 핸들러
  itemHandler = {
    toggleFavorite : (id) => {
      const { contacts } = this.state;
      // id로 index조회
      const index = contacts.findIndex(contact => contact.id === id);
      const item = this.state.contacts[index];
      this.setState({
        contacts: [
          ...contacts.slice(0, index), // 0~index전까지의 객체를 넣음.
          {
            ...item, // 기존의 아이템 값에 
            favorite : !item.favorite
          },
          ...contacts.slice(index + 1, contacts.length)
        ]
      });
    },
    openModify : (id) => {
        const { contacts } = this.state;
        // id로 index조회
        const index = contacts.findIndex(contact => contact.id === id);
        const item = this.state.contacts[index];
        this.modalHandler.show(
          'modify',
          {
            ...item,
            index
          }
        );
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
      modalHandler,
      itemHandler,
      handleSearchChange 
    } = this;
    const { view, modal, contacts, search } = this.state;

    return (
      <div>
        <Header />
        <ViewSelector onSelect={handleSelectView} selected={view} />
        
        {/* view 값에 따라 다른 컨테이너를 보여준다. */}
        <Container visible={view === 'favorite'}>
          <FavoriteList contacts={contacts} />
        </Container>
        <Container visible={view === 'list'}>
          <Input onChange={handleSearchChange}
                 value={search}
                 placeholder="검색" />
          <ContactList contacts={contacts}
                       onOpenModify={itemHandler.openModify}
                       search={search}
                       onToggleFavorite={itemHandler.toggleFavorite} / >
        </Container>

        {/* ...modal은 아래와같이 변환됨.
          color={modal.color}  
          mode={modal.mode}
          name={modal.name}  
          phone={modal.phone}
          visible={modal.visible}
        */}
        <ContactModal {...modal} onHide={modalHandler.hide} 
                  onChange={modalHandler.change}
                  onAction={modalHandler.action[modal.mode]}
                  onRemove={modalHandler.action.remove} />  
        <Dimmed visible={modal.visible} />
        <FloatingButton onClick={handleFloatingButtonClick} />
      </div>
    );
  }
}

export default App;
