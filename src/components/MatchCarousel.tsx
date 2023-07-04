import React, { useState, useEffect } from 'react';
import Card from './Card';
import './MatchCarousel.css';
import { fetchSportsAPICall } from '../services/sportRadarService';

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
      cc: string
    };
  };
  _dt: {
    time: string;
  };
  status: {
    name: string;
  };
}

interface MatchCarouselProps {
  max?: number;
  sportId?: number;
}

const MatchCarousel: React.FC<MatchCarouselProps> = ({ max = 10, sportId }) => {
  const [matches, setMatches] = useState<Sport[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, matches.length]);

  const getActiveMatches = (sportData: Sport[]): Sport[] => {
    const liveMatches = [];
    for (const sport of sportData) {
      for (const realcategory of sport.realcategories) {
        for (const tournament of realcategory.tournaments) {
          for (const match of tournament.matches) {
            if (match.status._id > 0 && match.status._id < 100 && match.status.name !== 'Ended') {
              liveMatches.push({ 
                _id: sport._id,
                realcategories: {
                  name: realcategory.name,
                },
                tournament: {
                  name: tournament.name,
                  seasontypename: tournament.seasontypename,
                },
                _dt: {
                  time: match._dt.time,
                },
                status: {
                  name: match.status.name,
                },
                teams: {
                  home: {
                    abbr: match.teams.home.abbr,
                    uid: match.teams.home.uid,
                    name: match.teams.home.name,
                    cc: match.teams.home.cc?.a2 || '',
                  },
                  away: {
                    abbr: match.teams.away.abbr,
                    uid: match.teams.away.uid,
                    name: match.teams.away.name,
                    cc: match.teams.home.cc?.a2 || '',
                  }
                }
              });
            }
            if (liveMatches.length === max) {
              return liveMatches;
            }
          }
        }
      }
    }
    return liveMatches;
  };

  const navigateToIndex = (index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const fetchMatches = async () => {
    let matchesData = await fetchSportsAPICall();
    if (sportId) {
      matchesData = matchesData.filter((match) => match._id === sportId);
    }
    const activeMatchesData = getActiveMatches(matchesData);
    setMatches(activeMatchesData);
  };

  let visibleMatches = matches.slice(currentIndex, currentIndex + 5);
  if (matches.length - 5 <= currentIndex) {
    const leftover = matches.length - currentIndex;
    visibleMatches = [...matches.slice(currentIndex, currentIndex + 5), ...matches.slice(0, 5 - leftover)];
  }

  return (
    <div className="match-carousel">
      <div className="carousel-track">
      {visibleMatches.map((match, index) => {
          const isActive = index === 2; // The current card will be in the center

          return <Card key={index} match={match} className={`card ${isActive ? 'active' : ''}`} />;
        })}

      </div>
      <div className="carousel-dots">
        {matches.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => navigateToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchCarousel;
