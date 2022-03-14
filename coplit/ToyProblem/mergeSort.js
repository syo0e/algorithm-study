const merge = function (left, right) {
  let merged = [];
  let leftIdx = 0,
    rightIdx = 0;
  const size = left.length + right.length;

  for (let i = 0; i < size; i++) {
    if (leftIdx >= left.length) {
      merged.push(right[rightIdx]);
      rightIdx++;
    } else if (rightIdx >= right.length || left[leftIdx] <= right[rightIdx]) {
      merged.push(left[leftIdx]);
      leftIdx++;
    } else {
      merged.push(right[rightIdx]);
      rightIdx++;
    }
  }

  return merged;
};

const mergeSort = function (arr) {
  if (arr.length < 2) return arr;
  const middle = parseInt(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  const merged = merge(left, right);
  return merged;
};
