const { describe, expect, test } = require('@jest/globals')
const todos = require("../src/service/todo")
const todoSchema = require("../src/model/todo")

const mongoose = require('mongoose');
require('dotenv').config();

const URL = "mongodb://localhost:27017/";
const DATABASE = "collabera_api_test";
const connectionString = `${URL}${DATABASE}`;

beforeAll(async () => {
  connection = await mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true });
  db = mongoose.connection;
  const collection = 'todo_collection'
  await db.createCollection(collection);
  testTodo = await todoSchema.create({name:'test todo', description:'test todo description'})
});

afterAll(async () => {
  const collection = 'todo_collection'
  await db.dropCollection(collection);
  await db.dropDatabase();
  await db.close();
});


describe('test get todos', () => {
  test('returns list of todos and pagination data if valid request params', async () => {
    let validPageParams = {
      page: 1,
      limit: 5,
      status: 'all'
    }
    const getTodos = await todos.getTodos(validPageParams)
    expect(getTodos).toHaveProperty('todos')
  })
});

describe('test create todos', ()=> {
  test('returns created object if valid request body', async () => {
    let body = {
      name:"testTodod",
      description: "testtodo description"
    }

    const createTodo = await todos.createTodo(body);
    expect(createTodo).toEqual(
      expect.objectContaining({
        name: "testTodod",
        description: "testtodo description"
      })
    );
  })
})

describe('test update todos', ()=> {
  test('returns updated object if valid request body', async () => {
    let body = {
      name:"updated",
      description: "test todo description updated"
    }

    let id = testTodo._id

    const updatedTodo = await todos.updateTodos(id,body);
    expect(updatedTodo).toEqual(
      expect.objectContaining({
        name: "updated",
        description: "test todo description updated"
      })
    );
  })
})


describe('test complete a todo', ()=> {
  test('returns completed object if valid todo id provided', async () => {

    let id = testTodo._id

    const completedTodo = await todos.completeTodos(id);
    expect(completedTodo).toEqual(
      expect.objectContaining({
        completed: true
      })
    );
  })
})


describe('test delete a todo', ()=> {
  test('returns deleted object if valid todo id provided', async () => {

    let id = testTodo._id

    const deletedTodo = await todos.deleteTodos(id);
    expect(deletedTodo).toEqual(
      expect.objectContaining({
        is_deleted: true
      })
    );
  })
})
