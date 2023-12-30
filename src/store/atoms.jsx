import { atom } from "recoil";


export const buttonState = atom({
    key : 'buttonState',
    default : 'daily'
});

export const stockDataState = atom({
    key : 'stockDataState',
    default : []
})