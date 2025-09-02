import api from "./app";

export const getCounties = () => {
  return api.get("counties/");
};

export const searchAny = (q) => {
  return api.get("search/", { params: { q } });
};

export const getCountyLeaders = (id) => {
 
  return api.get(`counties/${id}/`);
};
export const getRoles = (positionName) => {
  return api.get(`positions/${positionName}`);
};

export const getElectionDetails =()=>{
  return api.get("elections/");
};

/* getCounties() returns a list of all counties, searchAny takes q as parameter(can be county,leader,costituency),getCountyLeaders()
returns leaders of a particular county by id...getRoles() lists roles of a given position as input.....getElectionDetails()-->
returns a list of all elections availble */