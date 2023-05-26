"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processIndividualResult = exports.normalizedIndividual = exports.createIndividual = void 0;
const fparser_1 = __importDefault(require("fparser"));
const Chromosome_1 = require("./Chromosome");
const createIndividual = ({ numberOfChromosomes, numberOfGenes, showLogs = false }) => {
    const init = new Date();
    const individual = [];
    for (let i = 0; i < numberOfChromosomes; i += 1) {
        individual.push((0, Chromosome_1.generateChromosome)({ numberOfGenes }));
    }
    if (showLogs) {
        console.log('[createIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return individual;
};
exports.createIndividual = createIndividual;
const normalizedIndividual = ({ individual, interval, showLogs = false }) => {
    const init = new Date();
    const array = [];
    for (let i = 0; i < individual.length; i += 1) {
        array.push((0, Chromosome_1.chromosomeToNormalizedFloat)({ chromosome: individual[i], interval }));
    }
    if (showLogs) {
        console.log('[normalizedIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return array;
};
exports.normalizedIndividual = normalizedIndividual;
const processIndividualResult = ({ formula, parameters, showLogs = false }) => {
    const init = new Date();
    const formulaObject = new fparser_1.default(formula);
    const result = formulaObject.evaluate(parameters);
    if (showLogs) {
        console.log('[normalizedIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return result;
};
exports.processIndividualResult = processIndividualResult;
