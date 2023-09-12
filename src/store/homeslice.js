import { createSlice } from '@reduxjs/toolkit'


export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
       getApplicationConfiuration:(state, actions)=>{
state.url=actions.payload;
       },
       getGenre:(state, actions)=>{
        state.genres=actions.payload;
       }
    },
})

// Action creators are generated for each case reducer function
export const { getApplicationConfiuration, getGenre } = homeSlice.actions

export default homeSlice.reducer