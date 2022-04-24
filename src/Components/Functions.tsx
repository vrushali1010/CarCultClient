export const numberSeparator = (num: number) => {
  const revereseNum = num.toString().split("").reverse().join("");
  return revereseNum
    .match(/.{1,3}/g)!
    .join(",")
    .split("")
    .reverse()
    .join("");
};
export const handleDrop = (
  selected: any,
  name: string,
  setCarBrand: (value: number) => void,
  values: any,
  setValues: (value: any) => void
) => {
  if (Array.isArray(selected) && selected.length > 0) {
    if (name === "brand") {
      setCarBrand(selected[0].id);
      setValues({ ...values, brand: selected[0].label });
    } else {
      setValues({ ...values, [name]: selected[0] });
    }
  } else if (!Array.isArray(selected)) {
    setValues({ ...values, [name]: selected });
  }
};
