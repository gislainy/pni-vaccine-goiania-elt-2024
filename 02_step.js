const fs = require('fs');
const readline = require('readline');
const path = require('path');

/**
 * Merge multiple CSV files into a single file, keeping only one header
 * @param {string[]} files - List of CSV file paths
 * @param {string} output - Path for the merged output file
 */
async function mergeCSV(files, output) {
  const outputStream = fs.createWriteStream(output, { flags: 'w' });
  let headerWritten = false;

  for (const file of files) {
    console.log(`Reading: ${file}`);

    const fileStream = fs.createReadStream(file, { encoding: 'utf8' });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let lineIndex = 0;

    for await (const line of rl) {
      if (lineIndex === 0) {
        if (!headerWritten) {
          outputStream.write(line + '\n');
          headerWritten = true;
        }
      } else {
        outputStream.write(line + '\n');
      }
      lineIndex++;
    }
  }

  outputStream.end();
  console.log(`✅ Merged CSV created at: ${output}`);
}

// Example usage
const folderPath = path.join(__dirname, 'output');
const csvFiles = fs.readdirSync(folderPath)
  .filter(file => file.endsWith('.csv'))
  .map(file => path.join(folderPath, file));

mergeCSV(csvFiles, path.join(__dirname, 'output/vacinacao_2024.csv'));
