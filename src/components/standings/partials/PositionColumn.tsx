import * as React from 'react';
import { Popup } from 'semantic-ui-react';
import { StandingType } from '../../../utils/standing-type.enum';
import { Standing } from '../../../api/models';

interface Props {
  standing: Standing;
  standingType: StandingType;
}

const MOVEMENT_UP = 'up';
const MOVEMENT_DOWN = 'down';
const MOVEMENT_NONE = 'none';

/**
 * Component which renders team position in table with movement icon which represents how team position was changed
 * depending on previous position (from previous round).
 */
export const PositionColumn: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;
  const currPosition = standing[standingType].position;
  const prevPosition = standing[standingType].prevPosition;

  // Get movement string from provided information about current and previous position.
  // If previous position was lower on table than current, that means that team has advanced by moving up.
  const getMovementFromPosition = (currentPosition: number, previousPosition: number): string => {
    if (currentPosition > previousPosition) {
      return MOVEMENT_DOWN;
    } else if (currentPosition < previousPosition) {
      return MOVEMENT_UP;
    }
    return MOVEMENT_NONE;
  };

  const movementDirection = getMovementFromPosition(currPosition, prevPosition);
  const movementClasses = `pl-position-movement ${movementDirection}`;

  const popupStyle = {
    padding: '6px 10px',
    borderRadius: '3px'
  };

  return (
    <div className="pl-position-container">
      <span className="pl-position">{currPosition}</span>
      <Popup
        trigger={<span className={movementClasses}/>}
        position="right center"
        style={popupStyle}
      >
        <Popup.Content>
          Last position: <strong>{prevPosition}</strong>
        </Popup.Content>
      </Popup>
    </div>
  );
};
