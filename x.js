const obj = { searchTerm: "f@" };

const isOk = Object.keys(obj).filter((key) => key !== "searchTerm").length > 0;

console.log(isOk);
