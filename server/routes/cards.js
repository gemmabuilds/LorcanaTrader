import express from "express";
import db from "../db/connect.js";
import { ObjectId } from "mongodb";
import { loadTcgItem } from '../utils/playwright.js';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('GET all cards route');
    const collection = await db.collection('cards');
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get('/:id', async (req, res) => {
    console.log('GET single card route');

    const collection = await db.collection('cards');
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (result) {
        const pwResponse = await loadTcgItem(result.tcgplayer_id);
        console.log(pwResponse);

        res.send(result).status(200);
    } else {
        res.send('Not Found!').status(404);
    }
});

export default router;