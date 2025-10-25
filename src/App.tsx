import { Box, Grid } from '@mui/material'
import './App.css'
import PlayerSection from './components/Sections/PlayersSection'
import GroupsSection from './components/Sections/GroupsSection'
import CourtsSection from './components/Sections/CourtsSection'
import { GameContextProvider } from './components/GameContext'

function App() {

  return (
    <GameContextProvider>
      <Box
        display={'flex'}
        sx={
          {
            width: '100%',
            minHeight: '100vh',
            backgroundColor: 'lightblue'
          }
        }
      >
        <Grid container>
          <Grid item xs={8} container direction="column" sx={{
            maxWidth: "75vh"
          }}>
            <Grid item xs={6} sx={{
              maxHeight: '50vh',
              maxWidth: '75vh'
            }}>
              <PlayerSection />
            </Grid>
            <Grid item xs={6} sx={{
              maxHeight: '50vh'
            }}>
              <GroupsSection />
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{
            maxHeight: '100vh'
          }}>
            <CourtsSection />
          </Grid>
        </Grid>
      </Box>
    </GameContextProvider>
  )
}

export default App
