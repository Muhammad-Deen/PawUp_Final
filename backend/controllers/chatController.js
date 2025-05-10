// controllers/chatController.js

// ONLY COMMENT OUT IF PATRICK CHATBOT DOES NOT WORK ////

// import { OpenAI } from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const handleChat = async (req, res) => {
//   const userMessage = req.body.message;

//   if (!userMessage) {
//     return res.status(400).json({ reply: "No message provided" });
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         { role: "system", content: "You are Paws, a helpful pet insurance assistant." },
//         { role: "user", content: userMessage }
//       ],
//     });

//     const reply = completion.choices[0].message.content.trim();
//     res.json({ reply });
//   } catch (error) {
//     console.error("OpenAI error:", error);
//     res.status(500).json({ reply: "Error processing message" });
//   }
// };
