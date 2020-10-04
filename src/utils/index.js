export function RGBToCMYK(str) {
    let [r, g, b] = str.match(/(\d+(?=(,|\s?)))/g)

    let [c, m, y, k] = [0, 0, 0, 0]

    if (r === 0 && g === 0 && b === 0) {
        k = 1
        return [0, 0, 0, 1]
    }

    c = 1 - (r / 255)
    m = 1 - (g / 255)
    y = 1 - (b / 255)

    let minCMY = Math.min(c, Math.min(m, y))
    c = (c - minCMY) / (1 - minCMY)
    m = (m - minCMY) / (1 - minCMY)
    y = (y - minCMY) / (1 - minCMY)
    k = minCMY

    return [
        parseInt(c * 100),
        parseInt(m * 100),
        parseInt(y * 100),
        parseInt(k * 100)
    ]
}

export function HextoRGB(str) {
    let reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/
    let color = str.toLowerCase()
    if (reg.test(color)) {
        if (color.length === 4) {
            let colorNew = "#"
            for (let i = 1; i < 4; i++) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
            }
            color = colorNew
        }
        let colorChange = []
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
        }
        return colorChange
    } else {
        return color
    }
}