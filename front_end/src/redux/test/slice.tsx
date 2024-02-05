import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isTest: false,
  message: "",
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    _test: (state, { payload }) => {
      state.isTest = true
      state.message = String(payload.message)
    },
  },

})

export const { _test } = testSlice.actions

export default testSlice.reducer