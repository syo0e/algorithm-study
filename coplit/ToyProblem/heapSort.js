// 아래 코드는 수정하지 마세요.
function swap(idx1, idx2, arr) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function getParentIdx(idx) {
  // TODO: 여기에 코드를 작성합니다.
  return Math.floor((idx - 1) / 2);
}

function insert(heap, item) {
  // TODO: 여기에 코드를 작성합니다.
  heap.push(item);
  if (heap.length > 1) {
    let curIdx = heap.length - 1;
    let pIdx = getParentIdx(curIdx);
    while (pIdx >= 0 && heap[curIdx] < heap[pIdx]) {
      swap(curIdx, pIdx, heap);
      curIdx = pIdx;
      pIdx = getParentIdx(curIdx);
    }
  }
  return heap;
}

function removeRoot(heap) {
  // TODO: 여기에 코드를 작성합니다.
  swap(0, heap.length - 1, heap);
  heap.pop();
  if (heap.length === 0) return [];

  let curIdx;
  let minIdx = 0;
  while (curIdx !== minIdx) {
    curIdx = minIdx;
    let left = curIdx * 2 + 1;
    let right = curIdx * 2 + 2;
    if (left < heap.length && heap[left] < heap[minIdx]) {
      minIdx = left;
    }

    if (right < heap.length && heap[right] < heap[minIdx]) {
      minIdx = right;
    }

    swap(curIdx, minIdx, heap);
  }

  return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};

const heapSort = function (arr) {
  let minHeap = binaryHeap(arr);
  // TODO: 여기에 코드를 작성합니다.
  const sorted = [];
  while (minHeap.length > 0) {
    sorted.push(minHeap[0]);
    minHeap = removeRoot(minHeap);
  }
  return sorted;
};
