import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import dt from './data/data.json';

class ShowTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    // this.getStats = this.getStats.bind(this);
  }
  state = {
    loading: false,
    stats: [
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' В Италии уже больше , а не ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' ВОЗВсемирная организация здравоохранения ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Молодцы, хорошая диктовка ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' спасибо большое ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' на тот момент было  видимо ',
        tags: 'tags'
      },
      {
        date: ' Sun Mar 01 2020 15:11:04 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Чтобы побороть пандемию коронавируса, государства и бизнес должны выделить миллиарды долларов на разработку и испытания вакцин ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 04:56:52 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Изза мне пришлось покинуть страну ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 04:56:52 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Изза таких глупцов ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 14:14:07 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Я не боюсь Бога, я просто молюсь ему, прошу здоровья всем людям и теперь надеюсь на милость Бога ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 25 2020 12:24:54 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Здравствуйте куда обращаться за пропусками ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 04:40:21 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Наверное скоро предложат перестать дышать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 17:22:55 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Говорят уже есть у нас случаи ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Ну что за придурки у нас безответственные живутДаже в такой  ситуации умудряются халатно относится к своему делу ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' На эту информацию отреагировало Министерство здравоохранения Кыргызстана, которое сообщило, что на сегодняшний день в Кыргызстане подтвержденных случаев коронавируса нет ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Эпидемиологическая ситуация на территории республики стабильная, случаи заражения коронавирусом не зарегистрированы ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В ходе проверки выяснилось, что информацию начала распространять медсестра Узгенской территориальной больницы Н ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 04:56:52 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Бля только у нас такое возможно ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Жамантай кызы ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' С ее слов, она сама не понимает, как так получилось, и уверяет, что не заметила ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Сожалею о том, что озвучила такую информацию ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Это не соответствует действительности ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Прошу прощения у народа Кыргызстана,  сказала она в своем обращении ',
        tags: ' '
      },
      {
        date: ' Sat Apr 04 2020 09:32:21 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Низкий поклов наши доблесные врачи ',
        tags: ' '
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Главный врач районной больницы Сатар Жусупов говорит, что на сегодняшний день в медицинском учреждении нет ни одного пациента с подозрением на коронавирус ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Все сказанное на аудиозаписи, распространенной в социальных сетях, не соответствует действительности ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Медсестра признала, что сказала недостоверную информацию во время беседы с подругой ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В нашей больницы таких фактов не зарегистрировано,  сказал Жусупов ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В УВД Ошской области проинформировали, что материалы по факту распространения в социальных сетях информации, не соответствующей действительности, зарегистрированы в ЕРПП ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В областном управлении внутренних дел сообщили, что личность гражданина, распространившего данную информацию установлена ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В настоящее время собраны все соответствующие материалы, проводится расследование ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 07:00:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Проверку проводит ОВД Узгенского района ',
        tags: 'tags'
      },
      {
        date: ' Sat Apr 04 2020 09:00:48 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' для аркалыков ничего не стыдно ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 01:14:23 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Давно надо было ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 09:06:10 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Где логика ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' ч говоришь покатила в клооп работать ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Срочно надо их отыскать и проверить ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Они вообще думают головой ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Тут с ирана дальнобойщиков не впускают а с сеула то зачем закройте уже рейсы и так большенство рейсов транзит через алмату ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' че говоришь, оо Адеим ты как луна ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 16:33:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Какие же они страшные ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 02 2020 16:33:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Тот момент когда нет слов ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' ч говоришь розовые маркеры ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 07:27:53 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Аллах Субхана уа Тааля знает только ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 09 2020 13:59:46 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Пока ими пользуются таким способом, а потом могут и вовсе втолкнуть в какуюнибудь провокацию, даже похуже вчерашней,  отметил он ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Может он террорист, может он специально приехал заразить людей с этим вирусом ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Он козл ,не верьте ему,кроме Аллаха нет бога ,Аллах создал этот мир чтобы испытать людей , этот мир сего лишь мусор , не кто не вечен только Аллах вечен и вс не забудьте братья мусульмане ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' а сен болушпада ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Спасибо за этот формат в общем ',
        tags: 'tags'
      },
      {
        date: ' Wed Apr 08 2020 02:33:25 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Что бы не было фейковых сообщений, надо открыто сообщать обо всм, что происходит ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 23 2020 12:13:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Но все эти пациенты без прожили бы, вероятно, дольше возможно, начас, аможет, надень, неделю илицелый год ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:48:28 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' сидели бы дома молились , а то малый хадж им надо показухой занимаются там свои дела делают а здесь типа ажи ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Молодец диктор, а насчт новостейничего хорошего в общем то ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:48:28 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' вот и приплыл наш Кыргызстан ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 09 2020 13:59:46 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Ну да, ну да ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 09 2020 13:59:46 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Политолог сам конечно ни разу не шовинист, очень чувствуется ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 03:59:49 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Пусть выздоравливают поскорее ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Они по любому должны были, документы проверить ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 27 2020 08:17:22 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Удачи тебе , неадекватный человек ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Хоть от куда приехала ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Все равно контроль должен быть ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Кыргызстанда ответственность деген жок, поэтому элдин баары бизди колдон келет кылат ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 20 2020 04:15:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Что за халатность ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 06 2020 13:40:08 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Имеют нас как хотят ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 06 2020 13:40:08 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' И чего добьются ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 27 2020 08:17:22 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Искренне надеюсь, что такие люди как ты вымрут ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 12:38:40 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Пусть таки будет ',
        tags: 'tags'
      },
      {
        date: ' Sat Mar 14 2020 16:45:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Тыщ тыщ ведущие топ ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 30 2020 09:15:19 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Которого отказались лечить от этого вируса ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 12:38:40 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Он больной его надо вылечить или изолировать от общество Аллах озу ыйман берсин бул адашкан кишиге ',
        tags: 'tags'
      },
      {
        date: ' Fri Mar 13 2020 05:30:15 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' На дордое пусть проведут ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' ч говоришь мы фанаты клоопа, вперд клооп ',
        tags: 'tags'
      },
      {
        date: ' Sat Feb 29 2020 11:31:45 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' че говоришь транспаранты на  марта уже готовы ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:52:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' они с  марта пашут днем и ночью ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В аэропорту чисто ради телевидения делают вид что берут анализ ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:48:28 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Не понятно насчет  человек ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 30 2020 09:15:19 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Они организовали спецрейс и забрали ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 23 2020 07:31:43 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' ну хоть за это спасибо ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 08:39:43 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Безответственные работники,  надо всех, кто виновен в этой ситуации, наказывать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 08:39:43 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Надо было сразу закрыть их на карантин и изолировать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:14:29 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Эти е летели в самолте где было  человек,потом контактировали дома с родными ,с гостями и ещ с кучей людей,те в свою очередь ещ с ками людей, возможно,что уже больше х человек масок кстати как не было в аптеках,так и нет ',
        tags: 'tags'
      },
      {
        date: ' Tue Apr 28 2020 09:43:35 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' слов нет все бесит уже ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' из за этого человека будет большие проблемы он как шайтан, представь что за ним последует люди потом будет грешить а за эти грехи этот человек не ответит, каждый ответит за свои грехи ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 19 2020 06:04:42 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' извините если оскорбил ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 07:27:53 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Как он всех достал,вот только его и не хватало ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:14:29 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' завтра ещ  человек прилетает,сказали всех на карантин закроют ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 23 2020 08:51:05 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' ска везде скидки были и ха короновирус и они бляди головой туда , теперь все граждане КР в ожидании как тест у них выйдет ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Ч то не видно ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Да тебе не понять ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' у меня с мозгами все окей вот у тебя мне кажется что то не то ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Да и я дура что пишу такой дуре ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 23 2020 13:02:56 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Надо закрыть дорогу ош бишкек,ради благо людей ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 12:38:40 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Самое главное,  что Кыргызстан не затронет Буйурса пускай так и будет ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 12:47:44 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' А что Бишкек нарушает права человека ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:49:33 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' С Казахстаном границы открыты для грузовых машин и возвращения граждан Кыргызстана ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 09 2020 12:10:39 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Солдаты на посту с не работающими градусниками будут лечить ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Наверное наш президент верит  тому человеку который сказал кыгызыстан вирус обойдет стороной  кыргызов он не тронет ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 09 2020 12:10:39 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Скоро и из рядов милиции начнут выходить ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:52:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' И так напряжение ',
        tags: 'tags'
      },
      {
        date: ' Thu Apr 09 2020 12:10:39 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Гнилой поступок, если врачи откажутся выходить на работу изза таких ситуаций, что тогда ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 07:27:53 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Мне кажется что он болен ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 07:27:53 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Куда смотрят , такое в эфир выпускать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Оо, боже ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Спаси нас ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Самое главное сейчас всем нам соблюдать дисциплину, сидеть дома и укреплять свой иммунитет ',
        tags: ' stay_home_call '
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Всем здоровья ',
        tags: 'tags'
      },
      {
        date: ' Mon Mar 23 2020 11:42:37 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Люди ещ полностью не осознали ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 05:59:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' А разве многие закон поддерживают ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:52:27 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Читает каждую букву, и такое ощущение будто сам не знает смысла чего читает ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:49:33 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' В Казахстан также могут вернуться из Кыргызстана граждане РК ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Почему  он не лечится ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 06:08:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Ббоюсь коронавируса ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:01:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Вечно в этой стране все через ЖОПУ ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 06:08:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Лишь бы нас обошло ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:52:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Скрывали ой подлецы ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 05:59:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Шакал жээнбеков ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 04:52:27 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Главное, не паниковать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 09:51:36 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Закройте границы , проведите беседы во всех гос работах , школах ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Зима не будет ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 26 2020 06:44:24 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Штрафуйте их по  тысяч ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 17:22:55 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Не было бы у нас вируса, так бы не парились наши ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 12:31:03 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Разработка программного обеспечения для Организации Объединенных Наций ООН ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 05:59:09 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Какой закон должен работать ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 04 2020 17:22:55 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' А ещ говорят у нас нет вируса ',
        tags: 'tags'
      },
      {
        date: ' Wed Apr 01 2020 14:24:17 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Почему эффект вранья исходит ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 05:26:58 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Только опомнились чтоли ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Почему его до сих пор не закрыли в психушку ',
        tags: 'tags'
      },
      {
        date: ' Sun Mar 15 2020 13:13:08 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Торговцы на ошском рынке так недумают ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' придурки они только думают кого бы посадить,где бы награбить ',
        tags: 'tags'
      },
      {
        date: ' Sat Mar 21 2020 09:55:13 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Ну хоть ктото объяснил разницу ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Вот тех  студентов надо найти и посадить на  суток или поместить в карантин ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 05:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Оператор  скажет езжайте в инфекционную ',
        tags: 'tags'
      },
      {
        date: ' Sat Mar 21 2020 16:21:14 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' У нас надо  Ктт кыс ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' В Китае за это расстреливают ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 08:12:54 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Задолбали, чего ждете ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 08:12:54 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Кроме не паникуем ничего не говорите ',
        tags: 'tags'
      },
      {
        date: ' Wed Mar 18 2020 08:12:54 GMT+0600 (East Kazakhstan Time) ',
        sentence:
          ' Не ходить как итальянцы и не ждать пока пол Кыргызстана помрет ',
        tags: 'tags'
      },
      {
        date: ' Thu Mar 05 2020 08:03:00 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' паспортные данные у них же сохранились ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' Что он употребляет ',
        tags: 'tags'
      },
      {
        date: ' Tue Mar 03 2020 10:30:38 GMT+0600 (East Kazakhstan Time) ',
        sentence: ' У него передоз паходу ебан ',
        tags: 'tags'
      }
    ]
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: 'inherit'
          },
          paper: {
            boxShadow: 'none'
          }
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: 'none'
          }
        }
      }
    });

  componentDidMount() {
    this.setState({ loading: true });
    fetch('./data/data.json')
      .then(response => response.json())
      .then(res => {
        this.setState({ stats: res }, () => console.log(res));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ marginLeft: '10px', marginRight: '10px' }}>
          <br />
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={
                <h2 style={{ float: 'left', color: '#3f51b5' }}>
                  Chronoscope Data
                </h2>
              }
              columns={[
                {
                  name: 'date',
                  label: 'Date',
                  options: {
                    filter: true,
                    sort: true
                  }
                },
                {
                  name: 'sentence',
                  label: 'Sentence',
                  options: {
                    filter: true,
                    sort: false
                  }
                },
                {
                  name: 'tags',
                  label: 'Tags',
                  options: {
                    filter: true,
                    sort: true
                  }
                },
                {
                  name: 'Negtags',
                  label: 'Negtags',
                  options: {
                    filter: true,
                    sort: true
                  }
                }
              ]}
              data={this.state.stats}
              options={{
                filter: true,

                rowHover: true,
                downloadOptions: { filename: 'CovidData.csv', separator: ',' },
                filterType: 'dropdown',
                selectableRows: false,
                responsive: 'stacked'
              }}
            />
          </MuiThemeProvider>
          <div style={{ color: '#3f51b5', float: 'left' }}>
            Created By: Chronoscope
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowTable;
