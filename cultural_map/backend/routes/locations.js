const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

router.get('/suppliers', async (req, res) => {
  try {
    logger.log('GET /suppliers request received');
    const [rows] = await db.execute('SELECT * FROM suppliers');

    // Write fetched suppliers to a local JSON file
    const outputPath = path.join(__dirname, '../geo/suppliers.json');
    fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2));
    logger.log(`Wrote ${rows.length} suppliers to suppliers.json`);

    res.json(rows);
  } catch (err) {
    logger.error('Error fetching suppliers:', err);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
});

module.exports = router;
