export const HINT_LEVEL = {
  state: {
    persistedLevel: {
      seed: 2343291362,
      difficultyOptions: {
        boardSize: 3,
        maxPathCount: 3,
        maxPathLength: 4,
        operationDistribution: { addition: 70, subtraction: 30 },
        preset: "normal",
      },
      nodes: [
        {
          id: "bbb19f6a-441e-4577-88d2-33b4d7ed2c12",
          active: true,
          row: 0,
          column: 0,
          value: 7,
        },
        {
          id: "b5e87960-cf1d-4508-ace3-8ee9ca4cb5af",
          active: true,
          row: 0,
          column: 1,
          value: 9,
        },
        {
          id: "5506f862-a81b-48ce-a097-cada6b70317b",
          active: true,
          row: 0,
          column: 2,
          value: 6,
        },
        {
          id: "f116bbb2-db37-40ae-9030-fc4e340b9223",
          active: true,
          row: 1,
          column: 0,
          value: 1,
        },
        {
          id: "79728abe-7175-4b90-a013-3f02c90f3da1",
          active: true,
          row: 1,
          column: 1,
          value: 4,
        },
        {
          id: "0d5f095d-037b-4b09-8074-109fccf92f40",
          active: true,
          row: 1,
          column: 2,
          value: 1,
        },
        {
          id: "7ff76457-fedb-4950-bba4-caf07860402f",
          active: true,
          row: 2,
          column: 0,
          value: 7,
        },
        {
          id: "43c295fa-7d2a-4576-a37c-24fe5d0a7373",
          active: true,
          row: 2,
          column: 1,
          value: 8,
        },
        {
          id: "7d6f218b-d030-4c7a-b321-6091a2dca2b1",
          active: true,
          row: 2,
          column: 2,
          value: 4,
        },
      ],
      edges: [
        {
          id: "80b06f62-f219-46b3-9549-1f55ff0ac020",
          active: true,
          row: 0,
          column: 0,
          orientation: "horizontal",
          operation: "addition",
        },
        {
          id: "5a553329-4ecd-477a-a26d-3aac7a23a9d3",
          active: true,
          row: 0,
          column: 1,
          orientation: "horizontal",
          operation: "subtraction",
        },
        {
          id: "876ad98c-c307-478f-87cb-ddd07654c5db",
          active: true,
          row: 1,
          column: 0,
          orientation: "horizontal",
          operation: "subtraction",
        },
        {
          id: "ee140588-74b6-4f27-89be-b02ea454e349",
          active: true,
          row: 1,
          column: 1,
          orientation: "horizontal",
          operation: "addition",
        },
        {
          id: "19dfbe90-b533-4900-b5b3-783ca2bf7301",
          active: true,
          row: 2,
          column: 0,
          orientation: "horizontal",
          operation: "subtraction",
        },
        {
          id: "500d64fc-ba91-4e61-987d-ff63fa013447",
          active: true,
          row: 2,
          column: 1,
          orientation: "horizontal",
          operation: "subtraction",
        },
        {
          id: "378de2b2-aace-4ac6-bdfa-fad4248f5f2a",
          active: true,
          row: 0,
          column: 0,
          orientation: "vertical",
          operation: "addition",
        },
        {
          id: "89fbf704-2443-49c2-9cc7-d77bbfb405e0",
          active: true,
          row: 0,
          column: 1,
          orientation: "vertical",
          operation: "addition",
        },
        {
          id: "c4d3dd0f-6262-4eff-875a-7dc11152253b",
          active: true,
          row: 0,
          column: 2,
          orientation: "vertical",
          operation: "subtraction",
        },
        {
          id: "c8772662-a274-400a-95d4-0c8895af6837",
          active: true,
          row: 1,
          column: 0,
          orientation: "vertical",
          operation: "addition",
        },
        {
          id: "4e74de6e-d737-462c-bfc1-6084c4a2622f",
          active: true,
          row: 1,
          column: 1,
          orientation: "vertical",
          operation: "subtraction",
        },
        {
          id: "c435abc7-16a0-4421-b231-4fc3238b7175",
          active: true,
          row: 1,
          column: 2,
          orientation: "vertical",
          operation: "addition",
        },
      ],
      objectives: [
        {
          id: "e200fb25-81a6-4568-a042-e84ecd3634d6",
          index: 0,
          path: [
            { row: 0, column: 2 },
            { row: 1, column: 2 },
            { row: 2, column: 2 },
          ],
          value: 9,
        },
        {
          id: "58307d9e-fd1a-4a90-951c-d1dfec9d8f23",
          index: 1,
          path: [
            { row: 1, column: 1 },
            { row: 1, column: 0 },
            { row: 0, column: 0 },
            { row: 0, column: 1 },
          ],
          value: 19,
        },
        {
          id: "3d24ce6e-c726-4151-89a9-f60b109aa9dd",
          index: 2,
          path: [
            { row: 2, column: 1 },
            { row: 2, column: 0 },
          ],
          value: 1,
        },
      ],
      activeObjectiveIndex: 0,
      history: [],
      hint: null,
    },
  },
  version: 1,
};
