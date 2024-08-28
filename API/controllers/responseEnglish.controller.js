
import ResponseEnglish from "../models/responseEnglish.js";  

export const getAllEnglishResponses = async (req, res) => {
    try {
        // Fetch all messages from the database
        const Englishresponses = await ResponseEnglish.find();

        // Return the list of messages
        res.status(200).json(Englishresponses);
    } catch (error) {
        // Log the error and return a 500 status
        console.error('Error fetching messages:', error.message || error);
        res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
};
   // Controller function for handling the POST request
export const createResponseEnglish = async (req, res) => {
    const { key, value } = req.body;

    // Basic validation
    if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required.' });
    }

    try {
        // Create and save the message object to the database
        const response = new ResponseEnglish({ key, value });
        await response.save();

        // Return the saved object
        res.status(201).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'An error occurred while saving the message.' });
    }
};