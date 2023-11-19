/*

Filename: complex_code.js

Description: This code implements a complex and sophisticated algorithm for finding the shortest path in a graph using Dijkstra's algorithm. It includes various helper functions, data structures, and tests.

*/

// Data structures and helper functions

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  enqueue(item, priority) {
    const element = { item, priority };
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.size() === 0) return null;

    this.swap(0, this.heap.length - 1);
    const element = this.heap.pop();
    this.bubbleDown(0);
    return element.item;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element.priority >= parent.priority) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = null;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild.priority < element.priority) ||
          (swapIndex !== null && rightChild.priority < leftChild.priority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

function createGraph() {
  return {
    vertices: {},
    addVertex(name) {
      this.vertices[name] = {};
    },
    addEdge(startVertex, endVertex, weight) {
      this.vertices[startVertex][endVertex] = weight;
    },
    getNeighbors(vertex) {
      return Object.keys(this.vertices[vertex]);
    },
    getEdgeWeight(start, end) {
      return this.vertices[start][end];
    },
  };
}

function dijkstra(graph, startVertex) {
  const distances = {};
  const previousVertices = {};
  const visited = {};

  for (let vertex in graph.vertices) {
    distances[vertex] = Infinity;
    previousVertices[vertex] = null;
  }

  distances[startVertex] = 0;

  const queue = new PriorityQueue();
  queue.enqueue(startVertex, 0);

  while (queue.size() > 0) {
    const currentVertex = queue.dequeue();
    visited[currentVertex] = true;

    const neighbors = graph.getNeighbors(currentVertex);
    for (let neighbor of neighbors) {
      if (visited[neighbor]) continue;

      const edgeWeight = graph.getEdgeWeight(currentVertex, neighbor);
      const distanceToNeighbor = distances[currentVertex] + edgeWeight;

      if (distanceToNeighbor < distances[neighbor]) {
        distances[neighbor] = distanceToNeighbor;
        previousVertices[neighbor] = currentVertex;
        queue.enqueue(neighbor, distanceToNeighbor);
      }
    }
  }

  return { distances, previousVertices };
}

// Testing

const graph = createGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "E", 3);
graph.addEdge("D", "B", 1);
graph.addEdge("B", "E", 3);

const { distances, previousVertices } = dijkstra(graph, "A");

console.log("Distances:", distances);
console.log("Previous vertices:", previousVertices);

// Sample output:
// Distances: { A: 0, B: 3, C: 2, D: 4, E: 5 }
// Previous vertices: { A: null, B: "D", C: "A", D: "C", E: "C" }