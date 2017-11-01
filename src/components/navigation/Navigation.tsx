import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

export const Navigation: React.StatelessComponent = () => {
  return (
    <div className="pl-navigation">
      <Container className="">
        <Menu inverted={true} pointing={true} secondary={true} size="large" className="">
          <Menu.Item as={Link} to={'/standings'} activeClassName="active" className="pl-menu-item">
            Standings
          </Menu.Item>
          <Menu.Item as={Link} to={'/results'} activeClassName="active" className="pl-menu-item">
            Results
          </Menu.Item>
          <Menu.Item as={Link} to={'/stats'} activeClassName="active" className="pl-menu-item">
            Stats
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};
