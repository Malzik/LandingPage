exports.getClass = (classe, groupe) => {
    switch (classe) {
        case "B1":
        case "B2":
        case "B3":
            break;
        case "I1":
            break;
        case "I2":
            switch (groupe) {
                case "G1":
                    return "alexis.heroin";
                case "G2":
                    return "benjamin.gonzalez";
                case "INFRA":
                    return "alan.amoyel";
            }
            break;
        default:
            return "alexis.heroin"
    }
}
