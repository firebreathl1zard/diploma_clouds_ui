import { createSlice } from '@reduxjs/toolkit';

const selectedPackageSlice = createSlice({
    name: 'selectedPackage',
    initialState: {
        packageIds: [],
        package_ids: [],
        versions: [], 
    },
    reducers: {
        setSelectedPackage: (state, action) => {
            if (!state.packageIds.includes(action.payload.packageId)) {
                state.packageIds.push(action.payload.packageId);
            }
            if (!state.package_ids.includes(action.payload.package_id)) {
                state.package_ids.push(action.payload.package_id);
            }
            if (!state.versions.includes(action.payload.version)) {
                state.versions.push(action.payload.version);
            }
        },
        clearSelectedPackage: (state) => {
            state.packageIds = [];
            state.package_ids = [];
            state.versions = [];
        },
    },
});

export const { setSelectedPackage, clearSelectedPackage } = selectedPackageSlice.actions;
export default selectedPackageSlice.reducer;