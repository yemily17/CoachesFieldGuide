import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function CardComponent() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleBack = () => {
    setSelectedHackathon(null);
  };

  // simple random name generator to assign 2-4 coaches per event
  const generateCoaches = () => {
    const firstNames = ['Avery', 'Jordan', 'Taylor', 'Riley', 'Morgan', 'Parker', 'Casey', 'Reese', 'Sydney', 'Rowan', 'Devon', 'Jamie', 'Logan', 'Quinn', 'Alex', 'Sam', 'Cameron', 'Elliot', 'Hayden', 'Drew'];
    const lastNames = ['Chen', 'Patel', 'Nguyen', 'Garcia', 'Kim', 'Lopez', 'Martinez', 'Rodriguez', 'Johnson', 'Davis', 'Brown', 'Wilson', 'Moore', 'Clark', 'Lewis', 'Walker', 'Young', 'Hall', 'Allen', 'Wright'];
    const count = Math.floor(Math.random() * 3) + 2; // 2-4 coaches
    const names = new Set();
    while (names.size < count) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      names.add(`${first} ${last}`);
    }
    return Array.from(names);
  };

  const transformEvents = (data) => {
    if (!data) return [];
    const items = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
    return items.map((event) => ({
      id: event.id,
      title: event.name || event.slug || 'Untitled Event',
      university: event.lead_organizer || 'Organizer',
      city: event.address?.city || 'Unknown City',
      state: event.address?.state || '',
      country: event.address?.country || '',
      coordinates:
        event.address?.latitude && event.address?.longitude
          ? [event.address.latitude, event.address.longitude]
          : null,
      coaches: generateCoaches(),
    }));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      const token = process.env.REACT_APP_MLH_API_TOKEN;
      if (!token) {
        setError('Missing API token. Set REACT_APP_MLH_API_TOKEN in .env.');
        setLoading(false);
        return;
      }

      try {
        // fetch a single page (limit 100) to avoid infinite loops if paging is ignored
        const resp = await fetch(`https://api.staging.corp.mlh.io/v4/events?page=1&limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'max-age=0, private, must-revalidate',
            'Content-Type': 'application/json; charset=utf-8',
          },
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Request failed (${resp.status}): ${text || 'No response body'}`);
        }

        const json = await resp.json().catch(() => null);
        const transformed = transformEvents(json);

        setHackathons(transformed);
      } catch (err) {
        console.error('Error fetching events', err);
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredHackathons = hackathons.filter((hackathon) => {
    if (!normalizedSearch) return true;

    const searchableText = [
      hackathon.title,
      hackathon.university,
      hackathon.city,
      hackathon.state,
      hackathon.country,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });

  return (
    <Card sx={{
      position: 'absolute',
      top: 20,
      left: 20,
      bottom: 20,
      zIndex: 1000,
      width: 300,
      height: 'auto',
      overflowY: 'auto',
      p: 2,
    }}>
      <CardContent>
        {selectedHackathon ? (
          <>
            <Button onClick={handleBack} variant="text" sx={{ mb: 2 }}>
              ← Back to hackathons
            </Button>

            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {selectedHackathon.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedHackathon.university} — {selectedHackathon.city}, {selectedHackathon.state} {selectedHackathon.country}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Coaches
            </Typography>
            {selectedHackathon.coaches?.map((coach) => (
              <Card key={coach} sx={{ mb: 1, bgcolor: 'background.paper' }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="body1">{coach}</Typography>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <Box sx={{ mt: 2 }} />

            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              Upcoming Hackathons
            </Typography>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <CircularProgress size={24} />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && filteredHackathons.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No hackathons found.
              </Typography>
            )}

            {!loading && !error && filteredHackathons.map((hackathon) => (
              <Card
                key={hackathon.id}
                sx={{ mb: 2, bgcolor: 'background.paper', cursor: 'pointer' }}
                onClick={() => handleCardClick(hackathon)}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {hackathon.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {[hackathon.city, hackathon.state, hackathon.country].filter(Boolean).join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}

      </CardContent>
    </Card>
  );
}

export default CardComponent;
