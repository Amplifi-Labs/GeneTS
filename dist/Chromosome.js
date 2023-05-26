"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chromosomeToNormalizedFloat = exports.chromosomeToFloat = exports.chromosomeToInt = exports.generateChromosome = void 0;
const generateChromosome = ({ numberOfGenes, showLogs = false }) => {
    const init = new Date();
    const chromosome = [];
    for (let i = 0; i < numberOfGenes; i += 1) {
        chromosome.push(Math.random() > 0.5 ? 1 : 0);
    }
    if (showLogs) {
        console.log('[generateChromosome] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return chromosome;
};
exports.generateChromosome = generateChromosome;
const chromosomeToInt = ({ chromosome, showLogs = false, }) => {
    const init = new Date();
    const binaryString = chromosome.join("");
    const int = parseInt(binaryString, 2);
    if (showLogs) {
        console.log('[chromosomeToInt] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return int;
};
exports.chromosomeToInt = chromosomeToInt;
const chromosomeToFloat = ({ chromosome, showLogs = false }) => {
    const int = chromosomeToInt({ chromosome, showLogs });
    const init = new Date();
    let maxStr = "";
    chromosome.forEach(() => {
        maxStr += '1';
    });
    const float = int / parseInt(maxStr, 2);
    if (showLogs) {
        console.log('[chromosomeToFloat] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return float;
};
exports.chromosomeToFloat = chromosomeToFloat;
const chromosomeToNormalizedFloat = ({ chromosome, interval, showLogs = false }) => {
    const init = new Date();
    const float = chromosomeToFloat({ chromosome, showLogs });
    const intervalRange = interval[1] - interval[0];
    const normalizedFloat = intervalRange * float + interval[0];
    if (showLogs) {
        console.log('[chromosomeToNormalizedFloat] time to process:', new Date().getTime() - init.getTime(), 'ms');
    }
    return normalizedFloat;
};
exports.chromosomeToNormalizedFloat = chromosomeToNormalizedFloat;
