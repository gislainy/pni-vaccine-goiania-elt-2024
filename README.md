# PNI Vaccine Goiânia ELT 2024

This repository contains scripts and documentation for the extraction, transformation, and loading (ELT) of vaccination data from the Brazilian National Immunization Program (PNI) in the municipality of Goiânia during the year 2024. The goal of this project is to process public health data and build dashboards to uncover insights into population-level immunization patterns.

## 📌 Project Overview

- **Data Source**: [OpenDataSUS – PNI 2024](https://opendatasus.saude.gov.br/dataset/doses-aplicadas-pelo-programa-de-nacional-de-imunizacoes-pni-2024)
- **Municipality Analyzed**: Goiânia (GO), Brazil
- **Period**: January to December 2024
- **Dashboard Platform**: Google Looker Studio

> The initial dataset consisted of 60+ GB in CSV format (monthly files). After processing and normalization, the final dataset was reduced to ~90 MB and used for dashboard visualization and exploratory analysis.

---

## 📊 Key Features

- ✅ Monthly download and merge of CSV files
- ✅ Filtering for data only related to Goiânia
- ✅ Column selection, formatting, and normalization
- ✅ Data cleaning for performance
- ✅ Dashboard-ready CSV export for visualization

---

### ⚙️ Data Processing Pipeline (ETL Scripts)

This project includes a set of three JavaScript scripts designed to execute the ETL (Extract, Transform, Load) process over the raw vaccination data files obtained from OpenDataSUS. The primary goal is to filter, normalize, and optimize the dataset for analytical use in dashboards.

#### `01_step.js` – Filtering and Transformation (Per-Month)

This script performs the initial transformation step by reading each monthly CSV file line by line to minimize memory usage. It:

- Filters the dataset to include only records from the municipality of **Goiânia (code: 520870)**.
- Selects a predefined set of relevant columns (e.g., patient sex, vaccine code, establishment type).
- Formats and normalizes fields such as dates and creates derived variables like `faixa_etaria` (age group).
- Outputs a cleaned and structured CSV file for each month.

#### `02_step.js` – File Consolidation

This script merges all the monthly files generated in `01_step.js` into a single dataset. Key features include:

- Iterates through each monthly output file.
- Appends the contents to a single CSV file, ensuring that only the first file contributes the header row.
- Produces a unified dataset (`vacinacao_2024.csv`) containing all vaccination records for the year 2024 in Goiânia.

#### `03_step.js` – Final Optimization and Export

This final script applies post-processing and optimizations to prepare the dataset for dashboard consumption:

- Re-applies a filter to ensure only Goiânia records are present.
- Converts the UUID-based patient identifier (`co_documento`) into a numeric ID for size reduction and privacy.
- Creates helper variables such as `mes_vacina_num` (numerical month) to facilitate chronological sorting in dashboards.
- Outputs the final reduced dataset as `vacinacao_2024_goiania.csv`, ready to be uploaded to Google Sheets or a BI tool.

> Together, these three steps reduce the original dataset (~60 GB across 12 files) to a lightweight and analysis-ready file of under 90 MB, suitable for visualization in tools like Google Looker Studio.


### Load
- Combine all monthly files into a single CSV
- Optimize file size for use in Google Sheets
- Upload to Google Drive and integrate into Looker Studio

---

## 📈 Dashboard

Access the dashboard:  
📍 [Google Looker Studio Dashboard (PNI – Goiânia 2024)](https://lookerstudio.google.com/u/0/reporting/e8c1c489-ec8f-4a9b-8ae1-f6c3f6129d47)

---

## 🧪 Visualizations

The following charts were created:

1. **Total vaccinations administered**
2. **Monthly vaccination distribution**
3. **Vaccination by sex over time**
4. **Sex distribution (pie chart)**
5. **Age group distribution**
6. **Top 10 vaccines administered**

---

## 📂 Data & Resources

- 📄 [Final Dataset (Google Sheets)](https://docs.google.com/spreadsheets/d/14nvZl0WRN7uJWNuI3wkSkBqVMm01IcFbCOXBzNXWPiw/edit)
- 🗂️ [All source files (Google Drive)](https://drive.google.com/drive/folders/13vWPUb-4FkA78MbwNB67TfA-TweFB1Xk?usp=sharing)
- 📖 [Data Dictionary (PDF)](https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/dbbni/Dicionario_tb_ria_rotina.pdf)

---

## 🛠️ Technologies Used

- JavaScript (Node.js) for data processing
- Google Sheets for final dataset hosting
- Google Looker Studio for dashboard creation

---

## 🤝 Contributing

This project is academic in nature and open for suggestions or improvements. Feel free to fork the repository and submit a pull request.
