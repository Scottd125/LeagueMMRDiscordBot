import Command from '../struct/Command';
import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios'
import moment from 'moment'

abstract class AramCommand extends Command {
  constructor() {
    super({
      name: 'aram',
      aliases: ['a'],
      description: 'Displays the ARAM MMR of a League of Legend\'s player',
    });
  }

  exec(message: Message, args: string[]) {
    const summonersName = args.join().replace(/,/g, ' ');
    const summonersNameURI = encodeURI(args.join().replace(/,/g, ''));

    console.log(summonersNameURI);

    const LeagueAramMmrEndpoint = `https://euw.whatismymmr.com/api/v1/summoner?name=${summonersNameURI}`;

    axios.get(LeagueAramMmrEndpoint).then((response) => {
      return message.channel.send(new MessageEmbed()
        .setTitle(
          `${summonersName}\'s Aram Rank: ${response.data.ARAM.closestRank}`)
        .setColor(this.setRankedColor(response.data.ARAM.closestRank))
        .setImage(this.setRankedImage(response.data.ARAM.closestRank))
        .setDescription(
          `${summonersName}\'s Aram MMR: ${response.data.ARAM.avg} (±${response.data.ARAM.err}) | Percentile: ${(100 - Math.round(response.data.ARAM.percentile * 100) / 100).toFixed(2)}%`)
        .setFooter(
          `Data from ${moment.unix(response.data.ARAM.timestamp).fromNow()}\n© ${new Date().getFullYear()} Scogg, Monkey Inc, All rights reserved. 🦧`)
      );
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        return message.channel.send('\>\>\> Error: Summoner is not on record');
      } else {
        return message.channel.send('\>\>\> Error: An unknown error has occured');
      }
    });
  }

  setRankedColor(rankedTitle: string): string {
    switch (true) {
      case rankedTitle.includes('Iron'):
        return '#4c4547';

      case rankedTitle.includes('Bronze'):
        return '#834328';

      case rankedTitle.includes('Silver'):
        return '#829ca5';

      case rankedTitle.includes('Gold'):
        return '#cc8d35';

      case rankedTitle.includes('Platinum'):
        return '#3b706c';

      case rankedTitle.includes('Diamond'):
        return '#3f3f84';

      case rankedTitle.includes('Master'):
        return '#e948fe';

      case rankedTitle.includes('Grandmaster'):
        return '#ffe4b0';

      default:
        return '#1d2328';
    }
  }

  setRankedImage(rankedTitle: string): string {
    switch (rankedTitle) {
      case 'Iron IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Iron_4.png/revision/latest/scale-to-width-down/280?cb=20181229234928';

      case 'Iron III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png/revision/latest/scale-to-width-down/280?cb=20181229234927';

      case 'Iron II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Iron_2.png/revision/latest/scale-to-width-down/280?cb=20181229234927';

      case 'Iron I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png/revision/latest/scale-to-width-down/280?cb=20181229234926';

      case 'Bronze IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2019_-_Bronze_4.png/revision/latest/scale-to-width-down/280?cb=20181229234913';

      case 'Bronze III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/81/Season_2019_-_Bronze_3.png/revision/latest/scale-to-width-down/280?cb=20181229234912';

      case 'Bronze II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png/revision/latest/scale-to-width-down/280?cb=20181229234911';

      case 'Bronze I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/280?cb=20181229234910';

      case 'Silver IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/52/Season_2019_-_Silver_4.png/revision/latest/scale-to-width-down/280?cb=20181229234938';

      case 'Silver III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/19/Season_2019_-_Silver_3.png/revision/latest/scale-to-width-down/280?cb=20181229234937';

      case 'Silver II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/56/Season_2019_-_Silver_2.png/revision/latest/scale-to-width-down/280?cb=20181229234936';

      case 'Silver I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/280?cb=20181229234936';

      case 'Gold IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cc/Season_2019_-_Gold_4.png/revision/latest/scale-to-width-down/280?cb=20181229234922';

      case 'Gold III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a6/Season_2019_-_Gold_3.png/revision/latest/scale-to-width-down/280?cb=20181229234921';

      case 'Gold II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8a/Season_2019_-_Gold_2.png/revision/latest/scale-to-width-down/280?cb=20181229234921';

      case 'Gold I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/280?cb=20181229234920';

      case 'Platinum IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Platinum_4.png/revision/latest/scale-to-width-down/280?cb=20181229234934';

      case 'Platinum III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/2b/Season_2019_-_Platinum_3.png/revision/latest/scale-to-width-down/280?cb=20181229234934';

      case 'Platinum II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Season_2019_-_Platinum_2.png/revision/latest/scale-to-width-down/280?cb=20181229234933';

      case 'Platinum I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/280?cb=20181229234932';

      case 'Diamond IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ec/Season_2019_-_Diamond_4.png/revision/latest/scale-to-width-down/280?cb=20181229234919';

      case 'Diamond III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/dc/Season_2019_-_Diamond_3.png/revision/latest/scale-to-width-down/280?cb=20181229234918';

      case 'Diamond II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png/revision/latest/scale-to-width-down/280?cb=20181229234918';

      case 'Diamond I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/280?cb=20181229234917';

      case 'Master':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png/revision/latest/scale-to-width-down/280?cb=20181229234929';

      case 'Grandmaster':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png/revision/latest/scale-to-width-down/280?cb=20181229234923';

      case 'Challenger':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/280?cb=20181229234913';

      default:
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png/revision/latest/scale-to-width-down/676?cb=20190908074432';
    }
  }
}

export default AramCommand;