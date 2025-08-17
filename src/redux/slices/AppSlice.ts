import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type TWorkspace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  brandname: string;
};
export type TPosition = 'Staff' | 'Manager';
export type TStatus = 'Working' | 'Off' | 'Disable';
export type TWorklist = {
  id: string;
  dateIn: Date;
  dateOut: Date;
};
export type TEmployee = {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  phone: string;
  position: TPosition;
  status: TStatus;
  worklist: TWorklist[];
};
export type TState = {
  brandname: string;
  workspace: TWorkspace[];
  employees: TEmployee[];
};
const initialState: TState = {
  brandname: '',
  workspace: [],
  employees: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateBrandName: (state, action: PayloadAction<string>) => {
      state.brandname = action.payload;
    },
    setWorkspace: (state, action: PayloadAction<TWorkspace[]>) => {
      state.workspace = action.payload;
    },
    setEmployees: (state, action: PayloadAction<TEmployee[]>) => {
      state.employees = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<TWorkspace>) => {
      state.workspace.push(action.payload);
    },
    addEmployee: (state, action: PayloadAction<TEmployee>) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload);
    },
    deleteWorkspace: (state, action: PayloadAction<string>) => {
      state.workspace = state.workspace.filter((ws) => ws.id !== action.payload);
      state.employees = state.employees.filter((emp) => emp.workspaceId !== action.payload);
    },
  },
});
export const { updateBrandName, setWorkspace, setEmployees, addWorkspace, addEmployee, deleteEmployee, deleteWorkspace } =
  appSlice.actions;
export default appSlice.reducer;
