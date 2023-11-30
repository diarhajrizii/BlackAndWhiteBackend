module.exports = function compareObjects(obj1, obj2) {
  const changedData = [];

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        if (obj1[key] instanceof Date && obj2[key] instanceof Date) {
          if (obj1[key].getTime() !== obj2[key].getTime()) {
            changedData.push({
              field: key,
              old_value: obj1[key],
              new_value: obj2[key]
            });
          }
        } else {
          changedData.push({
            field: key,
            old_value: obj1[key],
            new_value: obj2[key]
          });
        }
      }
    }
  }

  return changedData;
}
