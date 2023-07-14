export interface User {
  room1: Room;
  room2: Room;
  room3: Room;
  isOnline: boolean;
  totalYuuriPoint: number;
  currentRoom: 1 | 2 | 3 | null;
}

export type Room = {
  point: number;
  isAnswer: boolean;
  ranking: "first" | "second" | "third" | "unranked";
};
