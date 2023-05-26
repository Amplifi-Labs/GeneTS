import { Chromosome, Interval } from "./Chromosome";
import { Individual, createIndividual, normalizedIndividual, processIndividualResult } from "./Individual";
import { correlation } from "./VariablesCorrelation";

type Population = Individual[];


const createInitialPopulation = ({
  size,
  numberOfChromosomes,
  numberOfGenes,
}: {
  size: number;
  numberOfChromosomes: number;
  numberOfGenes: number;
}) => {
  const population: Population = [];

  for (let i = 0; i < size; i += 1) {
    population.push(createIndividual({numberOfChromosomes, numberOfGenes}));
  }

  return population;
}

const normalizePopulation = ({
  population,
  interval,
}: {
  population:  Population;
  interval: Interval;
}) => {
  const array: number[][] = [];
  for (let i = 0; i < population.length; i += 1) {
    array.push(normalizedIndividual({individual: population[i], interval }));
  }

  return array;
}

const applyCrossover = ({
  chromosome,
  chances,
}: {
  chromosome: Chromosome;
  chances: number;
}) => {
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
}

const applyMutation = ({
  chromosome,
  chances,
}: {
  chromosome: Chromosome;
  chances: number;
}) => {
  // First of all, roll the dices to determine if mutation will happen
  if (Math.random() > chances) {
    return chromosome;
  }

  // console.log('Applying mutation!');

  // Now it is time to roll the dices again to determine where the mutation should occur
  const position = Math.round(chromosome.length * Math.random());
  chromosome[position] = chromosome[position] === 1 ? 0 : 1;

  return chromosome;
}

const processNewGeneration = ({
  population,
  crossoverChances,
  mutationChanges,
}: {
  population: Population;
  crossoverChances: number;
  mutationChanges: number;
}) => {
  const array: Population = [];
  for (let i = 0; i < population.length; i += 2) {
    // Each pair (odd + even) produces 4 children
    for (let j = 0; j < 4; j += 1) {
      const newIndividual: Individual = [];

      // Process each chromosome
      for (let k = 0; k < population[i].length; k += 1) {
        let chromosome: Chromosome = [];
        for (let l = 0; l < population[i][k].length; l += 1) {
          // Roll the dices to determine if genes are coming from father or mother
          const newGene = Math.random() > 0.5
            ? population[i][k][l] 
            : population[i+1][k][l];

          chromosome.push(newGene);
        }

        // Apply crossover
        chromosome = applyCrossover({chromosome, chances: crossoverChances});

        // Apply mutation
        chromosome = applyMutation({chromosome, chances: mutationChanges});

        newIndividual.push(chromosome);
      }
      
      array.push(newIndividual);
    } 
  }

  return array;
}

const buildMathParameters = ({
  individual,
}: {
  individual: number[];
}) => {
  const parameters: {[key: string]: number} = {};
  for (let j = 0; j < individual.length; j += 1) {
    parameters[correlation[j]] = individual[j];
  }
  return parameters;
}

const testPopulation = ({
  population,
  formula,
  interval,
  operation = 'maximize',
}: {
  population: Population;
  formula: string;
  interval: Interval;
  operation?: 'maximize' | 'minimize'
}) => {
  const normalizedPopulation = normalizePopulation({population, interval});
  
  const populationExtended: {individual: Individual, result: number}[] = [];
  for (let i = 0; i < population.length; i += 1) {
    // Build object to evaluate the equation
    const parameters = buildMathParameters({individual: normalizedPopulation[i]});

    const result = processIndividualResult({formula, parameters});
    populationExtended.push({individual: population[i], result});
  }

  populationExtended.sort((a, b) => {
    if (operation === 'minimize') {
      return a.result - b.result;
    } else {
      return b.result - a.result;
    }
  });

  const survivors = populationExtended.slice(0, population.length / 2 * -1);
  return survivors.map((individual) => (individual.individual));
}

const calculateConvergence = ({a, b}: {a: number; b: number;}) => {
  return Math.abs(a - b);
};

const calculatePopulationAverageResult = ({
  population,
  interval,
  formula,
}: {
  population: Population;
  interval: Interval;
  formula: string;
}) => {
  let resultSum = 0;
  const normalizedPopulation = normalizePopulation({population, interval});
  for (let i = 0; i < population.length; i += 1) {
    // Build object to evaluate the equation
    const parameters = buildMathParameters({individual: normalizedPopulation[i]});

    resultSum += processIndividualResult({formula, parameters});
  }

  return resultSum/normalizedPopulation.length;
}

export {
  Population,
  createInitialPopulation,
  normalizePopulation,
  processNewGeneration,
  testPopulation,
  buildMathParameters,
  applyCrossover,
  applyMutation,
  calculateConvergence,
  calculatePopulationAverageResult,
}
