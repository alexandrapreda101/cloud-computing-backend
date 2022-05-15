const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const { sendMail } = require("../utils/mailFunctions.js");

const buildInsertQueryString = (reservationID, receiverMail, messageContent) => {
    const queryString = `INSERT INTO reminders (reservationID, receiverMail, messageContent) 
        VALUES (${mysql.escape(reservationID)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`;
    return queryString;
};

const getReservationDetails = (reservationID) => {
    const queryString = `SELECT * FROM reservations WHERE reservationID = ${mysql.escape(reservationID)}`;
    return queryString;
}

const router = express.Router();

router.post("/send", async (req, res) => {
    const { senderName, senderMail, receiverMail, messageContent, reservationName } = req.body;
    if (!senderName || !senderMail || !receiverMail || !messageContent || !reservationName) {
        return res.status(400).send("------>Missing Parametres<--------");
    }

    const queryString = buildInsertQueryString(reservationName, receiverMail, messageContent);
    const queryReservations = getReservationDetails(reservationName);

    try {
        connection.query(queryString, (err, results) => {
            if (err) {
                return res.send(err);
            }
        });

        connection.query(queryReservations, (err, results) => {
            if (err) {
                return res.send(err);
            }

            const [{ reservationID, reservationName, reservationDate, reservationRoom }] = results;
            const sendMailResponse = sendMail(receiverMail, senderMail, messageContent, `Hello,${reservationName}! You have a reservation at ${senderName} for the ${reservationRoom} on ${reservationDate} `);

            return res.json({
                data: results
            });
        });
    } catch (err) {
        console.log(err);
        return res.send("Something went wrong");
    }
}
)


module.exports = router;
