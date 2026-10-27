const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { app, resetTasks } = require("../src/app");

test.beforeEach(() => {
  resetTasks();
});

test("GET /health returns healthy status", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("POST /api/tasks creates a task", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "Learn Docker" });

  assert.equal(response.status, 201);
  assert.equal(response.body.title, "Learn Docker");
  assert.equal(response.body.completed, false);
  assert.equal(response.body.id, 1);
});

test("POST /api/tasks rejects an empty title", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "   " });

  assert.equal(response.status, 400);
});

test("GET /api/tasks returns created tasks", async () => {
  await request(app).post("/api/tasks").send({ title: "Learn Kubernetes" });

  const response = await request(app).get("/api/tasks");

  assert.equal(response.status, 200);
  assert.equal(response.body.length, 1);
  assert.equal(response.body[0].title, "Learn Kubernetes");
});
