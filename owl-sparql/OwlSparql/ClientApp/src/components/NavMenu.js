import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false 
    };
  }

  toggleNavbar = ()=> {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">SemanticWeb</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>SPARQL</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Foursquare queries</DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/first-sparql">GetPlaces That Serve Breakfast And Tea</NavLink></DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/second-sparql">Get Places With Social Media</NavLink></DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/third-sparql">Get All Likes For Dinner Place</NavLink></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem header>Reddit queries</DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/fourth-sparql">Get Top Ten Recent Posts</NavLink></DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/fifth-sparql">Third SPARQL</NavLink></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">SWRL APIs</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
