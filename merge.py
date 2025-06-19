# merge_apartamentos.py
#
# Descrição: lê todos os arquivos .json dentro de public/assets/apartamentos-src/
# e gera public/assets/apartamentos.json contendo um array com todos os objetos.
#
# Uso: python merge_apartamentos.py

import os
import json

# Caminhos (ajuste se necessário)
SRC_DIR = os.path.join('public', 'assets', 'apartamentos-src')
OUT_FILE = os.path.join('public', 'assets', 'apartamentos.json')

def main():
    objetos = []
    for nome_arquivo in os.listdir(SRC_DIR):
        if not nome_arquivo.lower().endswith('.json'):
            continue
        caminho = os.path.join(SRC_DIR, nome_arquivo)
        try:
            with open(caminho, 'r', encoding='utf-8') as f:
                data = json.load(f)
                objetos.append(data)
        except Exception as e:
            print(f"⚠️ Falha ao ler/parsear {nome_arquivo}: {e}")

    # Opcional: ordenar por campo "id" se existir
    # try:
    #     # objetos.sort(key=lambda x: x.get('id', 0))
    # except Exception:
    #     pass

    # Grava JSON unificado
    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(objetos, f, ensure_ascii=False, indent=2)

    print(f"✅ Gerado {OUT_FILE} com {len(objetos)} itens.")

if __name__ == '__main__':
    main()
