const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLargeCSV(inputPath, outputPath, filters = []) {
    const filteredRows = {
        co_municipio_estabelecimento: new Set(),
    };


    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath, { flags: 'w', encoding: 'utf-8' });

    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    let header;
    let lineIndex = 0;

    for await (const line of rl) {
        // Se for a primeira linha, é o cabeçalho
        if (!header) {
            header = line;
            writeStream.write(columnsKeep.join(";") + '\n');
            continue;
        }

        // Exemplo: converte CSV para objeto (ajuste para o seu delimitador, aqui é vírgula)
        const columns = line.split(';');
        const row = {};

        header.split(';').forEach((col, i) => {
            row[col.trim()] = columns[i]?.trim();
        });

        row.co_documento = lineIndex++;
        row.mes_vacina_num = row.dt_vacina.split('-')[1];
        const filteredRow = columnsKeep.map(col => row[col]).join(';');
        writeStream.write(filteredRow + '\n');

    }

    writeStream.end();
    console.log('Processamento finalizado.');
}


const filters = [
    row => Number(row.co_municipio_estabelecimento) === 520870,
];

const columnsKeep = [
    "co_documento",
    "tp_sexo_paciente",
    "no_fantasia_estalecimento",
    "co_vacina",
    "sg_vacina",
    "ds_vacina_fabricante",
    "ds_estrategia_vacinacao",
    "ds_natureza_estabelecimento",
    "nu_idade_paciente",
    "faixa_etaria",
    "mes_vacina",
    "mes_vacina_num",
]
processLargeCSV(
    path.join(__dirname, 'output/vacinacao_2024.csv'),
    path.join(__dirname, 'output/vacinacao_2024_goiania.csv'),
    filters
);

