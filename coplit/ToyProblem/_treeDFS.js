let dfs = function (node) {
  // TODO: 여기에 코드를 작성합니다.
  let values = [node.value]; // values = [1] 탐색 시작 노드
  node.children.forEach((n) => {
    // node의 자식노드의 el을 하나씩
    // ParentNode.children
    // ParentNode의 속성 children은 호출된 요소의 모든 자식 노드의 elements를 담고있는 실시간 HTMLCollection을 반환
    values = values.concat(dfs(n)); // concat(재귀함수)를 사용해서 하나씩 붙여
  });
  return values;
};

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
  this.value = value;
  this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
};
