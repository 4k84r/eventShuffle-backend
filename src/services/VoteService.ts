import Event, { IEvent } from '../models/EventModel';

class VoteService {
  static async addVotes(uniqueId: string, name: string, votes: string[]) {
    // Find the event by uniqueId
    const event = await Event.findOne({ uniqueId });

    if (!event) {
      throw new Error('Event not found');
    }

    // Process votes
    votes.forEach((date) => {
      const vote = event.votes.find(vote => vote.date === date);
      if (vote) {
        // Add the person to the existing vote date
        if (!vote.people.includes(name)) {
          vote.people.push(name);
        }
      } else {
        // Create a new vote date entry
        event.votes.push({ date, people: [name] });
      }
    });

    await event.save();

    // Return the updated event with the desired response structure
    return {
      id: event._id,
      name: event.name,
      dates: event.dates,
      votes: event.votes.map(vote => ({
        date: vote.date,
        people: vote.people,
      })),
    };
  }

  static async getResults(uniqueId: string) {
    // Find the event by uniqueId
    const event = await Event.findOne({ uniqueId });
    if (!event) throw new Error('Event not found');

    // Calculate suitable dates
    const totalPeople = new Set(event.votes.flatMap(v => v.people)).size;
    const suitableDates = event.votes.filter(vote =>
      vote.people.length === totalPeople
    );

    return {
      id: event._id,
      name: event.name,
      suitableDates: suitableDates.map(vote => ({
        date: vote.date,
        people: vote.people,
      })),
    };
  }

}

export default VoteService;
