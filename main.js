require("dotenv").config()
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

var bloodDonor = require('blood-donor')
var settings = require("./settings")
var blood_type = []

bot.command('start', (ctx) => ctx.replyWithMarkdown(settings.start_msg))
bot.command('help', (ctx) => ctx.replyWithMarkdown(settings.help_msg))

//bot.command('blood', (ctx) => ctx.replyWithMarkdown("_Insert your kind of blood_"))

bot.command('blood', (ctx) => {
  return ctx.replyWithMarkdown('_Insert your kind of blood_',
    Markup.inlineKeyboard([
      Markup.callbackButton('0', '0'),
      Markup.callbackButton('A', 'A'),
      Markup.callbackButton('B', 'B'),
      Markup.callbackButton('AB', 'AB')
    ]).extra()
  )
})

bot.action(/(.+)/, (ctx, next) => {
  var positive_negative = "_Insert the value of the positivity or negativity_"

  switch (ctx.match[0]) {
    case '0':
      blood_type[ctx.chat.id] = ctx.match[0]
      ctx.answerCbQuery('Your kind of blood is set on: 0').then(() => next())
      ctx.editMessageText(positive_negative,
        Markup.inlineKeyboard([
          Markup.callbackButton('Positive', 'Positive'),
          Markup.callbackButton('Negative', 'Negative'),
        ]).extra()
      )
      break;
    case 'A':
      blood_type[ctx.chat.id] = ctx.match[0]
      ctx.answerCbQuery('Your kind of blood is set on: A').then(() => next())
      ctx.editMessageText(positive_negative,
        Markup.inlineKeyboard([
          Markup.callbackButton('Positive', 'Positive'),
          Markup.callbackButton('Negative', 'Negative'),
        ]).extra()
      )
      break;
    case 'B':
      blood_type[ctx.chat.id] = ctx.match[0]
      ctx.answerCbQuery('Your kind of blood is set on: B').then(() => next())
      ctx.editMessageText(positive_negative,
        Markup.inlineKeyboard([
          Markup.callbackButton('Positive', 'Positive'),
          Markup.callbackButton('Negative', 'Negative'),
        ]).extra()
      )
      break;
    case 'AB':
      blood_type[ctx.chat.id] = ctx.match[0]
      ctx.answerCbQuery('Your kind of blood is set on: AB').then(() => next())
      ctx.editMessageText(positive_negative,
        Markup.inlineKeyboard([
          Markup.callbackButton('Positive', 'Positive'),
          Markup.callbackButton('Negative', 'Negative'),
        ]).extra()
      )
      break;
    case 'Positive':
      ctx.answerCbQuery('Your kind of blood is: ' + blood_type[ctx.chat.id] + 'Rh. Positive').then(() => next())
      break;
    case 'Negative':
      ctx.answerCbQuery('Your kind of blood is: ' + blood_type[ctx.chat.id] + 'Rh. Negative').then(() => next())
      break;
    default:
      ctx.answerCbQuery('I can not set your kind of blood').then(() => next())
      break;
  }
  return "22"
})

// bloodDonor(blood_type, function (err, data) {
//       console.log(data);
// });

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.use((ctx) => {
  console.log(ctx.message)
})

bot.startPolling()
