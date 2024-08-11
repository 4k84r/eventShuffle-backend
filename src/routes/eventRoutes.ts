import { Router } from 'express';
import EventController from '../controllers/EventController';
import VoteController from '../controllers/VoteController';
import ResultsController from '../controllers/ResultsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints for managing events
 */

/**
 * @swagger
 * /api/v1/event/list:
 *   get:
 *     summary: Get a list of all events
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66b4b0a4ef9aaa4fc93e4a9e"
 *                       name:
 *                         type: string
 *                         example: "event-1"
 *                       uniqueId:
 *                         type: string
 *                         example: "44b5e50b-db3d-470c-9d1c-d1cc768195d4"
 *                   example:
 *                     - _id: "66b4b0a4ef9aaa4fc93e4a9e"
 *                       name: "event-1"
 *                       uniqueId: "44b5e50b-db3d-470c-9d1c-d1cc768195d4"
 *                     - _id: "66b5e77a061ab00532df7736"
 *                       name: "example-event"
 *                       uniqueId: "211adaee-0a9e-4406-b5b6-877e9152fce1"
 *       500:
 *         description: Internal Server Error
 */
 router.get('/list', EventController.listEvents);


/**
 * @swagger
 * /api/v1/event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Akbar"
 *               dates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                   example: "2024-02-11"
 *                 example: ["11-02-2024", "12-02-2024"]
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66b5efa7bdc914079b2429e6"
 *                 name:
 *                   type: string
 *                   example: "Akbar"
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *                     example: "2024-02-11"
 *                   example: ["11-02-2024", "12-02-2024"]
 *                 votes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       voterId:
 *                         type: string
 *                         example: "voter123"
 *                       voteDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-02-11"
 *                   example: []
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
 router.post('/', EventController.createEvent);

/**
 * @swagger
 * /api/v1/event/{id}:
 *   get:
 *     summary: Get details of a specific event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66b5e77a061ab00532df7736"
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66b5e77a061ab00532df7736"
 *                 name:
 *                   type: string
 *                   example: "event-name"
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *                     example: "2024-08-24"
 *                   example: ["2024-08-24"]
 *                 votes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-21"
 *                       people:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Akbar"
 *                         example: ["Akbar"]
 *                   example:
 *                     - date: "2024-08-21"
 *                       people:
 *                         - "Akbar"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
 router.get('/:id', EventController.getEvent);

/**
 * @swagger
 * api/v1/event/{id}/vote:
 *   post:
 *     summary: Add a vote to a specific event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66b5e77a061ab00532df7736"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Akbar"
 *               votes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-12"
 *                 example: ["12-12-2024"]
 *     responses:
 *       200:
 *         description: Vote added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66b5e77a061ab00532df7736"
 *                 name:
 *                   type: string
 *                   example: "event-name"
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *                     example: "2024-08-24"
 *                   example: ["2024-08-24"]
 *                 votes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-21"
 *                       people:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Akbar"
 *                         example: ["Akbar"]
 *                   example:
 *                     - date: "2024-08-21"
 *                       people:
 *                         - "Akbar"
 *                     - date: "2024-12-12"
 *                       people:
 *                         - "Akbar"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
 router.post('/:id/vote', VoteController.addVote);

/**
 * @swagger
 * api/v1/event/{id}/results:
 *   get:
 *     summary: Get the voting results for a specific event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "211adaee-0a9e-4406-b5b6-877e9152fce1"
 *     responses:
 *       200:
 *         description: Voting results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66b5e77a061ab00532df7736"
 *                 name:
 *                   type: string
 *                   example: "ass"
 *                 suitableDates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-08-21"
 *                       people:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Akbar"
 *                         example: ["Akbar"]
 *                   example:
 *                     - date: "2024-08-21"
 *                       people:
 *                         - "Akbar"
 *                     - date: "12-12-2024"
 *                       people:
 *                         - "Akbar"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
 router.get('/:id/results', ResultsController.getResults);


export default router;
