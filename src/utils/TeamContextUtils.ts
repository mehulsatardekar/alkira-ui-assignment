import { TeamsType } from "../types";

const filterBySearch = (data: TeamsType[], query: string) => {
  if (query !== "") {
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  return data;
};

const sortByTeams = (data: TeamsType[], sort: boolean) => {
  if (!sort) {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort) {
    return data.sort((a, b) => b.name.localeCompare(a.name));
  }
  return data;
};

export { filterBySearch, sortByTeams };
