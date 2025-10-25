import { Add, Close } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton } from "@mui/material";
import { useGameContext } from "../../GameContext";
import { useState } from "react";
import MovePlayersToCourtDialog from "../../DialogBox/MovePlayersToCourtDialog";
import type { Group } from "../../types";
import PlayerCard from "../../PlayerCard";

const GroupsSection = () => {

    const gameContext = useGameContext();
    const [isShowMovePlayersToCourtDialog, setIsShowMovePlayersToCourtDialog] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);

    return <Box
        display={"flex"}
        padding={"8px"}
        sx={{
            minHeight: '100%',
            maxHeight: '100%'
        }}
    >
        <Card sx={{ width: "100%" }}>
            <CardHeader
                title="Groups"
                action={
                    <CardActions disableSpacing>
                        <Button
                            startIcon={<Add />}
                            variant="text"
                            color="primary"
                            onClick={() => gameContext.addGroup({ id: crypto.randomUUID(), players: [] })}
                        >
                            Add Group
                        </Button>
                    </CardActions>
                } />
            <Divider />
            <CardContent sx={{
                maxHeight: "100%",
                overflow: "auto",
            }}>
                <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} paddingBottom={"64px"} >
                    {
                        gameContext.groups.map((group) => (
                            <Card
                                key={group.id}
                                sx={{
                                    minWidth: "300px",
                                    maxWidth: "300px",
                                    marginRight: "8px",
                                    marginBottom: "8px",
                                }}
                                color="error"

                            >
                                <CardHeader
                                    action={
                                        <IconButton
                                            size="small"
                                            onClick={() => gameContext.removeGroup(group)}
                                        >
                                            <Close />
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    {
                                        group.players.length === 0 ? (
                                            <Box
                                                fontStyle={"italic"}
                                            >
                                                No players in this group.
                                            </Box>
                                        ) : (
                                            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"4px"}>
                                                {group.players.map((player) => (
                                                    <PlayerCard
                                                        key={player.name}
                                                        player={player}
                                                        onClose={() => {
                                                            gameContext.removePlayerFromGroup(player, group)
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    }
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between" }}>
                                    <Button
                                        size="small"
                                        disabled={group.players.length === 0}
                                        onClick={() => {
                                            gameContext.clearGroupPlayers(group);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        size="small"
                                        disabled={group.players.length === 0}
                                        onClick={() => {
                                            setSelectedGroup(group);
                                            setIsShowMovePlayersToCourtDialog(true);
                                        }}
                                    >
                                        Court
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Box>
            </CardContent>
        </Card>
        <MovePlayersToCourtDialog show={isShowMovePlayersToCourtDialog} setShow={setIsShowMovePlayersToCourtDialog}
            group={selectedGroup} />
    </Box>
};

export default GroupsSection;