function analyze() {
    const code = document.getElementById('code').value;
    const result = parseCode(code);
    document.getElementById('result').textContent = result;
}

function parseCode(code) {
    if (!code) {
        return 'NO HAY CODIGO PARA ANALIZAR';
    } else {
        try {
            const variableDeclarationRegex = /\b(var|let|const)\s+([a-zA-Z_$][\w$]*)\s*(?:=\s*([^;]+);)?/g;
            let match;
            let variables = new Set();

            while ((match = variableDeclarationRegex.exec(code)) !== null) {
                const declarationType = match[1];
                const variableName = match[2];
                const assignmentValue = match[3];

                if (!assignmentValue) {
                    throw new Error(`La variable '${variableName}' tiene una declaración incorrecta, verifica la sintaxis.`);
                }

                if (variables.has(variableName)) {
                    throw new Error(`La variable '${variableName}' ya ha sido declarada.`);
                }

                const trimmedValue = assignmentValue.trim();
                variables.add(variableName);
            }

            return 'ANALISIS SEMANTICO CORRECTO EN TODAS LAS VARIABLES.\n'
        } catch (error) {
            return `Error semántico: ${error.message}`;
        }
    }
}