import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false,
      swrlDropdownOpen: false
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleSwrl = () => {
    this.setState(prevState => ({
      swrlDropdownOpen: !prevState.swrlDropdownOpen
    }));
  }

  render() {
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
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/fourth-sparql">Get Most Recent Posts</NavLink></DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to="/fifth-sparql">Get Top Voted Posts</NavLink></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>

                </NavItem>
                <NavItem>
                  <Dropdown isOpen={this.state.swrlDropdownOpen} toggle={this.toggleSwrl}>
                    <DropdownToggle caret>SWRL</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Foursquare queries</DropdownItem>
                      <DropdownItem><NavLink tag={Link} className="text-dark" to="/first-swrl">First SWRL</NavLink></DropdownItem>
                      <DropdownItem><NavLink tag={Link} className="text-dark" to="/second-swrl">SWRL</NavLink></DropdownItem>
                      <DropdownItem><NavLink tag={Link} className="text-dark" to="/third-swrl">SWRL</NavLink></DropdownItem>
                      <DropdownItem divider></DropdownItem>
                      <DropdownItem header>Reddit queries</DropdownItem>
                      <DropdownItem><NavLink tag={Link} className="text-dark" to="/fourth-swrl">SWRL</NavLink></DropdownItem>
                      <DropdownItem><NavLink tag={Link} className="text-dark" to="/fifth-swrl">SWRL</NavLink></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
