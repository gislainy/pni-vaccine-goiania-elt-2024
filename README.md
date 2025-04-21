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

## 🧩 ELT Pipeline Structure

### Extract
- Download raw datasets (Jan–Dec) from OpenDataSUS

### Transform
- Select relevant columns:
```javascript
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
```
- Add derived columns:
  - `faixa_etaria`, `mes_vacina`, `mes_vacina_num`
- Normalize large text fields and format dates

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
