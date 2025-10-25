import { Add } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider } from "@mui/material";
import { useState } from "react";
import AddPlayersDialog from "../../DialogBox/AddPlayersDialog";
import type { Player } from "../../types";
import { useGameContext } from "../../GameContext";
import AddPlayersToGroupDialog from "../../DialogBox/AddPlayersToGroupDialog";
import PlayerCard from "../../PlayerCard";

const PlayerSection = () => {
    const gameContext = useGameContext();

    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [isAddPlayersDialogOpen, setIsAddPlayersDialogOpen] = useState(false);
    const [isAddPlayersToGroupDialogOpen, setIsAddPlayersToGroupDialogOpen] = useState(false);

    return (
        <Box
            display={"flex"}
            padding={"8px"}
            sx={{
                minHeight: '100%',
                maxHeight: '100%'
            }} >
            <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <CardHeader
                    title="Bench"
                    subheader={`${gameContext.players.length} player(s)`}
                    action={
                        <CardActions disableSpacing>
                            <Button
                                startIcon={<Add />}
                                variant="text"
                                color="primary"
                                onClick={() => setIsAddPlayersDialogOpen(true)}
                            >
                                Add Players
                            </Button>
                        </CardActions>
                    }
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"8px"}>
                        {
                            gameContext.players.filter(player => {
                                return !gameContext.groups.some(group => group.players.includes(player)) &&
                                    !gameContext.courts.some(court => court.players.includes(player));
                            }).map((player: Player) => (
                                <PlayerCard
                                    key={player.name}
                                    player={player}
                                    isSelected={!!selectedPlayers.find(p => p.name === player.name)}
                                    onClick={() => {
                                        if (selectedPlayers.length >= 4 && !selectedPlayers.find(p => p.name === player.name)) {
                                            return;
                                        }
                                        if (selectedPlayers.find(p => p.name === player.name)) {
                                            setSelectedPlayers(selectedPlayers.filter(p => p.name !== player.name));
                                        } else {
                                            setSelectedPlayers([...selectedPlayers, player]);
                                        }
                                    }}
                                />
                            ))
                        }
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                        disabled={selectedPlayers.length === 0}
                        onClick={() => {
                            setSelectedPlayers([]);
                        }
                        }
                    >
                        Clear Selection
                    </Button>
                    <Button
                        disabled={selectedPlayers.length === 0}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setIsAddPlayersToGroupDialogOpen(true);
                        }}
                    >
                        Add Selected to Group
                    </Button>
                </CardActions>
            </Card>

            <AddPlayersDialog show={isAddPlayersDialogOpen} setShow={setIsAddPlayersDialogOpen} />
            <AddPlayersToGroupDialog show={isAddPlayersToGroupDialogOpen} setShow={setIsAddPlayersToGroupDialogOpen} players={selectedPlayers} onAddPlayersToGroup={() => {
                setSelectedPlayers([]);
            }} />
        </Box >
    )
};

export default PlayerSection;