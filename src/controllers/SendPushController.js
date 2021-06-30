const fetch = require("node-fetch");
const Lembrete = require('../models/Lembrete');
const { startOfHour, endOfHour } = require('date-fns');
module.exports = {
  async sendPush(req, res) {
    try {
      var lembretes = [];
      Lembrete.find({
        $and: [
          {
            data: {
              $gte: startOfHour(new Date()),
              $lte: endOfHour(new Date())
            },
          },
        ],
      })
      .populate("remedio")
      .populate("usuario")
      .then(function(dbLembrete) {
        const tokens = [];
        dbLembrete.forEach(lembr => {
          if(lembr.usuario.token_fcm)
            tokens.push(lembr.usuario.token_fcm);
        });
        const obj = {
          title: "Lembrete de médicamento",
          body: "Você tem um medicamento agendado! Abra o App e verifique."
        };
        // var registrationToken = 'dJEhGIeBQHivIXq3sLlWZT:APA91bGAlR6REUIjWUZRNqP_8dfo0ZTyUkqLCU3JLobPH6CDvdjRlyt9B3y829Jeci7e97gCx8PBf291C9EEONVkHgr4oCFB_rcaoUkm3a0_xP0cj00_Zkdxv9Ub0JKGSfBs1iDD_JRT';//gabriel
        const FIREBASE_API_KEY = "AAAAGVAPDTk:APA91bEqgoYkXWZAE_17g7yw2osnz0ZK6knLsmhImwYI3BxEXXkvKoxAP1xCrjHUDjsWrRbWL8TZlNtbgAxEe2RhcFeXbLJKHUyOQ3gAxR3zpC1U2sotWQgGhrSEoEQDWRIghjbOoWqY";
        const message = {
        registration_ids: tokens, 
          notification: {
            title: obj.title,
            body: obj.body,
            "vibrate": 1,
            "sound": 1,
            "show_in_foreground": false,
            "priority": "high",
            "content_available": true,
          },
          data: {
            title: obj.title,
            body: obj.body,
            score: 50,
            wicket: 1,
          }
      }
    
        let headers = {
          "Content-Type": "application/json",
          "Authorization": "key=" + FIREBASE_API_KEY
        };
        console.log('{ method: "POST", headers, body: JSON.stringify(message) } > ', { method: "POST", headers, body: JSON.stringify(message) });
        fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) })
        .then(res => {
          console.log('res > ', res);
          return res.json()
        })
        .then(json => {
          console.log('json >>',json);
        }).catch(error => {
          console.log('error ><', error);
        });
        return res.status(200).json({success: true});
      })
      .catch(function(err) {
        return res.status(500).json({error: "Erro interno"});
      });
    return res.status(200).json(lembretes);
      // This registration token comes from the client FCM SDKs.
    } catch (error) {
      console.log('error > ', error);
      return res.status(500).json({error: 'Erro interno!'});
    }
  }
}