import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card, CardContent, Typography, Stack } from '@mui/material';

const SwipeList = () => {
  const people = useSelector((state: RootState) => state.match.potentialMatches);

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {people.map((p) => (
        <Card key={p.id}>
          <CardContent>
            <Typography variant="h6">{p.name}</Typography>
            <Typography variant="body2">{p.bio}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default SwipeList; 