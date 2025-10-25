import { Badge, Box, Card, CardActionArea, CardContent, CardHeader, Chip, Divider, IconButton, Modal } from "@mui/material";
import { useGameContext } from "../../GameContext";
import { Close } from "@mui/icons-material";
import type { Player } from "../../types";

type AddPlayersToGroupDialogProps = {
    show: boolean,
    setShow: (show: boolean) => void
    players: Player[]
    onAddPlayersToGroup: VoidFunction
}

const AddPlayersToGroupDialog = ({ show, setShow, players, onAddPlayersToGroup }: AddPlayersToGroupDialogProps) => {

    const gameContext = useGameContext()
    return (
        <Modal
            open={show}
            onClose={() => setShow(false)}
        >
            <Card
                sx={{
                    position: 'absolute',
                    width: "50%",
                    maxHeight: "50%",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <CardHeader
                    title="Add Players to Group"
                    action={
                        <IconButton
                            onClick={() => setShow(false)}
                        >
                            <Close />
                        </IconButton>
                    }
                />
                <Divider />
                <CardContent>
                    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} paddingBottom={"64px"} >
                        {
                            gameContext.groups.map((group) => (
                                <CardActionArea key={group.id}
                                    sx={{
                                        minWidth: "300px",
                                        maxWidth: "300px",
                                        marginRight: "8px",
                                        marginBottom: "8px",
                                    }} onClick={() => {
                                        gameContext.addPlayersToGroup(players, group)
                                        onAddPlayersToGroup()
                                        setShow(false);
                                    }}>
                                    <Card>
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
                                                            <Badge badgeContent={player.numberOfGamesPlayed} color="secondary"
                                                                key={player.name}>
                                                                <Chip
                                                                    label={`${player.name}`}
                                                                />
                                                            </Badge>
                                                        ))}
                                                    </Box>
                                                )
                                            }
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            ))
                        }
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    )
}


export default AddPlayersToGroupDialog;