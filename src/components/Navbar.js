import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
       
        <div class="nav-logo"> EtherGram</div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            { this.props.account
              ? <img
                className='ml-2' width='30' height='30'src={`data:image/png;base64,
                ${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
            <small className="wallet-name">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;