import { Box, Chip, IconButton, Typography } from "@mui/material";
import type { Player } from "../types";
import { Close } from "@mui/icons-material";




type PlayerCardProps = {
    player: Player;
    onClick?: () => void;
    isSelected?: boolean;
    onClose?: () => void;
}

const PlayerCard = ({ player, isSelected, onClick, onClose }: PlayerCardProps) => {
    return (<Box display="flex" alignItems="center" gap={1} padding={"4px"}
        sx={{
            backgroundColor: isSelected ? "secondary.light" : "primary.light",
            borderColor: isSelected ? "secondary.main" : "primary.main",
            border: '1px solid',
            borderRadius: '8px',
            cursor: onClick ? 'pointer' : 'default',

        }}
        onClick={onClick}
    >
        <Typography variant="body1">{player.name}</Typography>
        <Chip
            label={player.numberOfGamesPlayed}
            sx={{
                height: 20,
                fontSize: 12,
                px: 0.5,
                backgroundColor: isSelected ? "secondary.dark" : "error.dark",
                color: "white",
            }}
        />
        {onClose &&
            <IconButton size="small" onClick={onClose} >
                <Close fontSize="small" />
            </IconButton>
        }
    </Box>
    )
}


export default PlayerCard;