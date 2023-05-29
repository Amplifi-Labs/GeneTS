# GeneTS
Typescript Swiss Army Knife for Genetic Algorithms

While searching for up to date libraries that fully supports TypeScript/types and based on a modern approach, nothing was found. This library goal is to fill this gap.

For now this is a very basic implementation and improvements will be implemented. Feal free to help us to make it better!

# Glossary

## Genetic Algorithms

It's a [Numerical Analysis](https://en.wikipedia.org/wiki/Numerical_analysis) for solving optimization problems. It is based on the natural concept of evolution. The same concepts of natural selection are applied to improve a population of individuals based on predefined criteria, i.e. a mathematical equation. Is it commonly applied to find maximums or minimums that fits better on predefined conditions. It makes totally sense to use Genetic Algorithms when the number of variables is high, making it hard (or even impossible) to solve the maximum (or minimum) of an equation by analytical methods.

## Gene

Is the basic numerical representation of o bit. The number of bits represents the precision of the final solution. In other words, the more genes you have, the better the precision. But also, the more genes you have, more CPU power is consumed to run the optimization problem.

## Chromosome

Chromosomes are formed by the genes. The chromosome is a binary representation of a floating (or integer in some cases) number after normalized under a specific domain/interval. As a general rule, the number of chromosomes in an individual is defined by the number of variables in your problem.

## Individual

Individuals are composed by a set of chromosomes. An individual represents one set of variables that are tested against a predefined condition, i.e. a multi-variable formula.

## Population

Populations are made from a combination of individuals. Each chromosome of an individual is transformed into a floating point number. Those numbers are then applied into the equations. The individuals that better fits the mathematical equation will survive to reproduce and create the next generation. This next generation will reproduce again and this loop of optimization will run until a predefined condition is established. The individual that fits the best this new generation will most likely be the closest to the ideal numerical result.

## Interval

The interval determines the domain of the analysis. In other words, if you specify the domain as [-10, 10], the chromosomes (binary array) will be converted to a number in this domain. For example, if we take in consideration a chromosome with 2 bits, this chromosome can represent 4 different states: '00', '01', '10', 'and '11'. Converting it to a floating point number, '00' will mean -10, '01' will represent -3.3333..., '10' will represent +3.3333, and finally '11' would represent +10. Notice that the precision if this domain [-10, 10] represented by 4 different possible genetic combination has a precision of 6.6666, which is pretty bad. If we consider 2 more genes for the chromosome (4 bits), the precision will be 1.25. And if we have 8 bits/genes of the precision of the solution will be 0.078125. So, a general rule is, the greater the interval/domain, the bigger needs to be the number of genes.

## Crossover

The more iterations you have in your solution, the bigger is the population homogeneity. And this might be bad. Let's say you have a polynomial equation with many humps. It's very possible that the results will get concentrated on a false maximum and produce a result that doesn't corresponds to the true maximum on a given domain. To avoid that Genetic Algorithms apply two different concepts, both also found in nature: crossover and mutation. 

Crossover represents the error of having a gene (or a segment of a chromosome) that should come from the father, coming from the mother instead.

## Mutation

Mutation in the other hand is simply the swap of a gene, i.e. 0 becoming 1 or vice-versa.

# Code sample

How to run this example?

## Clone git repository

~~~
git clone https://github.com/Amplifi-Labs/GeneTS && cd GeneTS
~~~

## Install dependencies

~~~
yarn install
~~~

OR

~~~
npm install
~~~
## Run the example

~~~
yarn run-example
~~~

OR

~~~
npm run run-example
~~~

## Example code

~~~
import {
  Interval,
  normalizedIndividual,
  processIndividualResult,
  buildMathParameters,
  createInitialPopulation,
  processNewGeneration,
  testPopulation,
  shuffle,
  calculatePopulationAverageResult,
  calculateConvergence,
} from "./src/main";

const init = new Date();

let population = createInitialPopulation({
  size: 200,
  numberOfChromosomes: 3,
  numberOfGenes: 16,
});

const mutations = {
  crossoverChances: 0.01,
  mutationChanges: 0.01,
};

const formula = 'a + b^2 - c^4';
const interval: Interval = [-10, 10];

let normalizedChampion: number[] = [];

let convergence = 100;
let previousPopulationAverageResult: number | undefined;

for (
  let i = 0;
  i < 50 && convergence > 0.000000001;
  i += 1
) {
  population = processNewGeneration({population, ...mutations});
  population = testPopulation({population, formula, interval});
  const champion = population[0];

  /* Show results for champion */
  normalizedChampion = normalizedIndividual({individual: champion, interval });
  const championParameters = buildMathParameters({individual: normalizedChampion});
  const result = processIndividualResult({formula, parameters: championParameters});
  const populationAverageResult = calculatePopulationAverageResult({population, formula, interval});
  if (previousPopulationAverageResult) {
    convergence = calculateConvergence({a: populationAverageResult, b: previousPopulationAverageResult})
  }

  console.log('----------------------------------------------------');
  console.log(
    `generation: ${i},\n`+
    `result for champion: ${result},\n`+
    `convergence: ${convergence},\n`+
    `populationAverageResult: ${populationAverageResult}`
  );
  /* ------------------------- */

  population = shuffle(population);

  previousPopulationAverageResult = populationAverageResult;
}

console.log('time to process:', new Date().getTime() - init.getTime(), 'ms');
console.log('normalizedChampion:', normalizedChampion);
~~~

# Amplifi Labs

Amplifi Labs is a software boutique located in the USA, North Carolina. We create applications for a vast number of cases, including mobile and web. We have a highly capable team, that is able to work with highly complex problems, including Natural Language Processing, Machine Learning, Genetic Algorithms and more!
