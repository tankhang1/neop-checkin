import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type TWorkspace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  brandname: string;
  accountId: string;
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
};
export type TAccount = {
  id: string;
  email: string;
  name: string;
  phone: string;
  url: string;
};
export type TState = {
  brandname: string;
  workspace: TWorkspace[];
  employees: TEmployee[];
  account: TAccount | null;
};

const initialState: TState = {
  account: null,
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
    setAccount: (state, action: PayloadAction<TAccount>) => {
      state.account = action.payload;
    },
    updateAccount: (state, action: PayloadAction<Partial<TAccount>>) => {
      const cleanedData = Object.fromEntries(Object.entries(action.payload).filter(([_, v]) => v != undefined));
      if (state.account) state.account = { ...state.account, ...cleanedData };
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
    logout: (state) => {
      state.account = null;
      state.workspace = [];
      state.employees = [];
    },
  },
});
export const {
  updateBrandName,
  setAccount,
  setWorkspace,
  setEmployees,
  addWorkspace,
  addEmployee,
  updateAccount,
  deleteEmployee,
  deleteWorkspace,
  logout,
} = appSlice.actions;
export default appSlice.reducer;
