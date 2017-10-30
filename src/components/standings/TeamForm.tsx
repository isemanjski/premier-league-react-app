import * as React from 'react';
import { POINTS_FOR_DRAW, POINTS_FOR_WINNING } from '../../constants/constants';
import { StandingType } from '../../constants/standing-type.enum';
import { Match, Standing } from '../../api/models';

interface Props {
  standing: Standing;
  standingType: StandingType;
}

const FORM_WIN = 'W';
const FORM_LOSS = 'L';
const FORM_DRAW = 'D';

const TeamForm: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;

  // Team for which is form caluclated
  const team = standing.team;

  // Depending on selected `standingType` calculate last 5 matches.
  // E.g. if standing type is 'home' take only matches that team played at home.
  let last5Matches: Match[] = [];

  if (standingType === StandingType.Overall) {
    // If standing type is 'overall' just take last 5 matches
    last5Matches = standing.playedMatches.slice(-5);
  } else if (standingType === StandingType.Home) {
    // If standing type is 'home' take only matches that team played at home
    last5Matches = standing.playedMatches.filter(match => match.homeTeam.id === team.id).slice(-5);
  } else {
    // If standing type is 'away' take only matches that team played away
    last5Matches = standing.playedMatches.filter(match => match.awayTeam.id === team.id).slice(-5);
  }

  // Helper function to get form type from points
  const getFormFromPoints = (points: number): string => {
    switch (points) {
      case POINTS_FOR_WINNING:
        return FORM_WIN;
      case POINTS_FOR_DRAW:
        return FORM_DRAW;
      default:
        return FORM_LOSS;
    }
  };

  // From last 5 or less matches calculate team form
  const formList: string[] = last5Matches.map(match => {
    if (match.homeTeam.id === team.id) {
      return getFormFromPoints(match.homeTeamPoints);
    } else {
      return getFormFromPoints(match.awayTeamPoints);
    }
  });

  return (
    <div>
      {formList.map((form: string, index: number) => (
        <span key={index} style={{ width: '30px', textAlign: 'center', display: 'inline-block' }}>{form}</span>
      ))}
    </div>
  );
};

export default TeamForm;
