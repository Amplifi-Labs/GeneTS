type Chromosome = (0|1)[];

type Interval = [number, number];

const generateChromosome = ({
  numberOfGenes,
  showLogs = false
}: {
  numberOfGenes: number,
  showLogs?: boolean,
}) => {
  const init = new Date();

  const chromosome: Chromosome = [];

  for (let i = 0; i < numberOfGenes; i += 1) {
    chromosome.push(Math.random() > 0.5 ? 1 : 0);
  }

  if (showLogs) {
    console.log('[generateChromosome] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return chromosome;
}

const chromosomeToInt = ({
  chromosome,
  showLogs = false,
}: {
  chromosome: Chromosome,
  showLogs?: boolean,
}) => {
  const init = new Date();

  const binaryString = chromosome.join("");
  const int = parseInt(binaryString, 2);

  if (showLogs) {
    console.log('[chromosomeToInt] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return int;
}

const chromosomeToFloat = ({
  chromosome,
  showLogs = false
}: {
  chromosome: Chromosome,
  showLogs?: boolean,
}) => {
  const int = chromosomeToInt({chromosome, showLogs});

  const init = new Date();

  let maxStr = "";
  chromosome.forEach(() => {
    maxStr += '1';
  });

  const float = int / parseInt(maxStr, 2);

  if (showLogs) {
    console.log('[chromosomeToFloat] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return float
};

const chromosomeToNormalizedFloat = ({
  chromosome,
  interval,
  showLogs = false
}: {
  chromosome: Chromosome,
  interval: Interval,
  showLogs?: boolean,
}) => {
  const init = new Date();

  const float = chromosomeToFloat({chromosome, showLogs})

  const intervalRange = interval[1] - interval[0];
  const normalizedFloat = intervalRange * float + interval[0];

  if (showLogs) {
    console.log('[chromosomeToNormalizedFloat] time to process:', new Date().getTime() - init.getTime(), 'ms');
  }

  return normalizedFloat
}

export {
  Interval,
  Chromosome,
  generateChromosome,
  chromosomeToInt,
  chromosomeToFloat,
  chromosomeToNormalizedFloat
};
