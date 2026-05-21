import Event from "../models/Event.js";


// GET EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("participants", "name email");

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, host, eventHead, date, description } = req.body;

    const event = await Event.create({
      title,
      host,
      eventHead,
      date,
      description
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// JOIN EVENT
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (!event.participants.includes(req.user._id)) {
      event.participants.push(req.user._id);
    }

    await event.save();

    res.json({
      message: "Joined event successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};