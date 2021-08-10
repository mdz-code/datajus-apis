## API's Datajus
<br>
<div style="display: flex; align-items: center; justify-content: center;">
    <img src="https://media.giphy.com/media/NNfnjvg8jToj2EeP4K/giphy.gif">
</div>
<br>

Para melhor compreensão de nossos serviços web privados, separamos nosso desenvolvimento em módulos. Os módulos são definidos por um conjunto de features com objetivo de entregar determinada **funcionalidade**.

### Módulos
- **onBoarding:** responsável pela gestão dos formulários de captura de informação, sempre relacionado com um usuário e podendo ser relacionado com um documento.
- **template:** consiste em armazenar templates ejs html e relacionar informações com estes templates, renderizamos uma versão final do documento preenchido com as informações correta.
- **pdf:** após a renderização de um template de contrato + objeto com as informações do assinador, é gerado um PDF que poderá ser entregue para visualização pré assinatura. Estas informações não são salvas, apenas geradas a partir do template relacionado ao documento.
- **assinatura:** armazena uma imagem de assinatura e disponibilzia esta imagem para a renderização de contratos, as assinaturas são relacionadas com assinadores.
- **contratos:** os contratos não são armazenados no storage, e sim salvos relacionando um id de assinatura e um id de template, sendo renderizados quando necessário.

### Endpoints

- **/getForm** este endpoint tem o método **GET** e está recebendo um onBoarding uuid.

    ```js
    import axios from axios

    const uuidFormExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'

    const response = axios({
        method: 'GET',
        url: `/getForm/${uuidFormExample}`
    })
    ```

- **/createDocument** este endpoint tem o método **POST** e recebe uuid relativo ao template de documento + um objeto com as informações necessárias para renderizar o documento.

    ```js
    import axios from axios

    const uuidTemplateExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'
    const objectTemplateExample = {
        nome: 'Leonardo Lopes dos Santos',
        cpf: 107774136095
    }

    const response = axios({
        method: 'POST',
        url: '/createDocument',
        data: {
            templateId: uuidTemplateExample,
            objectTemplate: objectTemplateExample
        }
    })
    ```

- **/getDocument** este endpoint tem o método **GET** envia um uuid do registro de um documento.

    ```js
    import axios from axios

    const uuidDocumentExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'

    const response = axios({
        method: 'GET',
        url: `/resgatarDocument/${uuidDocumentExample}`
    })
    ```

- **/verify** este endpoint tem o método **GET** envia um uuid do registro de um assinador.

    ```js
    import axios from axios

    const uuidAssinadorExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'

    const response = axios({
        method: 'GET',
        url: `/verify/${uuidAssinadorExample}`
    })
    ```

- **/toSign** este endpoint tem o método **POST** envia um uuid do registro de um documento + bytes da assinatura.

    ```js
    import axios from axios

    const uuidAssinadorExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'
    const dataObject = {
        documentId: uuidAssinadorExample,
        bytes: [...]
    }

    const response = axios({
        method: 'POST',
        url: `/toSign`,
        data: dataObject
    })
    ```

- **/downloadContract** este endpoint tem o método **POST** envia um uuid do registro de um contrato.

    ```js
    import axios from axios

    const uuidContractExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'
    const dataObject = {
        contractId: uuidAssinadorExample,
    }

    const response = axios({
        method: 'POST',
        url: `/downloadContract`,
        data: dataObject
    })
    ```

- **/sendContract** este endpoint tem o método **POST** envia um uuid do registro de um contrato.

    ```js
    import axios from axios

    const uuidContractExample = '68e5ea80-a2b0-434f-b8eb-62e521f6a4cb'
    const dataObject = {
        contractId: uuidAssinadorExample,
        reciver: 'lameranha@gmail.com',
        type: 'email'
    }

    const response = axios({
        method: 'POST',
        url: `/sendContract`,
        data: dataObject
    })
    ```
    

