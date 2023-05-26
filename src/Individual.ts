import Formula from 'fparser';
import { Chromosome, Interval, chromosomeToNormalizedFloat, generateChromosome } from "./Chromosome";

type Individual = Chromosome[];

const createIndividual = ({
  numberOfChromosomes,
  numberOfGenes,
  showLogs = false
}: {
  numberOfChromosomes: number;
  numberOfGenes: number;
  showLogs?: boolean;
}) => {
  const init = new Date();

  const individual: Individual = [];

  for (let i = 0; i < numberOfChromosomes; i += 1) {
    individual.push(generateChromosome({numberOfGenes}));
  }

  if (showLogs) {
    console.log('[createIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return individual;
};

const normalizedIndividual = ({
  individual,
  interval,
  showLogs = false
}: {
  individual: Individual;
  interval: Interval;
  showLogs?: boolean;
}) => {
  const init = new Date();

  const array: number[] = [];
  for (let i = 0; i < individual.length; i += 1) {
    array.push(chromosomeToNormalizedFloat({chromosome: individual[i], interval}));
  }

  if (showLogs) {
    console.log('[normalizedIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return array;
}

const processIndividualResult = ({
  formula,
  parameters,
  showLogs = false
}: {
  formula: string;
  parameters: {[key: string]: number};
  showLogs?: boolean;
}) => {
  const init = new Date();

  const formulaObject = new Formula(formula);
  const result = formulaObject.evaluate(parameters);

  if (showLogs) {
    console.log('[normalizedIndividual] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return result;
}

export {
  Individual,
  createIndividual,
  normalizedIndividual,
  processIndividualResult
}