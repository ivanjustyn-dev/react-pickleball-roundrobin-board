import { Add, Close } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton } from "@mui/material";
import { useGameContext } from "../../GameContext";
import PlayerCard from "../../PlayerCard";



const CourtsSection = () => {

    const gameContext = useGameContext();

    return <Box
        padding={"8px"}
        display={"flex"}
        sx={{
            minHeight: '100%',
            maxHeight: '100%'
        }} >
        <Card sx={{ width: "100%" }}>
            <CardHeader
                title="Courts"
                action={
                    <CardActions disableSpacing>
                        <Button
                            startIcon={<Add />}
                            variant="text"
                            color="primary"
                            onClick={() => gameContext.addCourt({ id: `${crypto.randomUUID()}`, players: [] })}
                        >
                            Add Court
                        </Button>
                    </CardActions>
                }
            />
            <Divider />
            <CardContent sx={{
                maxHeight: "100%",
                overflow: "auto",
            }}>
                <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} paddingBottom={"64px"} >
                    {
                        gameContext.courts.map((court, idx) => (
                            <Card
                                key={court.id}
                                sx={{
                                    minWidth: "300px",
                                    maxWidth: "300px",
                                    marginRight: "8px",
                                    marginBottom: "8px",
                                }} >
                                <CardHeader
                                    title={`Court ${idx + 1}`}
                                    action={
                                        <IconButton
                                            size="small"
                                            onClick={() => gameContext.removeCourt(court)}
                                        >
                                            <Close />
                                        </IconButton>
                                    }
                                />
                                <Divider />
                                <CardContent>
                                    {
                                        court.players.length === 0 ? (
                                            <Box
                                                display={"flex"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                minHeight={"100px"}
                                            >
                                                No players assigned
                                            </Box>
                                        ) : (
                                            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"8px"}>
                                                {
                                                    court.players.map((player) => (
                                                        <PlayerCard
                                                            key={player.name}
                                                            player={player}
                                                        />
                                                    ))
                                                }
                                            </Box>
                                        )
                                    }
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between" }}>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            gameContext.clearCourtPlayers(court);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        size="small"
                                        disabled={court.players.length === 0}
                                        onClick={() => {
                                            gameContext.finishGame(court);
                                        }}
                                    >
                                        Finish
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Box>
            </CardContent>
        </Card>
    </Box>

};

export default CourtsSection;