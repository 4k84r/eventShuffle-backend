import request from 'supertest';
import app from '../src/app'; 
import EventService from '../src/services/EventService';
import VoteService from '../src/services/VoteService';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


jest.mock('../src/services/EventService');
jest.mock('../src/services/VoteService');

jest.setTimeout(20000);


jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue({
      connection: {
        host: 'localhost',
        on: jest.fn(),
        close: jest.fn().mockResolvedValue(true),
      },
    }),
    connection: {
      close: jest.fn().mockResolvedValue(true),
    },
  };
});


process.env.JWT_SECRET = 'secret';


const mockUserId = "new-mocked-user";
const mockToken = jwt.sign(
  { id: mockUserId, username: 'testuser' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

beforeAll(async () => {
  
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Event API', () => {
  it('should create a new event', async () => {
    (EventService.createEvent as jest.Mock).mockResolvedValue({
      _id: '123',
      name: 'Test Event',
      dates: ['2024-02-11', '2024-02-12'],
      votes: [],
    });

    const res = await request(app)
      .post('/api/v1/event')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        name: 'Test Event',
        dates: ['2024-02-11', '2024-02-12'],
      });

    console.log('Create event response:', res.status, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', '123');
    expect(res.body).toHaveProperty('name', 'Test Event');
    expect(res.body).toHaveProperty('dates');
    expect(res.body.dates).toEqual(['2024-02-11', '2024-02-12']);
  });

  it('should list all events', async () => {
    (EventService.listEvents as jest.Mock).mockResolvedValue([
      {
        _id: '123',
        name: 'Test Event 1',
        dates: ['2024-02-11'],
        votes: [],
      },
      {
        _id: '456',
        name: 'Test Event 2',
        dates: ['2024-03-11'],
        votes: [],
      },
    ]);

    const res = await request(app)
      .get('/api/v1/event/list')
      .set('Authorization', `Bearer ${mockToken}`);

    console.log('List events response:', res.status, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('events');
    expect(res.body.events).toHaveLength(2);
    expect(res.body.events[0]).toHaveProperty('name', 'Test Event 1');
  });

  it('should retrieve a specific event', async () => {
    (EventService.getEvent as jest.Mock).mockResolvedValue({
      _id: '123',
      name: 'Test Event',
      dates: ['2024-02-11'],
      votes: [],
    });

    const res = await request(app)
      .get('/api/v1/event/123')
      .set('Authorization', `Bearer ${mockToken}`);

    console.log('Retrieve specific event response:', res.status, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', '123');
    expect(res.body).toHaveProperty('name', 'Test Event');
    expect(res.body.dates).toEqual(['2024-02-11']);
  });

  it('should add votes to an event', async () => {
    (VoteService.addVotes as jest.Mock).mockResolvedValue({
      _id: '123',
      name: 'Test Event',
      dates: ['2024-02-11'],
      votes: [
        {
          date: '2024-02-11',
          people: ['testuser']
        }
      ],
    });

    const res = await request(app)
      .post('/api/v1/event/123/vote') 
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        name: 'testuser',
        votes: ['2024-02-11'],
      });

    console.log('Add votes response:', res.status, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', '123'); 
    expect(res.body.votes).toHaveLength(1);
    expect(res.body.votes[0]).toHaveProperty('date', '2024-02-11');
    expect(res.body.votes[0].people).toContain('testuser');
  });

  it('should get event results', async () => {
    (VoteService.getResults as jest.Mock).mockResolvedValue({
      uniqueId: '123',
      name: 'Test Event',
      suitableDates: [
        {
          date: '2024-02-11',
          people: ['testuser']
        }
      ],
    });

    const res = await request(app)
      .get('/api/v1/event/123/results')
      .set('Authorization', `Bearer ${mockToken}`);

    console.log('Get event results response:', res.status, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('uniqueId', '123'); 
    expect(res.body.suitableDates).toHaveLength(1);
    expect(res.body.suitableDates[0]).toHaveProperty('date', '2024-02-11');
    expect(res.body.suitableDates[0].people).toContain('testuser');
  });
});
