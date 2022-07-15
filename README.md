Trabalho para a cadeira de Programação para dispositivos Moveis na Universidade Federal do Ceará

Professor, adianto logo que não consegui realizar todas as etapas do projeto.
A ideia do meu aplicativo inicialmente era uma, mas acabei não conseguindo implementar
a tempo para entrega.

O meu aplicativo foi feito utilizando React Native utilizando a ferramente de desenolvimento Expo.
Gerei um apk para caso o senhor queira instalar no seu dispositivo e testar.

Meu aplicativo tem um total de 7 telas:

* Tela de Login;
* Tela de Inscrição;
* Tela Home;
* Tela dos meus Consultórios;
* Tela dos Consultórios gerais;
* Tela de criação de consultório;
* Tela de detalhes do consultório;

O aplicativo interage com o firebase, utilizando sua API de Authenticação para cadastrar o usuário,
Nesse cadastro é armazenado as informações de endereço, nome, CRO, Telefone, email, senha e uma foto do usuário.

Para armazenar essas informações foi utilizado o Cloud Firestore.
Como não conseguimos armazenar a imagem do profile do usuário no Firestore, tivesmos que usar o serviço de 
Storage do Firebase e é la que transformamos nossa imagem em um Blob e fazemos o update dos bytes desse blob para o Storage
e armazenamos a url de download no Cloud Firestore no respectivo id de usuário.

Na tela Home, algumas informações aparecem identificando o usuário, como sua foto do perfil,
seu nome e seu CRO. Nessa tela, o usuário é capaz de mudar a foto e ela faz o update no banco de dados Firestore.

Na tela Home, encontramos 3 botões, um para log out e voltar para tela de Login,
Um para tela de Meus Consultórios, que nela você ver todos os consultórios através de uma FlatList criados por você com um avatar ao lado
e o nome do consultório.
Um para a tela de Todos os Consultórios em uma FlatList criados pelos usuários. Nessa tela apenas podemos ver as informações e podemos entrar na tela
de detalhes de cada consultório ja criado por você e outros usuário.

Na tela de criar seu consultório, vc pode cadastrar 4 informações (sem contar com o uid aleatório gerado pelo firestore) que são armazenadas no firestore em outra coleção chamada clinics
e essas informações são utilizadas nas Telas de Meus consultório, Consultório e DetalhesConsultórios.

Na tela de Detalhes do Consultório, o avatar do consultório vai aparecer assim como seu nome, seu dono e seu Endereço.

Professor, não vi no trabalho que era pra apresentar. Quando somei os pontos das funcionalidades deu 10 ai eu nem me preocupei.
Só me preocupei em entregar mesmo, apesar de não ter entregado completo, irei implementar ainda. Tive extrema dificuldade utilizando react-native e javascript.
Perdi muito tempo para identificar bugs, pois o log era muito chato de ler, o log do expo.

Vou mandar o apk do aplicativo para o senhor.

# Não Implementado 

- Funcionalidade de Share
- Funcionalidade de QR Code
