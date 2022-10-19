import axios from 'axios';
import { DegreeSliceState } from 'reducers/degreeSlice';
import { PlannerSliceState } from 'reducers/plannerSlice';

const migrateLocalStorageData = (token: string): void => {
  const data = JSON.parse(localStorage.getItem('persist:root') ?? '{}') as {
    [key: string]: string;
  };
  const degree = JSON.parse(data.degree ?? {}) as DegreeSliceState;
  const planner = JSON.parse(data.planner ?? {}) as PlannerSliceState;
  axios.post('/planner/saveLocalStorage/', JSON.stringify({ degree, planner, token }));
};
export default migrateLocalStorageData;
