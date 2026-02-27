// src/lib/toolbarLogic.ts
import { writable, get } from 'svelte/store';

export const isEditMode = writable(false);
export const isMoveMode = writable(false);
export type Role = 'STUDENT' | 'TEACHER' | 'TUTOR' | 'PROJECTMANAGER' | 'SCHOOLDIRECTOR' | 'MODERATOR' | 'ADMIN';
export interface User {
  id: number;
  email: string;
  jwt: string;
  roles: Role[];
}

export const isModerator = writable(false);
export const user = writable<User>({
  id: 0,
  email: '',
  jwt: '',
  roles: []
});

export const layout = writable({
  viewWidth: 0,
  viewHeight: 0,
  imgWidth: 0,
  imgHeight: 0,
  imgOffsetX: 0,
  imgOffsetY: 0,
  scale: 1
})

export function setUser(setid: number, setemail: string, setjwt: string, setroles: Role[]){
  user.set({
    id: setid,
    email: setemail,
    jwt: setjwt,
    roles: setroles
  });
  const roles = get(user).roles ?? [];
  isModerator.set(roles.includes('MODERATOR'));
}

export function unsetUser(){
  user.set({
      id: 0,
      email: '',
      jwt: '',
      roles: []
    });
  isModerator.set(false);
  resetModes();
}

// Du kannst auch Hilfsfunktionen exportieren:
export function toggleMoveMode() {
  console.log(`Toggle Move Mode: ${get(isMoveMode)}`);
  
  isMoveMode.update((active) => {
    if (!active) {
      resetModes();
    }
    return !active;
  });
}

export function toggleEditMode() {
  isEditMode.update((active) => {
    if (!active) {
      resetModes();
    }
    return !active;
  });
}

export function resetModes() {
  isEditMode.set(false);
  isMoveMode.set(false);
}
