import React, { Component } from 'react'
import { Header, Icon, Menu } from 'semantic-ui-react'

const routeMappings = {
  home: '/',
  blog: '/blog',
  quote: '/quote',
  news: '/news'
}
const getActiveItemFromRoute = function (location) {
  const activeItem = Object.keys(routeMappings).reduce((cur, next) => {
    return routeMappings[next] === location ? next : cur
  })
  return activeItem || 'home'
}

class HeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: getActiveItemFromRoute(this.props.location.pathname)
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e, {name}) {
    this.setState({activeItem: name})
    if (name !== 'sidebar') {
      this.props.history.push(routeMappings[name])
    }
    if (name === 'sidebar') {
      this.props.actions.toggleSidebar()
    }

  }

  render () {
    // console.log('what is header props', this.props.location.pathname)
    const {activeItem} = this.state
    // console.log('what is activeItem', activeItem)
    return (
      <div>
        <Header textAlign='center'>
          XYZ Insurance Inc.
          <Header.Subheader>
            Xavier, an online "quick quoting" system
          </Header.Subheader>
        </Header>
        <Menu pointing secondary>
          {this.props.isAuthenticated
            ? <Menu.Item name='sidebar'
                         onClick={this.handleItemClick}>
              <Icon name='sidebar' />
            </Menu.Item>
            : ''
          }

          <Menu.Item name='home' active={activeItem === 'home'}
                     onClick={this.handleItemClick}>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item name='news' active={activeItem === 'news'}
                     onClick={this.handleItemClick}>
            <Icon name='newspaper' />
            News
          </Menu.Item>
          {
            this.props.isAuthenticated
              ? <Menu.Item
                name='blog'
                active={activeItem === 'blog'}
                onClick={() => this.props.actions.toggleModal(
                  !this.props.ui.modalActive, 'blog')}>
                <Icon name='plus' />
                New Blog Post
              </Menu.Item>
              : undefined
          }

          {
            this.props.isAuthenticated
              ? <Menu.Item
                name='quote'
                active={activeItem === 'quote'}

                onClick={() => this.props.actions.toggleModal(
                  !this.props.ui.modalActive, 'quote')}>
                <Icon name='plus' />
                New Quote
              </Menu.Item>
              : undefined
          }


          <Menu.Menu position='right'>
            {this.props.isAuthenticated
              ? <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.props.actions.logoutUser}>
                <Icon name='log out' />
                Log Out
              </Menu.Item>
              : <Menu.Item
                name='sign in'
                active={activeItem === 'sign in'}
                onClick={() => this.props.actions.toggleModal(
                  !this.props.ui.modalActive, 'login')}>
                <Icon name='sign in' />
                Login
              </Menu.Item>
            }
            {
              this.props.isAuthenticated
                ? undefined
                : <Menu.Item name='signup' active={activeItem === 'signup'}
                             onClick={() => this.props.actions.toggleModal(
                               !this.props.ui.modalActive, 'signup')}>
                  <Icon name='add user' />
                  Sign up
                </Menu.Item>

            }

          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default HeaderContainer