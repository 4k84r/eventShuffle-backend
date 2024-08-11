import Event, { IEvent } from '../models/EventModel';

class EventService {

  /**
   * 
   * @returns Fetching events from the DB and returning it.
   */
  static async listEvents() {
    return await Event.find({}, { uniqueId: 1, name: 1 });
  }

  /**
   * 
   * @param name - The name from query param.
   * @param dates - The dates from query param.
   * @returns - The new event.
   */

  static async createEvent(name: string, dates: string[]) {
    const newEvent = new Event({ name, dates });
    return await newEvent.save();
  }

  /**
   * 
   * @param uniqueId - The UUID as uniqueId
   * @returns - The fetched result.
   */

  static async getEvent(uniqueId: string) {
    return await Event.findOne({ uniqueId });
  }

  /**
   * 
   * @param uniqueId - The UUID as uniqueId.
   * @param name - The name from the request.
   * @param votes - The votes to add from the request.
   * @returns 
   */

  static async addVotes(uniqueId: string, name: string, votes: string[]) {
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    votes.forEach(date => {
      const vote = event.votes.find(vote => vote.date === date);
      if (vote) {
        vote.people.push(name);
      } else {
        event.votes.push({ date, people: [name] });
      }
    });

    return await event.save();
  }

  /**
   * 
   * @param uniqueId - The UUID as uniqueId.
   * @returns Object having uniqueId, name and dates.
   */
  static async getEventResults(uniqueId: string) {
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    const suitableDates = event.votes.filter(vote =>
      vote.people.length === event.votes.flatMap(v => v.people).length
    );

    return {
      uniqueId: event.uniqueId,
      name: event.name,
      suitableDates,
    };
  }
}

export default EventService;
