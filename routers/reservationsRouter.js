const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    connection.query("SELECT * FROM reservations", (err, results) => {
        if (err) {
            return res.send(err);
        }

        return res.json({
            data: results,
        });
    });
});

router.post("/", (req, res) => {
    const {
        reservationName,
        reservationDate,
        reservationRoom,
    } = req.body;

    if (!reservationName || !reservationDate || !reservationRoom) {
        // send bad request error
        return res.status(400).send("Bad request. Missing parametres.");
    }

    const queryString = `INSERT INTO reservations (reservationName, reservationDate, reservationRoom)   
                         VALUES (${mysql.escape(reservationName)}, ${mysql.escape(reservationDate)}, ${mysql.escape(reservationRoom)})`;

    connection.query(queryString, (err, results) => {
        if (err) {
            return res.send(err);
        }

        return res.json({
            data: results,
        });
    });
});

module.exports = router;


// Add get by id route
router.get("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        // send bad request error
        return res.status(400).send("Bad request. Missing parametres.");
    }
    const queryString = `SELECT * FROM reservations WHERE reservationID = ${mysql.escape(id)}`;
    connection.query(queryString, (err, results) => {
        if (err) {
            return res.send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Message not found.");
        }
        return res.json({
            messages: results,
        });
    }
    );
}
);

// Add delete by id route
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        // send bad request error
        return res.status(400).send("Bad request. Missing parametres.");
    }
    const queryString = `DELETE FROM reservations WHERE reservationID = ${mysql.escape(id)}`;
    connection.query(queryString, (err, results) => {
        if (err) {
            return res.send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Message not found.");
        }
        return res.json({
            results,
        });
    }
    );
}
);

// // Add update by id route
// router.put("/:id", (req, res) => {
//     const { id } = req.params;
//     if (!id) {
//         // send bad request error
//         return res.status(400).send("Bad request. Missing parametres.");
//     }
//     const { senderName, senderMail, receiverMail, messageContent } = req.body;
//     if (!senderName || !senderMail || !receiverMail || !messageContent) {
//         // send bad request error
//         return res.status(400).send("Bad request. Missing parametres.");
//     }
//     const queryString = `UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`;
//     connection.query(queryString, (err, results) => {
//         if (err) {
//             return res.send(err);
//         }
//         if (results.length === 0) {
//             return res.status(404).send("Message not found.");
//         }
//         return res.json({
//             results,
//         });
//     }
//     );
// }
// );

module.exports = router;