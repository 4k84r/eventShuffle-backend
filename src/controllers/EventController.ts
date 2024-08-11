import { Request, Response } from 'express';
import EventService from '../services/EventService';
import logger from '../middleware/logger';

class EventController {

  /**
   * Listing out the events.
   * @param req - The request object
   * @param res - The response object.
   */

  static async listEvents(req: Request, res: Response) {
    try {
      const events = await EventService.listEvents();
      res.json({ events });
    } catch (err) {
      logger.error(`Error creating event: ${err instanceof Error ? err.message : 'Something went wrong!'}`);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      const errorCode = (err as { code?: number }).code ?? 400;
      const statusCode = typeof errorCode === 'number' ? errorCode : 400;
      res.status(statusCode).send(errorMessage);
    }
  }

  /**
   * Create the Event.
   * @param req - The request object
   * @param res - The response object.
   */

  static async createEvent(req: Request, res: Response) {
    try {
      const { name, dates } = req.body;
      if (!name || !dates) {
        return res.status(400).json({ msg: 'Please provide both name and dates' });
      }
      const event = await EventService.createEvent(name, dates);
      res.json({
        id: event._id,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      logger.error(`Error creating event: ${err instanceof Error ? err.message : 'Something went wrong!'}`);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      const errorCode = (err as { code?: number }).code ?? 400;
      const statusCode = typeof errorCode === 'number' ? errorCode : 400;
      res.status(statusCode).send(errorMessage);
    }
  }

  /**
   * Get Event Details.
   * @param req - The request object
   * @param res - The response object.
   */


  static async getEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await EventService.getEvent(id);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json({
        id: event._id,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      logger.error(`Error fetching event: ${err instanceof Error ? err.message : 'Something went wrong!'}`);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      const errorCode = (err as { code?: number }).code ?? 400;
      const statusCode = typeof errorCode === 'number' ? errorCode : 400;
      res.status(statusCode).send(errorMessage);
    }
  }

  /**
   * Add the votes to the event.
   * @param req - The request object
   * @param res - The response object.
   */


  static async addVotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, votes } = req.body;
      if (!name || !votes) {
        return res.status(400).json({ msg: 'Please provide name and votes' });
      }
      const event = await EventService.addVotes(id, name, votes);
      res.json({
        id: event._id,
        name: event.name,
        dates: event.dates,
        votes: event.votes.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      logger.error(`Error adding votes: ${err instanceof Error ? err.message : 'Something went wrong!'}`);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      const errorCode = (err as { code?: number }).code ?? 400;
      const statusCode = typeof errorCode === 'number' ? errorCode : 400;
      res.status(statusCode).send(errorMessage);
    }
  }

  /**
   * Get Events results by id.
   * @param req - The request object
   * @param res - The response object.
   */


  static async getEventResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const results = await EventService.getEventResults(id);
      res.json({
        id: results.uniqueId,
        name: results.name,
        suitableDates: results.suitableDates.map(vote => ({
          date: vote.date,
          people: vote.people
        }))
      });
    } catch (err) {
      logger.error(`Error fetching event results: ${err instanceof Error ? err.message : 'Something went wrong!'}`);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong!';
      const errorCode = (err as { code?: number }).code ?? 400;
      const statusCode = typeof errorCode === 'number' ? errorCode : 400;
      res.status(statusCode).send(errorMessage);
    }
  }
}

export default EventController;
