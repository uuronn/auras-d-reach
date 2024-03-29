export interface User {
  room1: Room;
  room2: Room;
  room3: Room;
  isOnline: boolean;
  totalYuuriPoint: number;
  currentRoom: 1 | 2 | 3 | null;
  displayName: string;
}

export type Room = {
  point: number;
  isAnswer: boolean;
  ranking: "first" | "second" | "third" | "unranked";
};

export type CurrentRoomQuestion = {
  answer: string;
  lyrics: string;
  choices: string[];
};

export type UserStatus = {
  id: string;
  name: string;
  isAnswer: boolean;
};

export type ResultUser = {
  id: string;
  name?: string;
  point: number;
};
