const forWindow = (size, array, task) => {
  let max = array.length, isFast = task.length !== 1;
  if (!max || !size) return;
  if (size >= max) return isFast ? task(0, max) : task(array);
  max = max - size + 1;
  if (isFast) for(let i = 0; i < max; i++) task(i, i+size);
  else for(let i = 0; i < max; i++) task(array.slice(i, i+size));
}

module.exports = { forWindow }
