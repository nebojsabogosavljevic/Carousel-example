interface Sport {
    _id: number;
    tournament: {
      name: string;
      seasontypename: string;
    };
    realcategories: {
      name: string;
    };
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
      date: string;
    };
    status: {
      _id: number;
      name: string;
    };
  }
  
  const BASE_URL = 'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074';
  
  async function fetchSportsAPICall(): Promise<Sport[]> {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      const data = await response.json();
      return parseMatchesData(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  function parseMatchesData(data: any): Sport[] {
    const matchesData = data.doc[0].data;
    // return matchesData;
    matchesData.map((matchData: any) => ({
      _id: matchData.id,
      live: matchData.live,
      name: matchData.name,
      realcategories: matchData.realcategories,
      _doc: matchData._doc,
    }));
    return matchesData;
  }
  
  export { fetchSportsAPICall };

  