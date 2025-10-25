import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Modal, TextField } from "@mui/material";
import { useRef } from "react";
import { useGameContext } from "../../GameContext";
import { Close } from "@mui/icons-material";

type AddPlayersDialogProps = {
    show: boolean,
    setShow: (show: boolean) => void
}

const AddPlayersDialog = ({
    show,
    setShow
}: AddPlayersDialogProps) => {


    const gameContext = useGameContext();

    const initialValue = gameContext.players.reduce((acc, player) => {
        return acc + `${player.name}, ${player.numberOfGamesPlayed}\n`;
    }, '')
    const textAreaRef = useRef<HTMLInputElement>(null);

    const onAddPlayersClick = () => {
        const playersLines = textAreaRef.current?.value.split("\n");
        const players = playersLines?.filter(line => line.trim()).map(line => {
            const [name, numberOfGamesStr] = line.split(",").map(s => s.trim());
            return {
                name,
                numberOfGamesPlayed: numberOfGamesStr ? parseInt(numberOfGamesStr) : 0
            }
        });
        gameContext.addPlayers(players || []);
        setShow(false);
    }

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
                    title="Add Players"
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
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                inputRef={textAreaRef}
                                helperText={`Enter player names (one per line) - use this format: "name, number of games"`}
                                defaultValue={initialValue}
                                maxRows={10}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => onAddPlayersClick()}
                                >Add Players</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    )
}


export default AddPlayersDialog;