import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

export const Navigation: React.StatelessComponent = () => {
  return (
    <div className="pl-navigation">
      <Container className="">
        <Menu inverted={true} pointing={true} secondary={true} size="large" className="">
          <Menu.Item as={Link} to={'/standings'} activeClassName="active" className="pl-menu-item">
            <span>Standings</span>
          </Menu.Item>
          <Menu.Item as={Link} to={'/results'} activeClassName="active" className="pl-menu-item">
            <span>Results</span>
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};
