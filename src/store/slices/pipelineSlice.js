import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all pipelines
export const fetchPipelines = createAsyncThunk(
  "pipelines/fetchAll",
  async () => {
    const res = await axios.get("/api/pipelines");
    return res.data;
  }
);

// Reserve a pipeline
export const reservePipeline = createAsyncThunk(
  "pipelines/reserve",
  async ({ pipelineId, duration }) => {
    const res = await axios.post(`/api/pipelines/${pipelineId}/reserve`, { duration });
    return res.data;
  }
);

const pipelineSlice = createSlice({
  name: "pipelines",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPipelines: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPipelines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPipelines.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPipelines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(reservePipeline.fulfilled, (state, action) => {
        // update the pipeline’s status in global state
        const updated = action.payload;
        const index = state.items.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      });
  },
});

export const { clearPipelines } = pipelineSlice.actions;
export default pipelineSlice.reducer;
