import { Request, Response } from 'express';
import VoteService from '../services/VoteService'; // Use VoteService for getResults
import logger from '../middleware/logger';

class ResultsController {
  /**
   * Get results using id.
   * @param req - The request object.
   * @param res - The response object.
   */
  static async getResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const results = await VoteService.getResults(id);
      res.json(results);
    } catch (err) {
      logger.error(`Error fetching results: ${err instanceof Error ? err.message : 'Unknown error'}`);
      res.status(500).send('Server Error');
    }
  }
}

export default ResultsController;
