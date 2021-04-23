export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatSelectBox = (data) => {
  return data.map((dataItem) => {
    return {
      label: dataItem.name,
      value: dataItem.id,
    };
  });
};
