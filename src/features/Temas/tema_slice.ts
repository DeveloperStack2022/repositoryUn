import {SelectTema} from './model'
import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import {fetchBaseQuery} from '@reduxjs/toolkit/query'


const initialState:SelectTema = {
    id:null
}

export const temaSlice = createSlice({
    name:"tema_slice",
    initialState:initialState,
    reducers:{
        select_tema:(state,action:PayloadAction<{id:number | null}>) => {
            state.id = action.payload.id
        }
    }
})

export const {select_tema} = temaSlice.actions;
export default temaSlice.reducer
