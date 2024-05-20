from Bio import Entrez
import json

def carregar_catalogo():
    with open('fungos.json', 'r') as f:
        catalogo = json.load(f)
    return catalogo

def salvar_catalogo(catalogo):
    with open('fungos.json', 'w') as f:
        json.dump(catalogo, f, indent=4, ensure_ascii=False)
        
def adicionar_produto(categoria, value):
    catalogo = carregar_catalogo()
    categoria = categoria
    value = value

    if value not in catalogo[categoria]:
        catalogo[categoria].append(value)

    salvar_catalogo(catalogo)

# Função para buscar os nomes das espécies de fungos no GenBank
def get_fungi_species_names():
    Entrez.email = 'seu_email@example.com'  # Substitua pelo seu e-mail
    handle = Entrez.esearch(db='assembly', term='Agaricus[ORGN]', retmax=10, idtype="acc")  # Limitando a 10 resultados
    record = Entrez.read(handle)
    print("----------------------------------------")
    print(record)
    print("----------------------------------------")

    handle.close()

    for tax_id in record['IdList']:
        handle = Entrez.esummary(db="assembly", id=tax_id)

        record = Entrez.read(handle)
        print("----------------------------------------")
        print(record)
        print("----------------------------------------")

        dict = record

        handle.close()

        print(dict['DocumentSummarySet']['DocumentSummary'][0]['SpeciesName'])
        print(dict['DocumentSummarySet']['DocumentSummary'][0]['AssemblyName'])
        print(dict['DocumentSummarySet']['DocumentSummary'][0]['AssemblyAccession'])

        adicionar_produto('SpeciesName', dict['DocumentSummarySet']['DocumentSummary'][0]['SpeciesName'])
        adicionar_produto('AssemblyName', dict['DocumentSummarySet']['DocumentSummary'][0]['AssemblyName'])
        adicionar_produto('AssemblyAccession', dict['DocumentSummarySet']['DocumentSummary'][0]['AssemblyAccession'])

get_fungi_species_names()