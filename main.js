require("dotenv").config()
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

const positive_negative = "_Insert the value of the positivity or negativity_"

var bloodDonor = require('blood-donor')
var settings = require("./settings")
var user_var = {'blood_type': [], 'rh_value': [], 'blood_donor': {}}

console.log("Bot operativo...")

// Managing commands
bot.command('start', (ctx) => ctx.replyWithMarkdown(settings.start_msg))
bot.command('help', (ctx) => ctx.replyWithMarkdown(settings.help_msg))
bot.command('blood', (ctx) => {
  return ctx.replyWithMarkdown('_Insert your kind of blood_',
    Markup.inlineKeyboard([
      Markup.callbackButton('O', 'O'),
      Markup.callbackButton('A', 'A'),
      Markup.callbackButton('B', 'B'),
      Markup.callbackButton('AB', 'AB')
    ]).extra()
  )
})

// Managing inline query
bot.action(/(O|AB|A|B)/, (ctx, next) => {
  user_var.blood_type[ctx.chat.id] = ctx.match[0]
  ctx.answerCbQuery(`Your kind of blood is set on: ${ctx.match[0]}`).then(() => next())
  ctx.editMessageText(settings.positive_negative,
    Extra.markdown().markup((m) => m.inlineKeyboard([
      Markup.callbackButton('+', '+'),
      Markup.callbackButton('-', '-'),
    ])
  ))
})

bot.action(/(\+|\-)/, (ctx, next) => {
  user_var.rh_value[ctx.chat.id] = ctx.match[0]
  ctx.answerCbQuery(`Your kind of blood is: ${user_var.blood_type[ctx.chat.id]} Rh. ${ctx.match[0]}`).then(() => next())
  bloodDonor(`${user_var.blood_type[ctx.chat.id]}${user_var.rh_value[ctx.chat.id]}ve`, function (err, data) {
    user_var.blood_donor[ctx.chat.id] = data
    console.log(data)
  })

  function format_list (text, list) {
    var appoggino = ""
    for (var i = 0; i < list.length; i++) {
      if (i==0) {
        appoggino += text
      }
      appoggino += list[i]
      if (i != (list.length - 1)) {
        appoggino += ", "
      }
      else {
        appoggino += "\n"
      }
    }
    return appoggino
  }

  ctx.replyWithMarkdown("*Information "+user_var.blood_type[ctx.chat.id]+" "+user_var.rh_value[ctx.chat.id]+"\n\n"+
                         "Ideal donator*: "+user_var.blood_donor[ctx.chat.id].ideal+"\n"+
                         format_list("*Donors*: ", user_var.blood_donor[ctx.chat.id].donors)+
                         format_list("*Critical Donors*: ", user_var.blood_donor[ctx.chat.id].criticalDonors)+"\n_"+
                         settings.blood_group[user_var.blood_type[ctx.chat.id]]+"_")
})

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.use((ctx) => {
  if(ctx.updateType != 'callback_query')
    console.log('Messaggio ricevuto: ', ctx.message)
})

bot.startPolling()
