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

export const PositionColumn: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;
  const currentPosition = standing[standingType].position;
  const prevPosition = standing[standingType].prevPosition;

  const getMovementFromPosition = (curPos: number, lastPos: number): string => {
    if (curPos > lastPos) {
      return MOVEMENT_DOWN;
    } else if (curPos < lastPos) {
      return MOVEMENT_UP;
    }
    return MOVEMENT_NONE;
  };

  const movementDirection = getMovementFromPosition(currentPosition, prevPosition);
  const movementClasses = `pl-position-movement ${movementDirection}`;

  const popupStyle = {
    padding: '6px 10px',
    borderRadius: '3px'
  };

  return (
    <div className="pl-position-container">
      <span className="pl-position">{currentPosition}</span>
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