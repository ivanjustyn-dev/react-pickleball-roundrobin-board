import { Box, Card, CardActionArea, CardContent, CardHeader, Divider, IconButton, Modal } from "@mui/material";
import type { Group } from "../../types";
import { useGameContext } from "../../GameContext";
import { Close } from "@mui/icons-material";

type MovePlayersToCourtDialogProps = {
    show: boolean,
    setShow: (show: boolean) => void
    group?: Group
};

const MovePlayersToCourtDialog = ({
    show,
    setShow,
    group
}: MovePlayersToCourtDialogProps) => {
    const gameContext = useGameContext();
    return (
        <Modal open={show} onClose={() => { setShow(false); }}>
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
                    title="Move Players to Courts"
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
                            gameContext.courts.map((court, idx) => (
                                <CardActionArea key={court.id}
                                    sx={{
                                        minWidth: "300px",
                                        maxWidth: "300px",
                                        marginRight: "8px",
                                        marginBottom: "8px",
                                    }} onClick={() => {
                                        if (group) {
                                            gameContext.addPlayersToCourt(group.players, court);
                                            gameContext.clearGroupPlayers(group);
                                        }
                                        setShow(false);
                                    }}>
                                    <Card>
                                        <CardHeader
                                            title={`Court ${idx + 1}`}
                                        />
                                    </Card>
                                </CardActionArea>
                            ))
                        }
                    </Box>
                </CardContent>

            </Card>
        </Modal>
    );
};

export default MovePlayersToCourtDialog;