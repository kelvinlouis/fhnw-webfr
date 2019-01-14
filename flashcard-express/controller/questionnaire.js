const express = require('express');
const log4js = require('log4js');
const dispatcher = express.Router();
const Questionnaire = require('../domain/questionnaire');

const logger = log4js.getLogger('server');

/**
 * Gets a model
 *
 * @param id
 * @returns {Promise<any>}
 */
const getById = (id) => {
    return new Promise((resolve, reject) => {
        Questionnaire.findById(id, (err, questionnaire) => {
            if (err) {
                logger.error(`Couldn't fetch questionnaire with id ${id}`);
                return reject();
            }

            if (questionnaire != null) {
                return resolve(questionnaire);
            }

            return resolve(null);
        });
    });
};

/**
 * Saves the received model
 *
 * @param questionnaire
 * @returns {Promise<any>}
 */
const save = questionnaire => questionnaire.save();

/**
 * Patches the new values onto the existing model
 *
 * @param newValues
 * @returns {Function}
 */
const update = newValues => existingModel => {
    if (existingModel) {
        existingModel.set(newValues);
        return save(existingModel);
    } else {
        return Promise.reject();
    }
};

// middleware that is specific to this router
dispatcher.use(function timeLog (req, res, next) {
    // Middleware
    logger.info('questionnaires middleware');
    next();
});

dispatcher.get('/questionnaires', (req, res) => {
    Questionnaire
        .find()
        .then((questionnaires) => {
            res.send(questionnaires);
        })
        .catch((error) => {
            logger.error(`Couldn't fetch questionnaires`);
            res.sendStatus(400);
        })
});

dispatcher.get('/questionnaires/:id', (req, res) => {
    const id = req.params.id;

    getById(id)
        .then((questionnaire) => {
            if (questionnaire) {
                res.send(questionnaire);
            } else {
                logger.info(`Couldn't find questionnaire with id ${id}`);
                res.sendStatus(404);
            }
        })
        .catch((error) => {
            logger.error(`Couldn't fetch questionnaire with id ${id}`);
            res.sendStatus(400);
        });
});

dispatcher.post('/questionnaires', (req, res) => {
    let questionnaire = new Questionnaire(req.body);

    save(questionnaire)
        .then((createdQuestionnaire) => {
            logger.info(`Created questionnaire`);
            res.send(createdQuestionnaire);
        })
        .catch((error) => {
            logger.error(`Couldn't create questionnaire`);
            res.sendStatus(400);
        });
});

dispatcher.put('/questionnaires/:id', (req, res) => {
    const id = req.params.id;
    const changedQuestionnaire = req.body;
    const updateModel = update(changedQuestionnaire);

    getById(id)
        .then(updateModel)
        .then((savedQuestionnaire) => {
            logger.info(`Updated questionnaire with id ${id}`);
            res.send(savedQuestionnaire);
        })
        .catch((error) => {
            logger.info(`Update: Couldn't find questionnaire with id ${id}`);
            res.sendStatus(404);
        });
});

dispatcher.delete('/questionnaires/:id', (req, res) => {
    const id = req.params.id;

    Questionnaire.deleteOne({ _id: id }, (err, questionnaire) => {
        if (err) {
            logger.error(`Couldn't delete questionnaire with id ${id}:`);
            res.sendStatus(400);
            return;
        }

        if (questionnaire) {
            logger.info(`Deleted questionnaire with id ${id}`);
            res.send(200);
            return;
        }

        logger.info(`Couldn't find questionnaire with id ${id}`);
        res.send(404);
    });
});

module.exports = dispatcher;