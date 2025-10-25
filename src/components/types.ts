
export type Player = {
    name: string;
    numberOfGamesPlayed: number;
};

export type Group = {
    id: string;
    players: Player[];
};

export type Court = {
    id: string;
    players: Player[];
    // isAvailable: boolean;
};

export type GameContextType = {
    players: Player[];
    groups: Group[];
    courts: Court[];
    addPlayers: (newPlayers: Player[]) => void;
    addGroup: (newGroup: Group) => void;
    addCourt: (newCourt: Court) => void;
    addPlayersToGroup: (players: Player[], group: Group) => void;
    addPlayersToCourt: (players: Player[], court: Court) => void;
    clearGroupPlayers: (group: Group) => void;
    clearCourtPlayers: (court: Court) => void;
    removePlayer: (player: Player) => void;
    removeGroup: (group: Group) => void;
    removeCourt: (court: Court) => void;
    removePlayerFromGroup: (player: Player, group: Group) => void;
    removePlayerFromCourt: (player: Player, court: Court) => void;
    finishGame: (court: Court) => void;
};