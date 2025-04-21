const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLargeCSV(inputPath, outputPath, filters = []) {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath, { flags: 'w', encoding: 'utf-8' });

    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    let header;

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


        // Aplique os filtros (todos devem retornar true)
        const isValid = filters.every(fn => fn(row));


        if (isValid) {
            // Salvar somente as colunas desejadas
            const newRow = transformRow(row);
            const filteredRow = columnsKeep.map(col => newRow[col]).join(';');
            writeStream.write(filteredRow + '\n');
        }
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
    "dt_vacina",
    "ds_vacina_fabricante",
    "ds_estrategia_vacinacao",
    "ds_vacina",
    "ds_natureza_estabelecimento",
    "nu_idade_paciente",
    "faixa_etaria",
    "mes_vacina"
]

const transformRow = (row) => {
    if (row.nu_idade_paciente >= 0 && row.nu_idade_paciente <= 5) {
        row.faixa_etaria = '0 a 5 anos';
    } else if (row.nu_idade_paciente >= 6 && row.nu_idade_paciente <= 17) {
        row.faixa_etaria = '6 a 17 anos';
    }
    else if (row.nu_idade_paciente >= 18 && row.nu_idade_paciente <= 59) {
        row.faixa_etaria = '18 a 59 anos';
    } else if (row.nu_idade_paciente >= 60) {
        row.faixa_etaria = '60+ anos';
    }

    switch (row.dt_vacina.split('-')[1]) {
        case '01':
            row.mes_vacina = 'Janeiro';
            break;
        case '02':
            row.mes_vacina = 'Fevereiro';
            break;
        case '03':
            row.mes_vacina = 'Março';
            break;
        case '04':
            row.mes_vacina = 'Abril';
            break;
        case '05':
            row.mes_vacina = 'Maio';
            break;
        case '06':
            row.mes_vacina = 'Junho';
            break;
        case '07':
            row.mes_vacina = 'Julho';
            break;
        case '08':
            row.mes_vacina = 'Agosto';
            break;
        case '09':
            row.mes_vacina = 'Setembro';
            break;
        case '10':
            row.mes_vacina = 'Outubro';
            break;
        case '11':
            row.mes_vacina = 'Novembro';
            break;
        case '12':
            row.mes_vacina = 'Dezembro';
            break;
    }

    if (row.ds_estrategia_vacinacao.indexOf("Privado") > 0) {
        row.ds_estrategia_vacinacao = 'Serviço Privado';
    }

    if (row.ds_natureza_estabelecimento === "ADMINISTRACAO PUBLICA") {
        row.ds_natureza_estabelecimento = 'Público';
    } else if (row.ds_natureza_estabelecimento === "ENTIDADES EMPRESARIAIS") {
        row.ds_natureza_estabelecimento = 'Privado';
    }

    row.ds_vacina_fabricante = capitalizeAllWords(row.ds_vacina_fabricante);
    row.no_fantasia_estalecimento = capitalizeAllWords(row.no_fantasia_estalecimento);
    row.tp_sexo_paciente = row.tp_sexo_paciente === 'M' ? 'Masculino' : 'Feminino';
    return row;
}

function capitalizeAllWords(text) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (!word) return '';
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  

processLargeCSV(
    path.join(__dirname, 'input/vacinacao_dez_2024.csv'),
    path.join(__dirname, 'output/vacinacao_dez_2024_goiania.csv'),
    filters
);

