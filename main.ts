enum RadioMessage {
    message1 = 49434
}
function avisarAlerta () {
    radio.sendValue("alerta", alerta)
}
radio.onReceivedValue(function (name, value) {
    if (name == "alerta") {
        alerta = value
    }
})
function medirDistancia () {
    distancia = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    basic.showNumber(distancia)
    basic.pause(1000)
    if (distancia != 0 && distancia < 20) {
        alerta = 1
        avisarAlerta()
    } else {
        alerta = 0
    }
    basic.pause(200)
}
let alerta = 0
let distancia = 0
radio.setGroup(1)
radio.setTransmitPower(7)
distancia = 30
alerta = 0
basic.showIcon(IconNames.Heart)
basic.pause(2000)
basic.clearScreen()
basic.forever(function () {
    medirDistancia()
    while (alerta == 1) {
        basic.showNumber(distancia)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.pause(100)
        }
        medirDistancia()
    }
})
