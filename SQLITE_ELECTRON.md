

# SQLITE3 - SOLUÇÃO DE PROBLEMAS (WINDOWS)

Caso ao rodar a aplicação em modo desenvolvimento (`npm run dev`) encontre o seguinte erro no Console:
```
Uncaught Error: Please install sqlite3 package manually
```
Será necessário construir pelo menos uma vez a aplicação para que o plugin nativo do SQLite3 seja compilado. Para construir:
```console
$ npm run build
```
É bastante provável que nessa primeira construção aconteça diversos erros (principalmente relacionados a Python e ao VC++). É sabido que o processo de compilação de plugins nativos do Nodejs é algo bastante chato e complicado para usuários de Windows ([ref](https://github.com/nodejs/node-gyp/issues/629)).
Vamos tentar resolver esses erros!

## Primeira Opção de Solução
Execute o seguinte comando:
```console
$ npm install --global --production windows-build-tools
```
Se ele rodar tranquilamente é provável que agora seu ambiente já está configurado! Tente construir a aplicação de novo e você não deverá encontrar erros!

## Segunda Opção de Solução
### Python
Tem que ser o 2.7! Python>=3.0.0 não é suportado!
- Instale o Python 2.7: https://www.python.org/ftp/python/2.7.14/python-2.7.14.msi

Para configurar a variável de ambiente do python temos duas opções:

**OPÇÃO 1**
```
npm config set python python2.7
```

**OPÇÃO 2**
- Em pesquisar, procure por **Editar as variáveis de ambiente do sistema**
- Clique em **Variáveis do Ambiente...**
- Em **Variáveis do sistema** clique em **Novo..**
- No **Nome da variável** coloque **python**
- No **Valor da variável** coloque **C:\Python27\python.exe**


### VC++ Build Tools
Para nossa sorte, a Microsoft ao notar o descontentamento do usuários de Windows com a dificuldade para compilar os plugins nativos do Node.js liberou um instalador standalone para a instalação do Visual C++ Build Tools (antes era necessário instalar a suíte inteira do Visual Studio para conseguir ter o Build Tools instalado).
- Instale o [Visual C++ Build Tools](http://go.microsoft.com/fwlink/?LinkId=691126)
Após a instalação execute o seguinte comando:
```
$ npm config set msvs_version 2015
```
---
**Caso a instalação do Build Tools não resolva os erros** de falha ao encontrar o MSBuild ou Visual Studio, ou VC compiler, só te resta instalar o Visual Studio (lembre-se de marcar a opção _Common Tools for Visual C++_ durante a instalação.)

***
**Para mais informações [Compiling native Addon modules](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules)**

## Terceira opção de solução
No mais, se nenhuma das soluções acima funcionaram te resta: pegar um binário já compilado da internet ou de algum desenvolvedor.

Aqui te ofereço o meu: [https://matheus.cc/f/electron-v1.8-win32-x64.zip](https://matheus.cc/f/electron-v1.8-win32-x64.zip)

Você deve colocar a pasta `electron-v1.8-win32-x64` dentro da pasta `node_modules\sqlite3\lib\binding`.
Ou seja o path final deve ser:
`labor-cafe-electron\node_modules\sqlite3\lib\binding\electron-v1.8-win32-x64\node_sqlite3.node`

**ATENÇÃO**: esta solução não te permitirá construir a aplicação!!! Apenas à rodá-la em modo desenvolvimento!

## Quarta opção de solução
Desenvolver no linux. Tendo o gcc e o g++ instalados, você não deve ter muitos problemas em compilar o sqlite3. **npm run dev** e **npm run build** works like a charm!
