import { type Node } from "~src/models";

export const areNodesAdjacent = (n1: Node, n2: Node) => {
  const distance = (n1.row - n2.row) ** 2 + (n1.column - n2.column) ** 2;
  return distance === 1;
};

type NodeSelectableState = "ignore" | "not-selectable" | "selectable";

type CanNodeBeSelected = {
  selectedNodes: Node[];
  node: Node;
  type: "click" | "hover";
};

export const canNodeBeSelected = ({
  selectedNodes,
  node,
  type,
}: CanNodeBeSelected): NodeSelectableState => {
  const lastNode = selectedNodes[selectedNodes.length - 1];

  // Disallow node to be selected multiple times
  if (selectedNodes.includes(node)) return "ignore";

  // Disallow selection on simple hover
  if (type === "hover" && !lastNode) return "ignore";

  // Disallow only single initial selection on mobile
  if (type === "click" && lastNode) return "not-selectable";

  // Disallow non-adjacent selection
  if (type === "hover" && !areNodesAdjacent(node, lastNode))
    return "not-selectable";

  return "selectable";
};

type NodeState = "idle" | "selected" | "invalid";

type GetNodeState = {
  node: Node;
  selectedNodes: Node[];
  invalidNode: Node | null;
};

export const getNodeState = ({
  node,
  selectedNodes,
  invalidNode,
}: GetNodeState): NodeState => {
  if (invalidNode === node) return "invalid";
  if (selectedNodes.includes(node)) return "selected";
  return "idle";
};

type RemoveSelectedNodes = {
  nodes: Node[];
  selectedNodes: Node[];
  boardSize: number;
};

export const removeSelectedNodes = ({
  nodes,
  selectedNodes,
  boardSize,
}: RemoveSelectedNodes): Node[] => {
  // As this method should not modify its arguments,
  // it is necessary to clone all nodes.
  const newNodes = nodes.map((n) =>
    selectedNodes.includes(n) ? { ...n, active: false } : { ...n }
  );

  const findNode = ({ row, column }: Pick<Node, "row" | "column">) =>
    newNodes.find((n) => n.row === row && n.column === column && n.active);

  for (let column = 0; column < boardSize; column++) {
    for (let row = boardSize - 2; row >= 0; row--) {
      const node = findNode({ row, column });
      if (!node) continue;

      let lowestPossibleRow = row;
      while (!findNode({ row: lowestPossibleRow + 1, column })) {
        if (lowestPossibleRow + 1 === boardSize) break;

        lowestPossibleRow++;
      }
      node.row = lowestPossibleRow;
    }
  }

  return newNodes;
};
