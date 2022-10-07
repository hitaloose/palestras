import DiscursoRepo from "../repo/DiscursoRepo";

export default async function () {
  const discursos = [
    {
      codigo: 1,
      nome: "(1) Você conhece bem a Deus?",
    },
    {
      codigo: 2,
      nome: "(2) Você vai sobreviver aos últimos dias?",
    },
    {
      codigo: 3,
      nome: "(3) Você está avançando com a organização unida de Jeová?",
    },
    {
      codigo: 4,
      nome: "(4) Que provas temos de que Deus existe?",
    },
    {
      codigo: 5,
      nome: "(5) Você pode ter uma família feliz!",
    },
    {
      codigo: 6,
      nome: "(6) O Dilúvio dos dias de Noé e você",
    },
    {
      codigo: 7,
      nome: "(7) Imite a misericórdia de Jeová",
    },
    {
      codigo: 8,
      nome: "(8) Viva para fazer a vontade de Deus",
    },
    {
      codigo: 9,
      nome: "(9) Escute e faça o que a Bíblia diz",
    },
    {
      codigo: 10,
      nome: "(10) Seja honesto em tudo",
    },
    {
      codigo: 11,
      nome: "(11) Imite a Jesus e não faça parte do mundo",
    },
    {
      codigo: 12,
      nome: "(12) Deus quer que você respeite quem tem autoridade",
    },
    {
      codigo: 13,
      nome: "(13) Qual o ponto de vista de Deus sobre o sexo e o casamento?",
    },
    {
      codigo: 14,
      nome: "(14) Um povo puro e limpo honra a Jeová",
    },
    {
      codigo: 15,
      nome: "(15) ‘Faça o bem a todos’",
    },
    {
      codigo: 16,
      nome: "(16) Seja cada vez mais amigo de Jeová",
    },
    {
      codigo: 17,
      nome: "(17) Glorifique a Deus com tudo o que você tem",
    },
    {
      codigo: 18,
      nome: "(18) Faça de Jeová a sua fortaleza",
    },
    {
      codigo: 19,
      nome: "(19) Como você pode saber seu futuro?",
    },
    {
      codigo: 20,
      nome: "(20) Chegou o tempo de Deus governar o mundo?",
    },
    {
      codigo: 21,
      nome: "(21) Dê valor ao seu lugar no Reino de Deus",
    },
    {
      codigo: 22,
      nome: "(22) Você está usando bem o que Jeová lhe dá?",
    },
    {
      codigo: 23,
      nome: "(23) A vida tem objetivo",
    },
    {
      codigo: 24,
      nome: "(24) Você encontrou “uma pérola de grande valor”?",
    },
    {
      codigo: 25,
      nome: "(25) Lute contra o espírito do mundo",
    },
    {
      codigo: 26,
      nome: "(26) Você é importante para Deus?",
    },
    {
      codigo: 27,
      nome: "(27) Como construir um casamento feliz",
    },
    {
      codigo: 28,
      nome: "(28) Mostre respeito e amor no seu casamento",
    },
    {
      codigo: 29,
      nome: "(29) As responsabilidades e recompensas de ter filhos",
    },
    {
      codigo: 30,
      nome: "(30) Como melhorar a comunicação na família",
    },
    {
      codigo: 31,
      nome: "(31) Você tem consciência da sua necessidade espiritual?",
    },
    {
      codigo: 32,
      nome: "(32) Como lidar com as ansiedades da vida",
    },
    {
      codigo: 33,
      nome: "(33) Quando vai existir verdadeira justiça?",
    },
    {
      codigo: 34,
      nome: "(34) Foi ‘marcado’ para sobreviver?",
    },
    {
      codigo: 35,
      nome: "(35) É possível viver para sempre? O que você precisa fazer?",
    },
    {
      codigo: 36,
      nome: "(36) Será que a vida é só isso?",
    },
    {
      codigo: 37,
      nome: "(37) Obedecer a Deus é mesmo a melhor coisa a fazer?",
    },
    {
      codigo: 38,
      nome: "(38) Como você pode sobreviver ao fim do mundo?",
    },
    {
      codigo: 39,
      nome: "(39) Confie na vitória divina!",
    },
    {
      codigo: 40,
      nome: "(40) O que vai acontecer em breve?",
    },
    {
      codigo: 41,
      nome: "(41) Fiquem parados e vejam como Jeová os salvará",
    },
    {
      codigo: 42,
      nome: "(42) O efeito do Reino de Deus sobre você",
    },
    {
      codigo: 43,
      nome: "(43) Tudo o que Deus nos pede é para o nosso bem",
    },
    {
      codigo: 44,
      nome: "(44) Como os ensinos de Jesus podem ajudar você?",
    },
    {
      codigo: 45,
      nome: "(45) Continue andando no caminho que leva à vida",
    },
    {
      codigo: 46,
      nome: "(46) Fortaleça sua confiança em Jeová",
    },
    {
      codigo: 47,
      nome: "(47) ‘Tenha fé nas boas novas’",
    },
    {
      codigo: 48,
      nome: "(48) Seja leal a Deus mesmo quando for testado",
    },
    {
      codigo: 49,
      nome: "(49) Será que um dia a Terra vai ser limpa?",
    },
    {
      codigo: 50,
      nome: "(50) Como sempre tomar as melhores decisões",
    },
    {
      codigo: 51,
      nome: "(51) Será que a verdade da Bíblia está mudando a sua vida?",
    },
    {
      codigo: 52,
      nome: "(52) Quem é o seu Deus?",
    },
    {
      codigo: 53,
      nome: "(53) Você pensa como Deus?",
    },
    {
      codigo: 54,
      nome: "(54) Fortaleça sua fé em Deus e em suas promessas",
    },
    {
      codigo: 55,
      nome: "(55) Você está fazendo um bom nome perante Deus?",
    },
    {
      codigo: 56,
      nome: "(56) Existe um líder em quem você pode confiar?",
    },
    {
      codigo: 57,
      nome: "(57) Como suportar perseguição",
    },
    {
      codigo: 58,
      nome: "(58) Quem são os verdadeiros seguidores de Cristo?",
    },
    {
      codigo: 59,
      nome: "(59) Ceifará o que semear",
    },
    {
      codigo: 60,
      nome: "(60) Você tem um objetivo na vida?",
    },
    {
      codigo: 61,
      nome: "(61) Nas promessas de quem você confia?",
    },
    {
      codigo: 62,
      nome: "(62) A única cura para a humanidade doentia",
    },
    {
      codigo: 63,
      nome: "(63) Tem você espírito evangelizador?",
    },
    {
      codigo: 64,
      nome: "(64) Você ama os prazeres ou a Deus?",
    },
    {
      codigo: 65,
      nome: "(65) Como podemos ser pacíficos num mundo cheio de ódio",
    },
    {
      codigo: 66,
      nome: "(66) Você também vai participar na colheita?",
    },
    {
      codigo: 67,
      nome: "(67) Medite na Bíblia e nas criações de Jeová",
    },
    {
      codigo: 68,
      nome: "(68) Guarda ressentimento ou é perdoador?",
    },
    {
      codigo: 69,
      nome: "(69) Por que mostrar amor abnegado?",
    },
    {
      codigo: 70,
      nome: "(70) Faça de Jeová a sua confiança",
    },
    {
      codigo: 71,
      nome: "(71) ‘Mantenha-se desperto’, Por que e como?",
    },
    {
      codigo: 72,
      nome: "(72) O amor identifica os cristãos verdadeiros",
    },
    {
      codigo: 73,
      nome: "(73) Você tem um coração sábio?",
    },
    {
      codigo: 74,
      nome: "(74) Os olhos de Jeová estão em todo lugar",
    },
    {
      codigo: 75,
      nome: "(75) Mostre que você apoia o direito de Jeová governar",
    },
    {
      codigo: 76,
      nome: "(76) Princípios bíblicos, podem nos ajudar a lidar com os problemas atuais?",
    },
    {
      codigo: 77,
      nome: "(77) Siga o proceder da hospitalidade",
    },
    {
      codigo: 78,
      nome: "(78) Sirva a Jeová com um coração alegre",
    },
    {
      codigo: 79,
      nome: "(79) Você vai escolher ser amigo de Deus?",
    },
    {
      codigo: 80,
      nome: "(80) Você baseia sua esperança na ciência ou na Bíblia?",
    },
    {
      codigo: 81,
      nome: "(81) Quem está qualificado para fazer discípulos?",
    },
    {
      codigo: 82,
      nome: "(82) Jeová e Cristo fazem parte de uma Trindade?",
    },
    {
      codigo: 83,
      nome: "(83) Tempo de julgamento da religião",
    },
    {
      codigo: 84,
      nome: "(84) Escapará do destino deste mundo?",
    },
    {
      codigo: 85,
      nome: "(85) Boas notícias num mundo violento",
    },
    {
      codigo: 86,
      nome: "(86) Como orar a Deus e ser ouvido por ele?",
    },
    {
      codigo: 87,
      nome: "(87) Qual é a sua relação com Deus?",
    },
    {
      codigo: 88,
      nome: "(88) Por que viver de acordo com os padrões da Bíblia?",
    },
    {
      codigo: 89,
      nome: "(89) Venham os que têm sede da verdade!",
    },
    {
      codigo: 90,
      nome: "(90) Faça o máximo para alcançar a verdadeira vida!",
    },
    {
      codigo: 91,
      nome: "(91) A presença do Messias e seu domínio",
    },
    {
      codigo: 92,
      nome: "(92) O papel da religião nos assuntos do mundo",
    },
    {
      codigo: 93,
      nome: "(93) Catástrofes naturais, como as encara?",
    },
    {
      codigo: 94,
      nome: "(94) A religião verdadeira atende às necessidades da sociedade humana",
    },
    {
      codigo: 95,
      nome: "(95) O conceito da Bíblia sobre práticas espíritas",
    },
    {
      codigo: 96,
      nome: "(96) O que vai acontecer com as religiões?",
    },
    {
      codigo: 97,
      nome: "(97) Permaneçamos inculpes em meio a uma geração pervertida",
    },
    {
      codigo: 98,
      nome: "(98) “A cena deste mundo está mudando”",
    },
    {
      codigo: 99,
      nome: "(99) Por que você pode confiar na Bíblia",
    },
    {
      codigo: 100,
      nome: "(100) Amizade verdadeira com Deus e com o próximo",
    },
    {
      codigo: 101,
      nome: "(101) Jeová, O Grandioso Criador",
    },
    {
      codigo: 102,
      nome: "(102) Preste atenção à Palavra profética",
    },
    {
      codigo: 103,
      nome: "(103) Pode-se encontrar alegria em servir a Deus",
    },
    {
      codigo: 104,
      nome: "(104) Pais, estão construindo com materiais à prova de fogo?",
    },
    {
      codigo: 105,
      nome: "(105) Somos consolados em todas as nossas tribulações",
    },
    {
      codigo: 106,
      nome: "(106) Arruinar a Terra provocará retribuição divina",
    },
    {
      codigo: 107,
      nome: "(107) Tenha uma boa consciência neste mundo pecaminoso",
    },
    {
      codigo: 108,
      nome: "(108) Vença o medo do futuro",
    },
    {
      codigo: 109,
      nome: "(109) O Reino de Deus está próximo",
    },
    {
      codigo: 110,
      nome: "(110) Deus vem primeiro na vida familiar bem-sucedida",
    },
    {
      codigo: 111,
      nome: "(111) O que é realizado pela cura das nações?",
    },
    {
      codigo: 112,
      nome: "(112) Como expressar amor num mundo que viola a lei",
    },
    {
      codigo: 113,
      nome: "(113) Jovens, Como vocês podem ter uma vida feliz?",
    },
    {
      codigo: 114,
      nome: "(114) Apreço pelas maravilhas da criação de Deus",
    },
    {
      codigo: 115,
      nome: "(115) Como proteger-nos contra os laços de Satanás",
    },
    {
      codigo: 116,
      nome: "(116) Escolha sabiamente com quem irá associar-se!",
    },
    {
      codigo: 117,
      nome: "(117) Como vencer o mal com o bem",
    },
    {
      codigo: 118,
      nome: "(118) Olhemos os jovens do ponto de vista de Jeová",
    },
    {
      codigo: 119,
      nome: "(119) Por que é benéfico que os cristãos vivam separados do mundo",
    },
    {
      codigo: 120,
      nome: "(120) Por que se submeter à regência de Deus agora",
    },
    {
      codigo: 121,
      nome: "(121) Uma família mundial que será salva da destruição",
    },
    {
      codigo: 122,
      nome: "(122) Paz global, de onde virá?",
    },
    {
      codigo: 123,
      nome: "(123) Por que os cristãos têm de ser diferentes",
    },
    {
      codigo: 124,
      nome: "(124) Razões para crer que a Bíblia é de autoria divina",
    },
    {
      codigo: 125,
      nome: "(125) Por que a humanidade precisa de resgate",
    },
    {
      codigo: 126,
      nome: "(126) Quem se salvará?",
    },
    {
      codigo: 127,
      nome: "(127) O que acontece quando morremos?",
    },
    {
      codigo: 128,
      nome: "(128) É o inferno um lugar de tormento ardente?",
    },
    {
      codigo: 129,
      nome: "(129) O que a Bíblia diz sobre a Trindade?",
    },
    {
      codigo: 130,
      nome: "(130) A Terra permanecerá para sempre",
    },
    {
      codigo: 131,
      nome: "(131) Será que o Diabo realmente existe?",
    },
    {
      codigo: 132,
      nome: "(132) Ressurreição, a vitória sobre a morte!",
    },
    {
      codigo: 133,
      nome: "(133) Tem importância o que cremos sobre a nossa origem?",
    },
    {
      codigo: 134,
      nome: "(134) Devem os cristãos guardar o sábado?",
    },
    {
      codigo: 135,
      nome: "(135) A santidade da vida e do sangue",
    },
    {
      codigo: 136,
      nome: "(136) Será que Deus aprova o uso de imagens na adoração?",
    },
    {
      codigo: 137,
      nome: "(137) Ocorreram realmente os milagres da Bíblia?",
    },
    {
      codigo: 138,
      nome: "(138) Viva com bom juízo num mundo depravado",
    },
    {
      codigo: 139,
      nome: "(139) Sabedoria divina num mundo científico",
    },
    {
      codigo: 140,
      nome: "(140) Quem é realmente Jesus Cristo?",
    },
    {
      codigo: 141,
      nome: "(141) Quando terão fim os gemidos da criação humana?",
    },
    {
      codigo: 142,
      nome: "(142) Por que refugiar-se em Jeová",
    },
    {
      codigo: 143,
      nome: "(143) Confie no Deus de todo consolo",
    },
    {
      codigo: 144,
      nome: "(144) Uma congregação leal sob a liderança de Cristo",
    },
    {
      codigo: 145,
      nome: "(145) Quem é semelhante a Jeová, nosso Deus?",
    },
    {
      codigo: 146,
      nome: "(146) Use a educação para louvar a Jeová",
    },
    {
      codigo: 147,
      nome: "(147) Confie no poder salvador de Jeová",
    },
    {
      codigo: 148,
      nome: "(148) Você tem o mesmo conceito de Deus sobre a vida?",
    },
    {
      codigo: 149,
      nome: "(149) O que significa “andar com Deus”?",
    },
    {
      codigo: 150,
      nome: "(150) Este mundo está condenado à destruição?",
    },
    {
      codigo: 151,
      nome: "(151) Jeová é “uma altura protetora” para seu povo",
    },
    {
      codigo: 152,
      nome: "(152) Armagedom, por que e quando?",
    },
    {
      codigo: 153,
      nome: "(153) Tenha bem em mente o “atemorizante dia”!",
    },
    {
      codigo: 154,
      nome: "(154) O governo humano é pesado na balança",
    },
    {
      codigo: 155,
      nome: "(155) Chegou a hora do julgamento de Babilônia?",
    },
    {
      codigo: 156,
      nome: "(156) O Dia do Juízo, tempo de temor ou de esperança?",
    },
    {
      codigo: 157,
      nome: "(157) Como os verdadeiros cristãos adornam o ensino divino",
    },
    {
      codigo: 158,
      nome: "(158) Seja corajoso e confie em Jeová",
    },
    {
      codigo: 159,
      nome: "(159) Como encontrar segurança num mundo perigoso",
    },
    {
      codigo: 160,
      nome: "(160) Mantenha a identidade cristã!",
    },
    {
      codigo: 161,
      nome: "(161) Por que Jesus sofreu e morreu?",
    },
    {
      codigo: 162,
      nome: "(162) Seja liberto deste mundo em escuridão",
    },
    {
      codigo: 163,
      nome: "(163) Por que temer o Deus verdadeiro?",
    },
    {
      codigo: 164,
      nome: "(164) Será que Deus ainda está no controle?",
    },
    {
      codigo: 165,
      nome: "(165) Os valores de quem você preza?",
    },
    {
      codigo: 166,
      nome: "(166) Como enfrentar o futuro com fé e coragem",
    },
    {
      codigo: 167,
      nome: "(167) Ajamos sabiamente num mundo insensato",
    },
    {
      codigo: 168,
      nome: "(168) Você pode sentir-se seguro neste mundo atribulado!",
    },
    {
      codigo: 169,
      nome: "(169) Por que ser orientado pela Bíblia?",
    },
    {
      codigo: 170,
      nome: "(170) Quem está qualificado para governar a humanidade?",
    },
    {
      codigo: 171,
      nome: "(171) Poderá viver em paz agora, e para sempre!",
    },
    {
      codigo: 172,
      nome: "(172) Que reputação você tem perante Deus?",
    },
    {
      codigo: 173,
      nome: "(173) Existe uma religião verdadeira do ponto de vista de Deus?",
    },
    {
      codigo: 174,
      nome: "(174) Quem se qualificará para entrar no novo mundo de Deus?",
    },
    {
      codigo: 175,
      nome: "(175) O que prova que a Bíblia é autêntica?",
    },
    {
      codigo: 176,
      nome: "(176) Quando haverá verdadeira paz e segurança?",
    },
    {
      codigo: 177,
      nome: "(177) Onde encontrar ajuda em tempos de aflição?",
    },
    {
      codigo: 178,
      nome: "(178) Ande no caminho da integridade",
    },
    {
      codigo: 179,
      nome: "(179) Rejeite as fantasias do mundo, empenhe-se pelas realidades do Reino",
    },
    {
      codigo: 180,
      nome: "(180) A ressurreição, por que essa esperança deve ser real para você",
    },
    {
      codigo: 181,
      nome: "(181) Já é mais tarde do que você imagina?",
    },
    {
      codigo: 182,
      nome: "(182) O que o Reino de Deus está fazendo por nós agora?",
    },
    {
      codigo: 183,
      nome: "(183) Desvie seus olhos do que é fútil",
    },
    {
      codigo: 184,
      nome: "(184) A morte é o fim de tudo?",
    },
    {
      codigo: 185,
      nome: "(185) Será que a verdade influencia sua vida?",
    },
    {
      codigo: 186,
      nome: "(186) Sirva em união com o povo feliz de Deus",
    },
    {
      codigo: 187,
      nome: "(187) Por que um Deus amoroso permite a maldade?",
    },
    {
      codigo: 188,
      nome: "(188) Você confia em Jeová?",
    },
    {
      codigo: 189,
      nome: "(189) Ande com Deus e receba bênçãos para sempre",
    },
    {
      codigo: 190,
      nome: "(190) Como se cumprirá a promessa de perfeita felicidade familiar",
    },
    {
      codigo: 191,
      nome: "(191) Como o amor e a fé vencem o mundo",
    },
    {
      codigo: 192,
      nome: "(192) Você está no caminho para a vida eterna?",
    },
    {
      codigo: 193,
      nome: "(193) Os problemas de hoje logo serão coisas do passado",
    },
    {
      codigo: 194,
      nome: "(194) Como a sabedoria de Deus nos ajuda",
    },
  ];

  for (const discurso of discursos) {
    await DiscursoRepo.create({
      codigo: discurso.codigo,
      nome: discurso.nome,
    });
  }
}
