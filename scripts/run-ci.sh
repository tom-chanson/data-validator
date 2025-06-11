#!/bin/bash
mkdir -p ~/data-validator-linux
rsync -av --exclude='node_modules' /mnt/e/validate_data_ts/data-validator/ ~/data-validator-linux/
cd ~/data-validator-linux


RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start CI simulation
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}       Pipeleine local simulé           ${NC}"
echo -e "${YELLOW}========================================${NC}"

echo -e "${GREEN}Étape 1:🔎 vérification de l'environnement${NC}"
# vérifier que node est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}X Node.js n'est pas installé. Veuillez l'installer.${NC}"
    exit 1
else
    echo -e "${GREEN}✔ Node.js est installé.${NC}"
fi

# vérifier que pnpm est installé
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}pnpm n'est pas installé. Installation en cours...${NC}"
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    source ~/.bashrc
    if [ $? -ne 0 ]; then
        echo -e "${RED}X Échec de l'installation de pnpm.${NC}"
        exit 1
    fi
    export PATH="$HOME/.local/share/pnpm:$PATH"
    source ~/.bashrc

    if ! command -v pnpm &> /dev/null; then
        echo -e "${RED}X Échec de l'installation de pnpm.${NC}"
        exit 1
    fi

    
    echo -e "${GREEN}✔ pnpm installé avec succès.${NC}"
else
    echo -e "${GREEN}✔ pnpm est installé.${NC}"
fi

echo -e "${GREEN}Étape 2:📦 installation des dépendances${NC}"
rm -rf node_modules 2>/dev/null
pnpm install
if [ $? -ne 0 ]; then
    echo -e "${RED}X Échec de l'installation des dépendances.${NC}"
    exit 1
else
    echo -e "${GREEN}✔ Dépendances installées avec succès.${NC}"
fi

echo -e "${GREEN}Étape 3:🧪 exécution des tests${NC}"
npx jest --verbose --coverage --testResultsProcessor=jest-junit
if [ $? -ne 0 ]; then
    echo -e "${RED}X Les tests ont échoué.${NC}"
    exit 1
else
    echo -e "${GREEN}✔ Tous les tests ont réussi.${NC}"
fi

