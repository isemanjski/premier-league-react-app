import * as React from 'react';
import { Popup } from 'semantic-ui-react';
import { POINTS_FOR_DRAW, POINTS_FOR_WINNING } from '../../../utils/constants';
import { StandingType } from '../../../utils/standing-type.enum';
import { Match, Standing } from '../../../api/models';
import { Fixture } from '../../_shared/Fixture';

interface Props {
  standing: Standing;
  standingType: StandingType;
}

interface TeamForm {
  label: string;
  match: Match;
}

const FORM_MATCHES = 5;

const FORM_WIN = 'W';
const FORM_LOSS = 'L';
const FORM_DRAW = 'D';

export const TeamForm: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;

  // Team for which is form calculated
  const team = standing.team;

  // Depending on selected `standingType` calculate last 5 matches.
  // E.g. if standing type is 'home' take only matches that team played at home.
  let lastNMatches: Match[] = [];

  if (standingType === StandingType.Overall) {
    // If standing type is 'overall' just take last N matches
    lastNMatches = standing.playedMatches.slice(-1 * FORM_MATCHES);
  } else if (standingType === StandingType.Home) {
    // If standing type is 'home' take N last matches that team played at home
    lastNMatches = standing.playedMatches.filter(match => match.homeTeam.id === team.id).slice(-1 * FORM_MATCHES);
  } else {
    // If standing type is 'away' take N last matches that team played away
    lastNMatches = standing.playedMatches.filter(match => match.awayTeam.id === team.id).slice(-1 * FORM_MATCHES);
  }

  // Helper function to get form type from points
  const getFormLabelFromPoints = (points: number): string => {
    switch (points) {
      case POINTS_FOR_WINNING:
        return FORM_WIN;
      case POINTS_FOR_DRAW:
        return FORM_DRAW;
      default:
        return FORM_LOSS;
    }
  };

  // From last N or less matches calculate team form
  const teamFormList: TeamForm[] = lastNMatches.map(match => {
    if (match.homeTeam.id === team.id) {
      return { label: getFormLabelFromPoints(match.homeTeamPoints), match: match };
    } else {
      return { label: getFormLabelFromPoints(match.awayTeamPoints), match: match };
    }
  });

  const popupStyle = {
    padding: '6px 10px',
    borderRadius: '3px'
  };

  return (
    <div>
      {teamFormList.map((teamForm: TeamForm, index: number) => (
        <Popup
          key={index}
          trigger={<span className={`pl-team-form ${teamForm.label.toLowerCase()}`}>{teamForm.label}</span>}
          wide={true}
          style={popupStyle}
        >
          <Popup.Content>
            <Fixture match={teamForm.match} size={'small'}/>
          </Popup.Content>
        </Popup>
      ))
      }
    </div>
  );
};
