import { Request, Response } from 'express';
import VoteService from '../services/VoteService';
import logger from '../middleware/logger';

class VoteController {

  /**
   * Adding votes to the event.
   * @param req - The request object.
   * @param res - The response object.
   * @returns updatedEvent - Adding votes - using id, name and votes.
   */ 

  static async addVote(req: Request, res: Response) {
    try {
      const { id } = req.params; // <-- Event UUID
      const { name, votes } = req.body; // <-- Name of the person and dates voted

      // Check if required parameters are provided
      if (!name || !votes || !Array.isArray(votes)) {
        return res.status(400).json({ msg: 'Name and votes are required' });
      }

      const updatedEvent = await VoteService.addVotes(id, name, votes);

      res.json(updatedEvent);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error: ${err.message}`);
      }
      res.status(500).send('Server Error');
    }
  }

  /**
   * Querying results using UUID as id
   * @param req - The request object.
   * @param res - The response object.
   * @returns Fetched results from the DB.
   */ 

  static async getResults(req: Request, res: Response) {
    try {
      const { id } = req.params; // Event UUID
      const results = await VoteService.getResults(id);
      res.json(results);
    } catch (err) {
      logger.error(`Error fetching results: ${err instanceof Error ? err.message : 'Unknown error'}`);
      res.status(500).send('Server Error');
    }
  }
}

export default VoteController;
