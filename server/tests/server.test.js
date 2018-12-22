const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// beforeEach((done) => {
//   Todo.deleteMany({}).then(() => done());
// });

describe('GET/todos',() => {

  it('fetch all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) =>{
        expect(res.body.todos.length).toBeGreaterThan(0);
      })
      .end(done);
  })
})


describe('POST/todos',() => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) =>{
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBeGreaterThan(0);
          done();
        }).catch((e) => done(e));
      })

  })

  it('should not create todo with bad data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err);
        }
        done();
        // Todo.find().then((todos) => {
        //   expect(todos.text).toBe(0);
        //   done();
        // }).catch((e) => done(e));
      })
  })
})
