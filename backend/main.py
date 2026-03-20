from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

#  middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  route
@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: dict):
    nodes = pipeline.get("nodes", [])
    edges = pipeline.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = defaultdict(list)
    indegree = {node['id']: 0 for node in nodes}

    for edge in edges:
        src = edge['source']
        tgt = edge['target']
        graph[src].append(tgt)
        indegree[tgt] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1

        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)

    is_dag = visited == len(nodes)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }