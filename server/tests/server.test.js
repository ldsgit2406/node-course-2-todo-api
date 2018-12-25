const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// beforeEach((done) => {
//   Todo.deleteMany({}).then(() => done());
// });

const id = '5c1fb4afd2a6023ea4d1d7af';
const deleteid = '5c1ddd06f7089a2fd48e0e4e';
const patchid = '5c1fb8bdc588dc05bc222da0';

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

describe('GET /todos/:id', () => {

  it('should return todo doc',(done) => {
    var text1 = 'Test todo text';
    var todoid = new ObjectID(id).toHexString();

    request(app)
      .get(`/todos/${todoid}`)
      .expect(200)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/5c1ddd8ab459f019749dbc64`)
      .expect(404)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 400 if todo id is not valid', (done) => {
    request(app)
      .get('/todos/5c1dd')
      .expect(400)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

})


describe('DELETE /todos/:id', () => {

  it('should DELETE and return todo doc',(done) => {
    var text1 = 'Test todo text';
    var todoid = new ObjectID(deleteid).toHexString();

    request(app)
      .delete(`/todos/${todoid}`)
      .expect(200)
      .expect((res) => {
        //expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 404 if todo not found to delete', (done) => {
    request(app)
      .delete(`/todos/5c1ddd8ab459f019749dbc64`)
      .expect(404)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 400 if todo id is not valid', (done) => {
    request(app)
      .delete('/todos/5c1dd')
      .expect(400)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

})

describe('PATCH todos/:id', () =>{

  it('should PATCH and return todo doc',(done) => {

    var todoid = new ObjectID(patchid).toHexString();
    var newtext = 'New text to be updated';

    request(app)
      .patch(`/todos/${todoid}`)
      .send({
        completed : true,
        text : newtext
      })
      .expect(200)
      .expect((res) => {
        //expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 404 if todo not found to delete', (done) => {
    request(app)
      .patch(`/todos/5c1ddd8ab459f019749dbc64`)
      .expect(404)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })

  it('should return 400 if todo id is not valid', (done) => {
    request(app)
      .patch('/todos/5c1dd')
      .expect(400)
      .expect((res) => {
      //  expect(res.body.text).toBe(text1);
      })
      .end(done);
  })


})
