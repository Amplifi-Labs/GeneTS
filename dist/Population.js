"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePopulationAverageResult = exports.calculateConvergence = exports.applyMutation = exports.applyCrossover = exports.buildMathParameters = exports.testPopulation = exports.processNewGeneration = exports.normalizePopulation = exports.createInitialPopulation = void 0;
const Individual_1 = require("./Individual");
const VariablesCorrelation_1 = require("./VariablesCorrelation");
const createInitialPopulation = ({ size, numberOfChromosomes, numberOfGenes, }) => {
    const population = [];
    for (let i = 0; i < size; i += 1) {
        population.push((0, Individual_1.createIndividual)({ numberOfChromosomes, numberOfGenes }));
    }
    return population;
};
exports.createInitialPopulation = createInitialPopulation;
const normalizePopulation = ({ population, interval, }) => {
    const array = [];
    for (let i = 0; i < population.length; i += 1) {
        array.push((0, Individual_1.normalizedIndividual)({ individual: population[i], interval }));
    }
    return array;
};
exports.normalizePopulation = normalizePopulation;
const applyCrossover = ({ chromosome, chances, }) => {
    // First of all, roll the dices to determine if crossover will happen
    if (Math.random() > chances) {
        return chromosome;
    }
    // console.log('Applying crossover!');
    // Now it is time to roll the dices again to determine where the crossover should occur
    const position1 = Math.round(chromosome.length * Math.random());
    const position2 = Math.round(chromosome.length * Math.random());
    const position1Gene = chromosome[position1];
    const position2Gene = chromosome[position2];
    chromosome[position1] = position2Gene;
    chromosome[position2] = position1Gene;
    return chromosome;
};
exports.applyCrossover = applyCrossover;
const applyMutation = ({ chromosome, chances, }) => {
    // First of all, roll the dices to determine if mutation will happen
    if (Math.random() > chances) {
        return chromosome;
    }
    // console.log('Applying mutation!');
    // Now it is time to roll the dices again to determine where the mutation should occur
    const position = Math.round(chromosome.length * Math.random());
    chromosome[position] = chromosome[position] === 1 ? 0 : 1;
    return chromosome;
};
exports.applyMutation = applyMutation;
const processNewGeneration = ({ population, crossoverChances, mutationChanges, }) => {
    const array = [];
    for (let i = 0; i < population.length; i += 2) {
        // Each pair (odd + even) produces 4 children
        for (let j = 0; j < 4; j += 1) {
            const newIndividual = [];
            // Process each chromosome
            for (let k = 0; k < population[i].length; k += 1) {
                let chromosome = [];
                for (let l = 0; l < population[i][k].length; l += 1) {
                    // Roll the dices to determine if genes are coming from father or mother
                    const newGene = Math.random() > 0.5
                        ? population[i][k][l]
                        : population[i + 1][k][l];
                    chromosome.push(newGene);
                }
                // Apply crossover
                chromosome = applyCrossover({ chromosome, chances: crossoverChances });
                // Apply mutation
                chromosome = applyMutation({ chromosome, chances: mutationChanges });
                newIndividual.push(chromosome);
            }
            array.push(newIndividual);
        }
    }
    return array;
};
exports.processNewGeneration = processNewGeneration;
const buildMathParameters = ({ individual, }) => {
    const parameters = {};
    for (let j = 0; j < individual.length; j += 1) {
        parameters[VariablesCorrelation_1.correlation[j]] = individual[j];
    }
    return parameters;
};
exports.buildMathParameters = buildMathParameters;
const testPopulation = ({ population, formula, interval, operation = 'maximize', }) => {
    const normalizedPopulation = normalizePopulation({ population, interval });
    const populationExtended = [];
    for (let i = 0; i < population.length; i += 1) {
        // Build object to evaluate the equation
        const parameters = buildMathParameters({ individual: normalizedPopulation[i] });
        const result = (0, Individual_1.processIndividualResult)({ formula, parameters });
        populationExtended.push({ individual: population[i], result });
    }
    populationExtended.sort((a, b) => {
        if (operation === 'minimize') {
            return a.result - b.result;
        }
        else {
            return b.result - a.result;
        }
    });
    const survivors = populationExtended.slice(0, population.length / 2 * -1);
    return survivors.map((individual) => (individual.individual));
};
exports.testPopulation = testPopulation;
const calculateConvergence = ({ a, b }) => {
    return Math.abs(a - b);
};
exports.calculateConvergence = calculateConvergence;
const calculatePopulationAverageResult = ({ population, interval, formula, }) => {
    let resultSum = 0;
    const normalizedPopulation = normalizePopulation({ population, interval });
    for (let i = 0; i < population.length; i += 1) {
        // Build object to evaluate the equation
        const parameters = buildMathParameters({ individual: normalizedPopulation[i] });
        resultSum += (0, Individual_1.processIndividualResult)({ formula, parameters });
    }
    return resultSum / normalizedPopulation.length;
};
exports.calculatePopulationAverageResult = calculatePopulationAverageResult;
