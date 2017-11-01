import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';

interface Props {
  active?: string;
}

const Navigation: React.StatelessComponent<Props> = (props: Props) => {
  const isActive = (menuItem: string): boolean => {
    return props.active === menuItem;
  };

  return (
    <div className="pl-navigation">
      <Container className="">
        <Menu inverted={true} pointing={true} secondary={true} size="large" className="">
          <Menu.Item as="a" active={isActive('standings')} className="pl-menu-item">Standings</Menu.Item>
          <Menu.Item as="a" active={isActive('results')} className="pl-menu-item">Results</Menu.Item>
          <Menu.Item as="a" active={isActive('stats')} className="pl-menu-item">Stats</Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};

export default Navigation;
