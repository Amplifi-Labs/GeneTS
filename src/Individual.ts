import Formula from 'fparser';
import { Chromosome, Interval, chromosomeToNormalizedFloat, generateChromosome } from "./Chromosome";

type Individual = Chromosome[];

const createIndividual = ({
  numberOfChromosomes,
  numberOfGenes,
}: {
  numberOfChromosomes: number;
  numberOfGenes: number;
}) => {
  const individual: Individual = [];

  for (let i = 0; i < numberOfChromosomes; i += 1) {
    individual.push(generateChromosome({numberOfGenes}));
  }

  return individual;
};

const normalizedIndividual = ({
  individual,
  interval,
}: {
  individual: Individual;
  interval: Interval;
}) => {
  const array: number[] = [];
  for (let i = 0; i < individual.length; i += 1) {
    array.push(chromosomeToNormalizedFloat({chromosome: individual[i], interval}));
  }

  return array;
}

const processIndividualResult = ({
  formula,
  parameters,
}: {
  formula: string;
  parameters: {[key: string]: number};
}) => {
  const formulaObject = new Formula(formula);
  const result = formulaObject.evaluate(parameters);

  return result;
}

export {Individual, createIndividual, normalizedIndividual, processIndividualResult}