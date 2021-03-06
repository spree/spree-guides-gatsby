// --- Dependencies
import * as React from 'react'
import PropTypes from 'prop-types'
import { cx } from 'emotion'

// --- Components
import Logo from './Logo'
import NavItem from './NavItem'
import DocSearch from './DocSearch'
import Sidebar from './Sidebar'

// --- Utils
import styles from '../utils/styles'

// --- Icons
import IconSlack from 'react-feather/dist/icons/slack'
import IconGithub from 'react-feather/dist/icons/github'
import IconBurger from 'react-feather/dist/icons/menu'
import IconClose from 'react-feather/dist/icons/x-circle'
import IconSearch from 'react-feather/dist/icons/search'

/**
 * Component
 */

export default class Header extends React.PureComponent {
  static propTypes = {
    activeRootSection: PropTypes.string,
    nav: PropTypes.array
  }

  state = {
    menuIsOpen: false,
    searchIsOpen: false
  }

  _toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  isActive = currentSection => {
    return this.props.activeRootSection === currentSection
  }

  _toggleSearch = () => {
    this.setState({ searchIsOpen: !this.state.searchIsOpen })
  }

  render() {
    return (
      <header
        className="bb b--light-gray w-100 top-0 bg-white z-999"
        css={{
          position: 'sticky',
          height: styles.header.height
        }}
      >
        <div className="z-3 relative ph4 flex items-center mw9 center h-100">
          <a
            href="/"
            className={cx(
              { db: !this.state.searchIsOpen },
              { dn: this.state.searchIsOpen },
              'link'
            )}
          >
            <Logo />
          </a>

          <DocSearch isOpen={this.state.searchIsOpen} />

          <nav className="h-100 w-100 tr dn flex-l items-center justify-end">
            <NavItem url="https://api.spreecommerce.org">API</NavItem>
            <NavItem url="https://dev-docs.spreecommerce.org/extensions">Extensions</NavItem>
            <NavItem url="https://dev-docs.spreecommerce.org">Developer</NavItem>
            <NavItem
              text="User"
              isActive={this.isActive('user')}
              url="/user/"
            />
            <NavItem url="https://github.com/spree/spree/releases">Release Notes</NavItem>
            <NavItem url="https://demo.spreecommerce.org/">Demo</NavItem>

            <NavItem url="https://spreecommerce.org/contact">Support</NavItem>

            <NavItem url="http://slack.spreecommerce.org/" title="Join our Slack">
              <IconSlack />
            </NavItem>
            <NavItem url="https://github.com/spree/spree">
              <IconGithub />
            </NavItem>
          </nav>

          <nav className="dn-l justify-end w-100 flex">
            {this.state.searchIsOpen ? (
              <IconClose
                className="pointer dib dn-l mv2 mr3 z-999 right-0 absolute pr3 pv2 gray"
                onClick={this._toggleSearch}
              />
            ) : (
              <IconSearch
                className="pointer dib dn-l mv2 mv0-l mr0 ph1 pv2 gray"
                onClick={this._toggleSearch}
              />
            )}

            <NavItem url="http://slack.spreecommerce.org/">
              <IconSlack />
            </NavItem>
            <NavItem url="https://github.com/spree/spree">
              <IconGithub />
            </NavItem>
            {this.state.menuIsOpen ? (
              <IconClose
                className="pointer dib dn-l mv2 mv0-l gray pa2"
                onClick={() => this._toggleMenu()}
              />
            ) : (
              <IconBurger
                className="pointer dib dn-l mv2 mv0-l gray pa2"
                onClick={() => this._toggleMenu()}
              />
            )}
          </nav>
        </div>

        {this.state.menuIsOpen && (
          <div
            className="overflow-auto top-0 fixed w-100 top-0 bottom-0 bg-white pl4 flex flex-column"
            css={{
              marginTop: styles.header.height
            }}
          >
            <nav className="flex flex-column overflow-auto mr4 mr0-l">
              <NavItem url="https://api.spreecommerce.org">API</NavItem>
              <NavItem url="https://dev-docs.spreecommerce.org/extensions/extensions">Extensions</NavItem>
              <NavItem url="https://dev-docs.spreecommerce.org">Developer</NavItem>
              <NavItem
                text="User"
                isActive={this.isActive('user')}
                url="/user/"
              >
                {this.isActive('user') && (
                  <Sidebar nav={this.props.nav} isMobile />
                )}
              </NavItem>
              <NavItem url="https://github.com/spree/spree/releases">Release Notes</NavItem>
              <NavItem url="https://spreecommerce.org/contact">Support</NavItem>
            </nav>
          </div>
        )}
      </header>
    )
  }
}
