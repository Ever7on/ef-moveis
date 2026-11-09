# E.F Móveis e Planejados

App de marcenaria: projetos com número de OS, desenho 3D dos móveis, lista de peças, plano de corte, compras e envio do projeto para o cliente.

## Como colocar no ar pelo GitHub Pages

1. Entre em **github.com** e crie um repositório novo (botão **New**). Nome sugerido: `ef-moveis`. Deixe como **Public**.
2. Na página do repositório, clique em **Add file → Upload files** e arraste **todos os arquivos desta pasta**:
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` e `README.md`.
   Clique em **Commit changes**.
3. Vá em **Settings → Pages**. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
4. Espere um ou dois minutos. O endereço aparece no topo dessa mesma página, no formato
   `https://SEU-USUARIO.github.io/ef-moveis/`.

## Instalar no celular

Abra o endereço no celular.
- **Android (Chrome):** menu ⋮ → **Adicionar à tela inicial** (ou **Instalar app**).
- **iPhone (Safari):** botão de compartilhar → **Adicionar à Tela de Início**.

Depois da primeira abertura, o app funciona mesmo sem internet.

## Onde ficam os dados

Fora do Claude, os projetos ficam guardados **no próprio aparelho** (no navegador).
- Na tela inicial, use **Fazer backup** de vez em quando. Ele baixa um arquivo `.json` com todos os projetos.
- Para passar para outro aparelho, abra o app nele e use **Restaurar** com esse arquivo.
- Limpar os dados do navegador apaga os projetos. Por isso o backup é importante.

## Atualizar o app

Quando tiver uma versão nova do `index.html`, repita o passo 2 (Upload files) e substitua o arquivo. O app se atualiza sozinho na próxima vez que for aberto com internet.

## O que muda em relação à versão no Claude

- Não sincroniza sozinho entre aparelhos: use o backup.
- O botão **Montar com IA** não aparece (ele depende do Claude). A descrição por texto continua funcionando normalmente.
- PDF, WhatsApp, e-mail, desenho 3D e plano de corte funcionam iguais.

## Sincronizar na nuvem com o Firebase (Firestore)

Com isso os projetos ficam salvos na nuvem e aparecem em todos os aparelhos em que você entrar.

1. Em **console.firebase.google.com**, crie um projeto (ex.: `ef-moveis`). O plano gratuito (Spark) é suficiente.
2. **Authentication → Começar → Método de login → E-mail/senha → Ativar → Salvar.**
3. **Authentication → Configurações → Domínios autorizados → Adicionar domínio:** `ever7on.github.io`.
4. **Firestore Database → Criar banco de dados →** escolha um local (ex.: `southamerica-east1`, São Paulo) → modo de produção.
5. **Firestore → Regras:** apague o que estiver lá, cole o conteúdo do arquivo `firestore.rules` e clique em **Publicar**.
6. **Configurações do projeto (engrenagem) → Seus apps → ícone `</>` (Web) →** dê um nome e registre. Copie o bloco `firebaseConfig`.
7. Abra o app, na tela inicial toque em **Conectar ao Firebase**, cole o bloco e toque em **Salvar configuração**.
8. Toque em **Criar conta** com seu e-mail e uma senha (mínimo 6 caracteres). Nos outros aparelhos, cole a mesma configuração e use **Entrar**.

Os projetos que já estavam no aparelho sobem para a nuvem no primeiro login.
