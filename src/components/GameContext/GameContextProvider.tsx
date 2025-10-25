import { useEffect, useState, type ReactNode } from "react";
import { GameContext } from "./GameContext";
import type { Court, Group, Player } from "../types";
import useSessionStorage from "../../useSession";



export const GameContextProvider = ({ children }: { children: ReactNode }) => {

    const [sessionPlayers, setSessionPlayers] = useSessionStorage<Player[]>("picklball_players", [])
    const [players, setPlayers] = useState<Player[]>(sessionPlayers);
    const [groups, setGroups] = useState<Group[]>([]);
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        setSessionPlayers(players);
    }, [players, setSessionPlayers]);

    const addPlayers = (players: Player[]) => {
        setPlayers(players);
    };

    const addGroup = (group: Group) => {
        setGroups((prevGroups: Group[]) => [...prevGroups, group]);
    };

    const addCourt = (court: Court) => {
        setCourts((prevCourts: Court[]) => [...prevCourts, court]);
    };

    const addPlayersToGroup = (playersToAdd: Player[], group: Group) => {
        if (group.players.length === 4) return
        if (group.players.length + playersToAdd.length > 4) {
            playersToAdd = playersToAdd.slice(0, 4 - group.players.length);
        }
        setGroups((prevGroups: Group[]) =>
            prevGroups.map((_group) => {
                if (_group.id === group.id) {
                    return {
                        ..._group,
                        players: [..._group.players, ...playersToAdd]
                    };
                }
                return _group;
            })
        );
    }

    const addPlayersToCourt = (playersToAdd: Player[], court: Court) => {
        if (court.players.length === 4) return
        if (court.players.length + playersToAdd.length > 4) {
            playersToAdd = playersToAdd.slice(0, 4 - court.players.length);
        }
        setCourts((prevCourts: Court[]) =>
            prevCourts.map((_court) => {
                if (_court.id === court.id) {
                    return {
                        ..._court,
                        players: [..._court.players, ...playersToAdd]
                    };
                }
                return _court;
            })
        );
    }

    const clearGroupPlayers = (group: Group) => {
        setGroups((prevGroups: Group[]) =>
            prevGroups.map((_group) => {
                if (_group.id === group.id) {
                    return {
                        ..._group,
                        players: []
                    };
                }
                return _group;
            })
        );
    };

    const clearCourtPlayers = (court: Court) => {
        setCourts((prevCourts: Court[]) =>
            prevCourts.map((_court) => {
                if (_court.id === court.id) {
                    return {
                        ..._court,
                        players: []
                    };
                }
                return _court;
            })
        );
    }

    const removePlayer = (player: Player) => {
        setPlayers((prevPlayers: Player[]) =>
            prevPlayers.filter((_player) => _player.name !== player.name)
        );
    };

    const removeGroup = (group: Group) => {
        setGroups((prevGroups: Group[]) =>
            prevGroups.filter((_group) => _group.id !== group.id)
        );
    };

    const removeCourt = (court: Court) => {
        setCourts((prevCourts: Court[]) =>
            prevCourts.filter((_court) => _court.id !== court.id)
        );
    };

    const removePlayerFromGroup = (player: Player, group: Group) => {
        setGroups((prevGroups: Group[]) =>
            prevGroups.map((_group) => {
                if (_group.id === group.id) {
                    return {
                        ..._group,
                        players: _group.players.filter((_player) => _player.name !== player.name)
                    };
                }
                return _group;
            })
        );
    };

    const removePlayerFromCourt = (player: Player, court: Court) => {
        setCourts((prevCourts: Court[]) =>
            prevCourts.map((_court) => {
                if (_court.id === court.id) {
                    return {
                        ..._court,
                        players: _court.players.filter((_player) => _player.name !== player.name)
                    };
                }
                return _court;
            })
        );
    };

    const finishGame = (court: Court) => {
        setPlayers((prevPlayers: Player[]) =>
            prevPlayers.map((player) => {
                if (court.players.find((_player) => _player.name === player.name)) {
                    return {
                        ...player,
                        numberOfGamesPlayed: player.numberOfGamesPlayed + 1
                    };
                }
                return player;
            })
        );
        clearCourtPlayers(court);
    };

    return (
        <GameContext.Provider value={{
            players,
            groups,
            courts,
            addPlayers,
            addGroup,
            addCourt,
            addPlayersToGroup,
            addPlayersToCourt,
            clearCourtPlayers,
            clearGroupPlayers,
            removePlayer,
            removeGroup,
            removeCourt,
            removePlayerFromGroup,
            removePlayerFromCourt,
            finishGame
        }}>
            {children}
        </GameContext.Provider>
    );
}