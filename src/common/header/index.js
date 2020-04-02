import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators } from "../../pages/login/store";

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from "./style";
import { Link } from "react-router-dom";

class Header extends Component {
  getListArea() {
    const {
      focused,
      list,
      page,
      handleMouseEnter,
      handleMouseLeave,
      mouseIn,
      handleChangePage
    } = this.props;
    const pageList = [];
    const newList = list.toJS();

    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        );
      }
    }

    if (mouseIn || focused) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(this.spinIcon)}>
              <i
                className="iconfont spin"
                ref={spin => {
                  this.spinIcon = spin;
                }}
              >
                &#xe851;
              </i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>{pageList}</SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }
  render() {
    const {
      focused,
      handleInputFocus,
      handleInputBlur,
      list,
      login,
      logout
    } = this.props;
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>

        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载app</NavItem>
          {login ? (
            <NavItem className="right" onClick={logout}>
              退出
            </NavItem>
          ) : (
            <Link to="/login">
              <NavItem className="right">登录</NavItem>
            </Link>
          )}
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition timeout={200} in={focused} classNames="slide">
              <NavSearch
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
                className={focused ? "focused" : ""}
              ></NavSearch>
            </CSSTransition>
            <i className={focused ? "focused iconfont zoom" : "iconfont zoom"}>
              &#xe614;
            </i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className="writting">写文章</Button>
          </Link>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    focused: state.get("header").get("focused"),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    login: state.getIn(["login", "login"])
  };
};
const mapDispathToProps = dispatch => {
  return {
    handleInputFocus(list) {
      list.size === 0 && dispatch(actionCreators.getList());

      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(spinIcon) {
      let originAngel = spinIcon.style.transform.replace(/[^0-9]/gi, "");
      // console.log(originAngel);
      originAngel = originAngel ? originAngel : 0;
      spinIcon.style.transform = `rotate(${originAngel + 360}deg)`;
      dispatch(actionCreators.changePage());
    },
    logout() {
      dispatch(loginActionCreators.logout());
    }
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Header);
