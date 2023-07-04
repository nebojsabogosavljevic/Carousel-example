import React from 'react';
import './Card.css';

interface Sport {
  _id: number;
  tournament: {
    name: string;
    seasontypename: string;
  };
  realcategories: any;
  teams: {
    home: {
      abbr: string;
      uid: number;
      name: string;
      cc: string;
    };
    away: {
      abbr: string;
      uid: number;
      name: string;
      cc: string;
    };
  };
  _dt: {
    time: string;
  };
  status: {
    name: string;
  };
}

interface CardProps {
  match: Sport;
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, match }) => {
  const { tournament, realcategories, teams, _dt, status } = match;
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h3>{ tournament.seasontypename ? `${tournament.name} - ${tournament.seasontypename}` : `${tournament.name}`}</h3>
        <p>{realcategories.name}</p>
      </div>
      <div className="card-body">
        <div className="team-info">
          <img
            className="team-logo"
            src={teams.home.cc !== '' ? `https://flagicons.lipis.dev/flags/4x3/${teams.home.cc}.svg` : 'https://static.thenounproject.com/png/3674270-200.png'}
            alt={`${teams.home.name} Logo`}
          />
          <span>{teams.home.abbr}</span>
          <span>vs</span>
          <span>{teams.away.abbr}</span>
          <img
            className="team-logo"
            src={teams.home.cc !== '' ? `https://flagicons.lipis.dev/flags/4x3/${teams.away.cc}.svg` : 'https://static.thenounproject.com/png/3674270-200.png'}
            alt={`${teams.away.name} Logo`}
          />
        </div>
        <div className="match-info">
          <p>{_dt.time}</p>
          <p>{status.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
