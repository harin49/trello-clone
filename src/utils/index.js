export const rand = () => {
  return Math.round(Math.random() * 20); // function to generate random id
};

export const options = [
  {
    label: "Add List",
    type: "add"
  },
  {
    label: "Delete List",
    type: "delete"
  }
];
